package shinhan.onesol.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import shinhan.onesol.enums.CardStatusEnum;

@Getter
@Builder
@AllArgsConstructor
public class CardDto {

    private String cardNumber;
    private String cardExpirationYear;
    private String cardExpirationMonth;
    private String customerIdentityNumber;
    private CardStatusEnum status;
}
