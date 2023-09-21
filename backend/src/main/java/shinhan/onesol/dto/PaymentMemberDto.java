package shinhan.onesol.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class PaymentMemberDto {
    private Long id;
    private String name;
    private int amount;
    private String cvc;
    private String cardNumber;
    private String cardExpirationYear;
    private String cardExpirationMonth;
    private String customerIdentityNumber;
}
