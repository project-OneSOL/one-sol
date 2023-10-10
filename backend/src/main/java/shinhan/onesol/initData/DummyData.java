package shinhan.onesol.initData;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import shinhan.onesol.domain.Card;
import shinhan.onesol.domain.Member;
import shinhan.onesol.dto.TokenInfo;
import shinhan.onesol.enums.CardStatusEnum;
import shinhan.onesol.request.SignUp;
import shinhan.onesol.service.AuthService;
import shinhan.onesol.service.CardService;
import shinhan.onesol.service.MemberService;

import static shinhan.onesol.enums.MemberStatusEnum.CHECKED;
import static shinhan.onesol.enums.MemberStatusEnum.UNCHECKED;
import static shinhan.onesol.enums.MemberTypeEnum.GENERAL;
import static shinhan.onesol.enums.MemberTypeEnum.OWNER;

@Configuration
public class DummyData {

    @Bean
    CommandLineRunner initData(
            MemberService memberService,
            AuthService authService,
            CardService cardService
    ) {

        return args -> {
            SignUp signup1 = SignUp.builder()
                    .name("kim")
                    .email("kim@gmail.com")
                    .phoneNumber("01011112222")
                    .password("1234")
                    .type(GENERAL)
                    .status(CHECKED)
                    .build();

            SignUp signup2 = SignUp.builder()
                    .name("park")
                    .email("park@gmail.com")
                    .phoneNumber("01022223333")
                    .password("1234")
                    .type(GENERAL)
                    .status(CHECKED)
                    .build();

            SignUp signup3 = SignUp.builder()
                    .name("lee")
                    .email("lee@gmail.com")
                    .phoneNumber("01033334444")
                    .password("1234")
                    .type(OWNER)
                    .status(CHECKED)
                    .build();

            SignUp signup4 = SignUp.builder()
                    .name("choi")
                    .email("choi@gmail.com")
                    .phoneNumber("01044445555")
                    .password("1234")
                    .type(OWNER)
                    .status(CHECKED)
                    .build();

            authService.signUp(signup1);
            authService.signUp(signup2);
            authService.signUp(signup3);
            authService.signUp(signup4);

            Member member1 = memberService.getMember(signup1.getEmail());
            Member member2 = memberService.getMember(signup2.getEmail());
            Member member3 = memberService.getMember(signup3.getEmail());
            Member member4 = memberService.getMember(signup4.getEmail());

            cardService.registerCard(member1, "1111111111111111", "28", "11", "990830", CardStatusEnum.CHECKED, "신한카드");
            cardService.registerCard(member2, "1111111111111112", "28", "11", "990830", CardStatusEnum.CHECKED, "국민카드");
            cardService.registerCard(member3, "1111111111111113", "28", "11", "990830", CardStatusEnum.CHECKED, "우리카드");
            cardService.registerCard(member4, "1111111111111114", "28", "11", "990830", CardStatusEnum.CHECKED, "신한카드");

            memberService.addFriends(member1.getEmail(), member2.getEmail());
            memberService.addFriends(member1.getEmail(), member3.getEmail());
            memberService.addFriends(member1.getEmail(), member4.getEmail());
            memberService.addFriends(member2.getEmail(), member3.getEmail());
            memberService.addFriends(member2.getEmail(), member4.getEmail());
            memberService.addFriends(member3.getEmail(), member4.getEmail());

            // Login

        };
    }


}
