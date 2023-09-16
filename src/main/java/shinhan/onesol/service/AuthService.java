package shinhan.onesol.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shinhan.onesol.domain.Member;
import shinhan.onesol.dto.TokenInfo;
import shinhan.onesol.enums.MemberStatusEnum;
import shinhan.onesol.exception.DuplicateEmailException;
import shinhan.onesol.repository.MemberRepository;
import shinhan.onesol.request.SignUp;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void signUp(SignUp signUp) {
        // 중복 이메일 체크
        Optional<Member> userEmail = memberRepository.findByEmail(signUp.getEmail());
        if (userEmail.isPresent()) {
            throw new DuplicateEmailException();
        }

        String encodedPassword = passwordEncoder.encode(signUp.getPassword());

        Member user = Member.builder()
                .name(signUp.getName())
                .email(signUp.getEmail())
                .phoneNumber(signUp.getPhoneNumber())
                .type(signUp.getType())
                .status(MemberStatusEnum.UNCHECKED)
                .password(encodedPassword)
                .build();
        if (signUp.getCorpRegisterNum() != null) { // 점주
            user.setCorpRegisterNum(signUp.getCorpRegisterNum());
        }
        memberRepository.save(user);
    }

}
