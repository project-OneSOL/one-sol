package shinhan.onesol.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import shinhan.onesol.domain.Member;
import shinhan.onesol.domain.Payment;
import shinhan.onesol.domain.SubPayment;
import shinhan.onesol.dto.PaymentMemberDto;
import shinhan.onesol.dto.request.PaymentMemberRequest;
import shinhan.onesol.dto.request.PaymentRequest;
import shinhan.onesol.dto.response.PaymentResponse;
import shinhan.onesol.enums.PaymentStatusEnum;
import shinhan.onesol.exception.NotExistMemberException;
import shinhan.onesol.repository.MemberRepository;
import shinhan.onesol.repository.PaymentRepository;
import shinhan.onesol.repository.SubPaymentRepository;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final MemberRepository memberRepository;
    private final SubPaymentRepository subPaymentRepository;
    @Value("${toss.testSecretApiKey}")
    private String testSecretApiKey;

    @Value("${toss.originUrl}")
    private String tossOriginUrl;

    @Value("${toss.cardNumberPaymentUrl}")
    private String tossCardNumberPaymentUrl;

    @Transactional
    public void doPayment(PaymentMemberRequest paymentMemberRequest, Long representMemberId){
        RestTemplate rest = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        testSecretApiKey = testSecretApiKey + ":";
        String encodedAuth = new String(Base64.getEncoder().encode(testSecretApiKey.getBytes(StandardCharsets.UTF_8)));
        headers.setBasicAuth(encodedAuth);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        Member representMember = memberRepository.findById(representMemberId)
                .orElseThrow(NotExistMemberException::new);
        int totalPrice = paymentMemberRequest.getTotalPrice();

        Payment payment = Payment.builder()
                .member(representMember)
                .totalPrice(totalPrice)
                .build();
        List<PaymentMemberDto> paymentMembers = paymentMemberRequest.getPaymentMembers();

        int successCount = 0;
        for (PaymentMemberDto paymentMember : paymentMembers) {
            Member member = memberRepository.findById(paymentMember.getId())
                    .orElseThrow(NotExistMemberException::new);

            JSONObject param = new JSONObject();
            param.put("orderId", UUID.randomUUID() + paymentMember.getName());
            param.put("amount", paymentMember.getAmount());
            param.put("cardNumber", paymentMember.getCardNumber());
            param.put("cardExpirationYear", paymentMember.getCardExpirationYear());
            param.put("cardExpirationMonth", paymentMember.getCardExpirationMonth());
            param.put("orderName", "order" + paymentMember.getName());
            param.put("customIdentityNumber", paymentMember.getCustomerIdentityNumber());

            ResponseEntity<PaymentResponse> response = rest.postForEntity(
                    tossOriginUrl + tossCardNumberPaymentUrl,
                    new HttpEntity<>(param, headers),
                    PaymentResponse.class
            );

            OffsetDateTime offsetDateTime = OffsetDateTime.parse(response.getBody().getApprovedAt(), DateTimeFormatter.ISO_OFFSET_DATE_TIME);
            LocalDateTime approvedDate = offsetDateTime.toLocalDateTime();

            // 결제 성공 시
            if (response.getStatusCode() == HttpStatus.OK) {
                SubPayment subPayment = SubPayment.builder()
                        .member(member)
                        .payment(payment)
                        .price(paymentMember.getAmount())
                        .date(approvedDate)
                        .status(PaymentStatusEnum.SUCCESS)
                        .build();
                subPaymentRepository.save(subPayment);
                successCount++;
            }
        }

        /**
         * 모두가 결제 성공
         */
        if(successCount == paymentMembers.size()){
            paymentRepository.save(payment);
        }

    }
}
