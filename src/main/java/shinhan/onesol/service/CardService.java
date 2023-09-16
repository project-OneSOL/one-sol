package shinhan.onesol.service;

import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import shinhan.onesol.domain.Card;
import shinhan.onesol.domain.Member;
import shinhan.onesol.enums.CardStatusEnum;
import shinhan.onesol.repository.CardRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;

    // 카드 등록
    public void registerCard(Member member, String cardNumber, String cardExpirationYear, String cardExpirationMonth, String customerIdentityNumber, CardStatusEnum status) {
        Card card = Card.builder()
                .cardNumber(cardNumber)
                .cardExpirationYear(cardExpirationYear)
                .cardExpirationMonth(cardExpirationMonth)
                .customerIdentityNumber(customerIdentityNumber)
                .member(member)
                .status(status)
                .build();
        cardRepository.save(card);
    }

    // 카드 리스트 조회
    public List<Card> getCardListForMember(Member member) {
        return cardRepository.findAllByMember(member);
    }

    // 대표 카드 조회
    public Card getRepresentativeCardForMember(Member member) {
        return cardRepository.findByMemberAndStatus(member, CardStatusEnum.CHECKED);
    }


}
