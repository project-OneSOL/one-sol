package shinhan.onesol.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import shinhan.onesol.enums.PaymentStatusEnum;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SubPaymentDetailsDto {
    private String name;
    private int amount;
    private String place;
    private LocalDateTime approvedDate;
    private PaymentStatusEnum status;
    private int totalPrice;
}
