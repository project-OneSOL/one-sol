package shinhan.onesol.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import shinhan.onesol.enums.CardStatusEnum;

@Getter
@Builder
@AllArgsConstructor
public class CardRegisterDto {
    private String CardNumber;
    private String CardExpirationYear;
    private String CardExpirationMonth;
    private String CustomerIdentityNumber;
    private CardStatusEnum status;
}
