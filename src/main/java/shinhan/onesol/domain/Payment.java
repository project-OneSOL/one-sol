package shinhan.onesol.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import shinhan.onesol.enums.PaymentStatusEnum;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "PAYMENT")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Payment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    private int totalPrice;
    @Enumerated(value = EnumType.STRING)
    private PaymentStatusEnum status;

    @Builder
    public Payment(Member member, int totalPrice, PaymentStatusEnum status){
        this.member = member;
        this.totalPrice = totalPrice;
        this.status = status;
    }

    public void updatePaymentStatus(PaymentStatusEnum status){
        this.status = status;
    }
}
