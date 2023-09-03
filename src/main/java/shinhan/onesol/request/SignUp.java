package shinhan.onesol.request;

import lombok.Builder;
import lombok.Data;
import shinhan.onesol.enums.MemberTypeEnum;

@Data
@Builder
public class SignUp {

    private String name;
    private String email;
    private String password;
    private MemberTypeEnum typeEnum;

}
