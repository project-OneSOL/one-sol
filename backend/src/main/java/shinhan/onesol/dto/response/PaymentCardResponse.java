package shinhan.onesol.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentCardResponse {
    private String company;
    private String number;
    private String installmentPlanMonths;
    private String isInterestFree;
    private String approveNo;
    private String useCardPoint;
    private String cardType;
    private String ownerType;
    private String acquiresStatus;
    private String receiptUrl;
}
