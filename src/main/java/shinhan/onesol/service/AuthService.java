성package shinhan.onesol.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import shinhan.onesol.domain.Member;
import shinhan.onesol.exception.DuplicateEmailException;
import shinhan.onesol.repository.MemberRepository;
import shinhan.onesol.request.SignUp;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

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
                .type(signUp.getTypeEnum())
                .password(encodedPassword)
                .build();
        memberRepository.save(user);
    }
}
