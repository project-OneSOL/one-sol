package shinhan.onesol.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import shinhan.onesol.dto.PaymentMemberDto;

import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class PaymentMemberRequest {
    private int totalPrice;
    private List<PaymentMemberDto> paymentMembers;
}
