package shinhan.onesol.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import shinhan.onesol.domain.Member;
import shinhan.onesol.security.PrincipalDetails;
import shinhan.onesol.service.AccountService;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/accounts")
public class AccountController {
    private final AccountService accountService;

    @PostMapping("/register")
    public ResponseEntity<Void> registerAccount(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody AccountForm accountForm) {
        Member member = principalDetails.getMember();
        String bankCode = accountForm.getBankCode();
        String accountNumber = accountForm.getAccountNumber();
        accountService.registerAccount(member, bankCode, accountNumber);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
