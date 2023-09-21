package shinhan.onesol.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import shinhan.onesol.domain.Member;
import shinhan.onesol.domain.Payment;
import shinhan.onesol.domain.SubPayment;
import shinhan.onesol.dto.PaymentMemberDto;
import shinhan.onesol.dto.SubPaymentDto;
import shinhan.onesol.dto.request.PaymentMemberRequest;
import shinhan.onesol.dto.request.PaymentRequest;
import shinhan.onesol.dto.response.PaymentResponse;
import shinhan.onesol.enums.PaymentStatusEnum;
import shinhan.onesol.exception.NotExistMemberException;
import shinhan.onesol.exception.NotMatchTotalPriceException;
import shinhan.onesol.repository.MemberRepository;
import shinhan.onesol.repository.PaymentRepository;
import shinhan.onesol.repository.SubPaymentRepository;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
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
    public void initPayment(PaymentMemberRequest paymentMemberRequest, Long representMemberId){
        Member representMember = memberRepository.findById(representMemberId)
                .orElseThrow(NotExistMemberException::new);
        int totalPrice = paymentMemberRequest.getTotalPrice();

        Payment payment = Payment.builder()
                .member(representMember)
                .totalPrice(totalPrice)
                .status(PaymentStatusEnum.INIT)
                .build();
        paymentRepository.save(payment);

        List<PaymentMemberDto> paymentMembers = paymentMemberRequest.getPaymentMembers();

        for (PaymentMemberDto paymentMember : paymentMembers) {
            Member member = memberRepository.findById(paymentMember.getId())
                    .orElseThrow(() -> new NotExistMemberException());
            SubPayment subPayment = SubPayment.builder()
                    .payment(payment)
                    .price(paymentMember.getAmount())
                    .status(PaymentStatusEnum.INIT)
                    .member(member)
                    .date(LocalDateTime.now())
                    .build();

            subPaymentRepository.save(subPayment);
        }

    }

    @Transactional
    public void doPayment(PaymentMemberRequest paymentMemberRequest, Long representMemberId){
        // validation
        validateTotalPrice(paymentMemberRequest);

        RestTemplate rest = new RestTemplate();
        HttpHeaders headers = makeHeaders();

        Member representMember = memberRepository.findById(representMemberId)
                .orElseThrow(NotExistMemberException::new);
        int totalPrice = paymentMemberRequest.getTotalPrice();

        Payment payment = Payment.builder()
                .member(representMember)
                .totalPrice(totalPrice)
                .status(PaymentStatusEnum.ONGOING)
                .build();
        paymentRepository.save(payment);
        List<PaymentMemberDto> paymentMembers = paymentMemberRequest.getPaymentMembers();

        boolean isFailed = false;
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

            ResponseEntity<PaymentResponse> response = null;
            try{
                response = rest.postForEntity(
                        tossOriginUrl + tossCardNumberPaymentUrl,
                        new HttpEntity<>(param, headers),
                        PaymentResponse.class
                );
            } catch (HttpClientErrorException e){
                // 결제 실패 시
                SubPayment subPayment = SubPayment.builder()
                        .member(member)
                        .payment(payment)
                        .price(paymentMember.getAmount())
                        .date(LocalDateTime.now())
                        .status(PaymentStatusEnum.CANCELED)
                        .build();
                subPaymentRepository.save(subPayment);
                isFailed = true;
            }

            if(response != null){
                OffsetDateTime offsetDateTime = OffsetDateTime.parse(Objects.requireNonNull(response.getBody()).getApprovedAt(), DateTimeFormatter.ISO_OFFSET_DATE_TIME);
                LocalDateTime approvedDate = offsetDateTime.toLocalDateTime();
                log.info(response.getBody().toString());
                // 결제 성공 시
                SubPayment subPayment = SubPayment.builder()
                        .paymentKey(response.getBody().getPaymentKey())
                        .member(member)
                        .payment(payment)
                        .price(paymentMember.getAmount())
                        .date(approvedDate)
                        .status(PaymentStatusEnum.SUCCESS)
                        .build();
                subPaymentRepository.save(subPayment);
            }
        }

        if(isFailed){
            cancelPayment(payment);
            payment.updatePaymentStatus(PaymentStatusEnum.CANCELED);
            paymentRepository.save(payment);
        } else {
            payment.updatePaymentStatus(PaymentStatusEnum.SUCCESS);
            paymentRepository.save(payment);
        }
    }

    private HttpHeaders makeHeaders() {
        HttpHeaders headers = new HttpHeaders();

        testSecretApiKey = testSecretApiKey + ":";
        String encodedAuth = new String(Base64.getEncoder().encode(testSecretApiKey.getBytes(StandardCharsets.UTF_8)));
        headers.setBasicAuth(encodedAuth);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        return headers;
    }

    private void cancelPayment(Payment cancelPayment){
        log.info("----cancelPayment----");
        List<SubPayment> subPayments = subPaymentRepository.findByPayment(cancelPayment);
        RestTemplate rest = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        String encodedAuth = new String(Base64.getEncoder().encode(testSecretApiKey.getBytes(StandardCharsets.UTF_8)));
        headers.setBasicAuth(encodedAuth);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        subPayments.stream()
                .filter(sp -> sp.getStatus().equals(PaymentStatusEnum.SUCCESS))
                .forEach(sp -> {
            String paymentKey = sp.getPaymentKey();
            JSONObject param = new JSONObject();
            param.put("paymentKey", paymentKey);
            param.put("cancelReason", "결제가 취소되었습니다.");
            ResponseEntity<String> response = rest.postForEntity(
                    tossOriginUrl + "/v1/payments/" + paymentKey + "/cancel",
                    new HttpEntity<>(param, headers),
                    String.class
            );
            log.info(response.getBody());
            sp.updateStatus(PaymentStatusEnum.CANCELED);
        });
    }

    private void validateTotalPrice(PaymentMemberRequest paymentMemberRequest) {
        int memberTotalPrice = paymentMemberRequest.getPaymentMembers().stream()
                .mapToInt(PaymentMemberDto::getAmount)
                .sum();
        if(memberTotalPrice != paymentMemberRequest.getTotalPrice()){
            throw new NotMatchTotalPriceException();
        }
    }

}
