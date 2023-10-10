package shinhan.onesol.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shinhan.onesol.domain.Card;
import shinhan.onesol.domain.Member;
import shinhan.onesol.dto.CardDto;
import shinhan.onesol.enums.CardStatusEnum;
import shinhan.onesol.repository.CardRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;

    // 카드 등록
    public void registerCard(Member member, String cardNumber, String cardExpirationYear, String cardExpirationMonth, String customerIdentityNumber, CardStatusEnum status, String cardName) {
        Card existingCard = cardRepository.findByCardNumber(cardNumber);
        if (existingCard == null) {
            Card card = Card.builder()
                    .cardNumber(cardNumber)
                    .cardExpirationYear(cardExpirationYear)
                    .cardExpirationMonth(cardExpirationMonth)
                    .customerIdentityNumber(customerIdentityNumber)
                    .member(member)
                    .status(status)
                    .cardName(cardName)
                    .build();
            cardRepository.save(card);
        } else {
            throw new IllegalArgumentException("이미 카드가 등록되어 있습니다.");
        }
    }

    // 카드 리스트 조회
    public List<CardDto> getCardListForMember(Member member) {
        List<Card> cards = cardRepository.findAllByMember(member);
        return cards.stream()
                .map(card -> new CardDto(
                        card.getCardNumber(),
                        card.getCardExpirationYear(),
                        card.getCardExpirationMonth(),
                        card.getCustomerIdentityNumber(),
                        card.getStatus(),
                        card.getCardName()
                ))
                .collect(Collectors.toList());
    }

    // 대표 카드 조회
    public CardDto getRepresentativeCardForMember(Member member) {
        Card card = cardRepository.findByMemberAndStatus(member, CardStatusEnum.CHECKED);
        return  new CardDto(
                card.getCardNumber(),
                card.getCardExpirationYear(),
                card.getCardExpirationMonth(),
                card.getCustomerIdentityNumber(),
                card.getStatus(),
                card.getCardName()
        );
    }


}
