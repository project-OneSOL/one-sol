package shinhan.onesol.domain;

import lombok.*;
import shinhan.onesol.enums.PaymentStatusEnum;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SubPayment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime date;

    @Enumerated(value = EnumType.STRING)
    private PaymentStatusEnum status;
    private Long price;

    @OneToMany
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @Builder
    public SubPayment(LocalDateTime date, PaymentStatusEnum status, Long price, Member member, Payment payment){
        this.date = date;
        this.status = status;
        this.price = price;
        this.member = member;
        this.payment = payment;
    }
}
