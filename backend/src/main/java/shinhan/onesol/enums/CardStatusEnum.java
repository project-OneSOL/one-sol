package shinhan.onesol.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CardStatusEnum {
    UNCHECKED("UNCHECKED"), CHECKED("CHECKED");

    @JsonValue
    private final String status;
}
