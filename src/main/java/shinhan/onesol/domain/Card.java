package shinhan.onesol.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "ACCOUNT")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bankCode;
    private Long money;
    private String account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // 카드
    private String cardNumber;
    private String cardExpirationYear;
    private String cardExpirationMonth;
    private String customerIdentityNumber;

    @Builder
    public Account(String bankCode, Long money, String account, Member member){
        this.bankCode = bankCode;
        this.money = money;
        this.account = account;
        this.member = member;
    }
}
