package shinhan.onesol.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import shinhan.onesol.enums.PaymentStatusEnum;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SubPaymentDto {
    private Long id;
    private String name;
    private int amount;
    private String place;
    private LocalDateTime approvedDate;
    private PaymentStatusEnum status;
}
