package shinhan.onesol.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import shinhan.onesol.domain.Card;
import shinhan.onesol.domain.Member;
import shinhan.onesol.dto.CardRegisterDto;
import shinhan.onesol.repository.CardRepository;
import shinhan.onesol.security.PrincipalDetails;
import shinhan.onesol.service.CardService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/accounts")
public class CardController {
    private final CardRepository cardRepository;
    private final CardService cardService;

    @PostMapping("/register")
    public ResponseEntity<Void> registerCard(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody CardRegisterDto cardRegisterDto) {
        Member member = principalDetails.getMember();
        cardService.registerCard(member, cardRegisterDto.getCardNumber(), cardRegisterDto.getCardExpirationYear(), cardRegisterDto.getCardExpirationMonth(), cardRegisterDto.getCustomerIdentityNumber(), cardRegisterDto.getStatus());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/cards")
    public ResponseEntity<List<Card>> getCardList(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        Member member = principalDetails.getMember();
        List<Card> cardList = cardService.getCardListForMember(member);
        return new ResponseEntity<>(cardList, HttpStatus.OK);
    }

    @GetMapping("/representativeCard")
    public ResponseEntity<Card> getRepresentativeCard(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        Member member = principalDetails.getMember();
        Card representativeCard = cardService.getRepresentativeCardForMember(member);
        if (representativeCard != null) {
            return new ResponseEntity<>(representativeCard, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
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
