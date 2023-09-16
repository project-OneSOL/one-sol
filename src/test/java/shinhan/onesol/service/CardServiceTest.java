package shinhan.onesol.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import shinhan.onesol.domain.Card;
import shinhan.onesol.domain.Member;
import shinhan.onesol.dto.CardDto;
import shinhan.onesol.enums.CardStatusEnum;
import shinhan.onesol.enums.MemberStatusEnum;
import shinhan.onesol.enums.MemberTypeEnum;
import shinhan.onesol.repository.CardRepository;
import shinhan.onesol.repository.MemberRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class CardServiceTest {

    @Autowired
    CardService cardService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    CardRepository cardRepository;

    @Test
    void registerCard() {
        // 테스트 데이터 생성
        Member member = new Member("testuser", MemberTypeEnum.GENERAL, "pkr951113@naver.com ", "1234", MemberStatusEnum.CHECKED, "010-1234-5678");

        member = memberRepository.save(member);

        String cardNumber = "1234567890123456";
        String cardExpirationYear = "2025";
        String cardExpirationMonth = "12";
        String customerIdentityNumber = "1234567890";

        // 카드 등록
        cardService.registerCard(member, cardNumber, cardExpirationYear, cardExpirationMonth, customerIdentityNumber, CardStatusEnum.CHECKED);

        // 등록된 카드 확인
        List<CardDto> cardList = cardService.getCardListForMember(member);
        for (CardDto card : cardList) {
            System.out.println(card.getCardNumber());
            System.out.println(card.getCardExpirationYear());
            System.out.println(card.getCardExpirationMonth());
            System.out.println(card.getCustomerIdentityNumber());
        }

        // 대표 카드로 설정
        CardDto cardDto = cardService.getCardListForMember(member).get(0);
        Card card = cardRepository.findByCardNumber(cardDto.getCardNumber());
        cardRepository.save(card);

        // 대표 카드 조회
        CardDto representativeCard = cardService.getRepresentativeCardForMember(member);

        // 대표 카드가 올바르게 조회되었는지 확인
        assertNotNull(representativeCard);
        assertEquals(CardStatusEnum.CHECKED, representativeCard.getStatus());
    }

}