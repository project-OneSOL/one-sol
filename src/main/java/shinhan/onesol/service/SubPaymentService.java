package shinhan.onesol.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shinhan.onesol.domain.Card;
import shinhan.onesol.domain.Member;
import shinhan.onesol.domain.Payment;
import shinhan.onesol.domain.SubPayment;
import shinhan.onesol.dto.SubPaymentDetailsDto;
import shinhan.onesol.dto.SubPaymentDto;
import shinhan.onesol.dto.response.FriendDto;
import shinhan.onesol.dto.response.PaymentDto;
import shinhan.onesol.enums.CardStatusEnum;
import shinhan.onesol.exception.CardNotRegisterException;
import shinhan.onesol.exception.NotExistMemberException;
import shinhan.onesol.exception.NotExistSubPaymentException;
import shinhan.onesol.repository.CardRepository;
import shinhan.onesol.repository.MemberRepository;
import shinhan.onesol.repository.PaymentRepository;
import shinhan.onesol.repository.SubPaymentRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class SubPaymentService {
    private final MemberRepository memberRepository;
    private final SubPaymentRepository subPaymentRepository;

    public List<SubPaymentDto> searchPayment(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(NotExistMemberException::new);
        List<SubPayment> subPayments = subPaymentRepository.findByMember(member);
        return subPayments.stream()
                .map(sp -> new SubPaymentDto(
                        sp.getId(),
                        member.getName(),
                        sp.getPrice(),
                        "place 추가 필요",
                        sp.getDate(),
                        sp.getStatus()
                ))
                .collect(Collectors.toList());
    }

    public List<SubPaymentDetailsDto> searchPaymentDetails(Long subPaymentId){
        SubPayment subPayment = subPaymentRepository.findById(subPaymentId)
                .orElseThrow(NotExistSubPaymentException::new);

        Payment payment = subPayment.getPayment();
        Long paymentId = payment.getId();
        List<SubPayment> subPayments = subPaymentRepository.findByPaymentId(paymentId);

        return subPayments.stream()
                .map(sp -> new SubPaymentDetailsDto(
                        sp.getMember().getName(),
                        sp.getPrice(),
                        "장소 추가",
                        sp.getDate(),
                        sp.getStatus(),
                        payment.getTotalPrice()
                ))
                .collect(Collectors.toList());
    }

}
