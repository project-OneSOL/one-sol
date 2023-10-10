package shinhan.onesol.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import shinhan.onesol.dto.request.CreatePushNotificationRequest;
import shinhan.onesol.dto.request.PushNotificationRequest;
import shinhan.onesol.dto.response.PushNotificationResponse;
import shinhan.onesol.security.PrincipalDetails;
import shinhan.onesol.service.PushNotificationService;

import java.util.List;

@RestController
@RequestMapping("/notification")
@RequiredArgsConstructor
@Slf4j
public class PushNotificationController {
    private final PushNotificationService pushNotificationService;

    @PostMapping("/add")
    public ResponseEntity<Void> savePushToken(@RequestBody CreatePushNotificationRequest createPushNotificationRequest) {
        log.info("save token = {}", createPushNotificationRequest.getToken());
        log.info("save token = {}", createPushNotificationRequest.getMemberId());
        String token = createPushNotificationRequest.getToken();
        Long memberId = createPushNotificationRequest.getMemberId();

        pushNotificationService.savePushNotificationToken(memberId, token);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<PushNotificationResponse>> getPushTokenListByPaymentMembers(@RequestBody PushNotificationRequest pushNotificationRequest){
        List<PushNotificationResponse> tokens = pushNotificationService.getTokenListByMemberIds(pushNotificationRequest.getMemberIds());
        return new ResponseEntity<>(tokens, HttpStatus.OK);
    }


}
