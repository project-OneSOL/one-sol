package shinhan.onesol.enums;


import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MemberTypeEnum {
    GENERAL("GENERAL"), OWNER("OWNER");

    @JsonValue
    private final String type;
}
