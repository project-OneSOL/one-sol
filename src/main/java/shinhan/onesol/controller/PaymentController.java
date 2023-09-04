package shinhan.onesol.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import shinhan.onesol.dto.PaymentMemberDto;
import shinhan.onesol.dto.request.PaymentMemberRequest;
import shinhan.onesol.security.PrincipalDetails;
import shinhan.onesol.service.PaymentService;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/payments")
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/pay")
    public ResponseEntity<Void> doPayment(@RequestBody PaymentMemberRequest paymentMemberRequest, @AuthenticationPrincipal PrincipalDetails principalDetails){
        log.info("-----start Payment-----");
        Long representMemberId = principalDetails.getMember().getId();
        paymentService.doPayment(paymentMemberRequest, representMemberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
