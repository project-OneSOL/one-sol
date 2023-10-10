package shinhan.onesol.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import shinhan.onesol.dto.PushNotificationDto;
import shinhan.onesol.dto.request.CreatePushNotificationRequest;
import shinhan.onesol.dto.request.PushTokenDto;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PushNotificationResponse {
    private Long memberId;
    private String token;
}
