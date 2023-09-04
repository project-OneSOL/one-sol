package shinhan.onesol.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class PaymentRequest {
    private Integer amount;
    private String orderId;
    private String cardNumber;
    private String cardExpirationYear;
    private String cardExpirationMonth;
    private String orderName;
    private String customerIdentityNumber;
}
