package shinhan.onesol.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import shinhan.onesol.dto.SubPaymentDetailsDto;
import shinhan.onesol.dto.SubPaymentDto;
import shinhan.onesol.security.PrincipalDetails;
import shinhan.onesol.service.PaymentService;
import shinhan.onesol.service.SubPaymentService;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class SubPaymentController {
    private final SubPaymentService subPaymentService;

    @GetMapping("/search")
    public ResponseEntity<List<SubPaymentDto>> search(@AuthenticationPrincipal PrincipalDetails principalDetails){
        Long memberId = principalDetails.getMember().getId();
        return new ResponseEntity<>(subPaymentService.searchPayment(memberId), HttpStatus.OK);
    }

    @GetMapping("/search/details/{subPaymentId}")
    public ResponseEntity<List<SubPaymentDetailsDto>> searchDetails(@PathVariable Long subPaymentId){
        return new ResponseEntity<>(subPaymentService.searchPaymentDetails(subPaymentId), HttpStatus.OK);
    }

}
