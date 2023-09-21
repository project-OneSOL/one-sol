package shinhan.onesol.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PaymentStatusEnum {
    INIT("INIT"), CANCELED("CANCELED"), ONGOING("ONGOING"), SUCCESS("SUCCESS");

    @JsonValue
    private final String status;
}
