//package shinhan.onesol.security;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import shinhan.onesol.domain.Member;
//import shinhan.onesol.enums.ProviderEnum;
//import shinhan.onesol.repository.MemberRepository;
//import shinhan.onesol.security.PrincipalDetails;
//
//import java.util.Map;
//
//@Service
//@RequiredArgsConstructor
//public class PrincipalOauthUserService extends DefaultOAuth2UserService {
//    private final MemberRepository memberRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    // Resource Server로부터 받은 userRequest 데이터 후처리
//    // 함수 종료시 @AuthenticationPrincipal 어노테이션이 만들어진다.
//    @Override
//    @Transactional
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//
//        // registraionId로 어떤 OAuth로 로그인 했는지 확인
//        System.out.println("getClientRegistration: " + userRequest.getClientRegistration());
//        System.out.println("getAccessToken: " + userRequest.getAccessToken().getTokenValue());
//        System.out.println("getAttributes: " + super.loadUser(userRequest).getAttributes());
//        // 소셜 로그인 버튼 클릭 -> 소셜 로그인 창 -> 로그인 완료 -> code를 리턴(OAuth - Client 라이브러리가 받아줌) -> code를 통해서 AccessToken 요청
//        // => "userRequest"가 가지고 있는 정보
//        // 회원 프로필을 받을 때 사용되는 "loadUser" 함수 -> Resource Server로부터 정보를 받을 수 있다.
//
//        // OAuth 로그인 회원 가입
//        OAuth2User oAuth2User = super.loadUser(userRequest);
//        OAuth2UserInfo oAuth2UserInfo = null;
//
//        if (userRequest.getClientRegistration().getRegistrationId().equals("kakao")) {
//            oAuth2UserInfo = new KakaoUserInfo((Map) oAuth2User.getAttributes().get("kakao_account"),
//                    String.valueOf(oAuth2User.getAttributes().get("id")));
//        } else if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
//            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
//        } else if (userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
//            oAuth2UserInfo = new NaverUserInfo((Map) oAuth2User.getAttributes().get("response"));
//        } else {
//            System.out.println("지원하지 않는 로그인 서비스 입니다.");
//        }
//
//        ProviderEnum providerType = ProviderEnum.valueOf(oAuth2UserInfo.getProviderType());
//        String providerId = oAuth2UserInfo.getProviderId();
//        String email = oAuth2UserInfo.getEmail();
//        String username = providerType.toString().toLowerCase() + "_" + providerId;
//        String password = passwordEncoder.encode("");
//        String nickname = providerType.toString().toLowerCase() + "_" + username.substring(username.indexOf("_") + 1, username.indexOf("_") + 7);
//
//        Member memberEntity = memberRepository.findByUsername(username).orElse(null);
//        // 처음 서비스를 이용한 회원일 경우
//        if (memberEntity == null) {
//            memberEntity = Member.builder()
//                    .provider(providerType)
//                    .email(email)
//                    .password(password)
//                    .build();
//            memberRepository.save(memberEntity);
//        }
//
//        return new PrincipalDetails(memberEntity, oAuth2User.getAttributes());
//    }
//}