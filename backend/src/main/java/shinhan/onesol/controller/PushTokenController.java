package shinhan.onesol.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import shinhan.onesol.domain.PushToken;
import shinhan.onesol.dto.request.PushTokenDto;
import shinhan.onesol.security.PrincipalDetails;
import shinhan.onesol.service.PushTokenService;

@RestController
@RequiredArgsConstructor
public class PushTokenController {
    private final PushTokenService pushTokenService;

    @PostMapping("/pushToken/save")
    public ResponseEntity<Void> savePushToken(@AuthenticationPrincipal PrincipalDetails principalDetails, PushTokenDto pushTokenDto){
        Long memberId = principalDetails.getMember().getId();
        pushTokenService.save(pushTokenDto, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/search/{memberId}")
    public ResponseEntity<PushToken> searchPushToken(@PathVariable Long memberId){
        return new ResponseEntity<>(pushTokenService.searchById(memberId), HttpStatus.OK);
    }
}
