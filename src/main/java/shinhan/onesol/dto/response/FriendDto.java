package shinhan.onesol.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FriendDto {
    private Long id;
    private String name;
    private String phoneNumber;
    private String cardNumber;
    private String cardExpirationYear;
    private String cardExpirationMonth;
    private String customerIdentityNumber;
}
