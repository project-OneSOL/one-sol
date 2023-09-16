package shinhan.onesol.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import shinhan.onesol.domain.Account;
import shinhan.onesol.domain.Member;
import shinhan.onesol.dto.request.AccountForm;
import shinhan.onesol.repository.AccountRepository;
import shinhan.onesol.security.PrincipalDetails;
import shinhan.onesol.service.AccountService;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/accounts")
public class AccountController {
    private final AccountRepository accountRepository;
    private final AccountService accountService;
    private Long accountId;
    @PostMapping("/register")
    public ResponseEntity<Void> registerAccount(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody AccountForm accountForm) {
        Member member = principalDetails.getMember();
        String bankCode = accountForm.getBankCode();
        String accountNumber = accountForm.getAccountNumber();
        accountId = accountService.registerAccount(member, bankCode, accountNumber);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // accountService에 id로 불러옹는 함수 작성
    @GetMapping("/getAccount")
    public ResponseEntity<AccountForm> getAccount() {
        AccountForm accountForm = new AccountForm();
        Account account = accountService.getAccount(accountId);

        accountForm.setBankCode(account.getBankCode());
        accountForm.setAccountNumber(account.getAccount());

        return new ResponseEntity<>(accountForm, HttpStatus.OK);
    }

    @PostMapping("/api/authorizeAccountOwner")
    public ResponseEntity<String> processAccountRequest(@RequestBody String requestData) {
//        String bankCode = requestData.getBankCode();
//        String accountNum = requestData.getAccountNum();

        log.info("api called!!");

        // Return a response as needed
//        return ResponseEntity.ok("Bankcode: " + bankCode + "Account Number: " + accountNum);
        return ResponseEntity.ok("api called");
    }

}
