package shinhan.onesol.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import shinhan.onesol.enums.CardStatusEnum;
import shinhan.onesol.enums.MemberStatusEnum;

import javax.persistence.*;

@Entity
@Table(name = "Card")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Card {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cardNumber;
    private String cardExpirationYear;
    private String cardExpirationMonth;
    private String customerIdentityNumber;

    @Enumerated(value = EnumType.STRING)
    private CardStatusEnum status; // 대표 카드 등록 여부

    private String cardName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Card(String cardNumber, String cardExpirationYear, String cardExpirationMonth, String customerIdentityNumber, CardStatusEnum status, Member member, String cardName) {
        this.cardNumber = cardNumber;
        this.cardExpirationYear = cardExpirationYear;
        this.cardExpirationMonth = cardExpirationMonth;
        this.customerIdentityNumber = customerIdentityNumber;
        this.status = status;
        this.member = member;
        this.cardName = cardName;
    }
}
