package shinhan.onesol.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shinhan.onesol.domain.Member;
import shinhan.onesol.repository.MemberRepository;

// "/auth/login" 요청이 오면 자동으로 UserDetailsService 타입으로 loC 되어있는 loadUserByUsername 함수가 실행
// Authentication 객체로 만들어준다
@Service
@Transactional
@RequiredArgsConstructor
public class PrincipalService implements UserDetailsService {

    private final MemberRepository memberRepository;

    // 시큐리티 session => Authentication => UserDetails
    // 여기서 리턴된 값이 Authentication 안에 들어간다.(리턴될 때)
    // 그리고 시큐리티 session안에 Authentication이 들어간다.
    // 함수 종료시 @AuthenticationPrincipal 어노테이션이 만들어진다.
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("user(%s) not found".format(email)));
        return new PrincipalDetails(member, null);

    }
}