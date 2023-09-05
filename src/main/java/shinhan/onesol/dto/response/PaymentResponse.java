package shinhan.onesol.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PaymentResponse {
    private String mId;
    private String version;
    private String paymentKey;
    private String orderId;
    private String orderName;
    private String currency;
    private String method;
    private String totalAmount;
    private String balanceAmount;
    private String suppliedAmount;
    private String vat;
    private String status;
    private String requestedAt;
    private String approvedAt;
    private String useEscrow;
    private String cultureExpense;
    private PaymentCardResponse card;
    private PaymentCardCancelResponse cancels;
    private String type;

}
