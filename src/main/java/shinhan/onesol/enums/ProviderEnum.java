package shinhan.onesol.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ProviderEnum {
    KAKAO("KAKAO"), NAVER("NAVER"), ONESOL("ONESOL");

    @JsonValue
    private final String type;
}
