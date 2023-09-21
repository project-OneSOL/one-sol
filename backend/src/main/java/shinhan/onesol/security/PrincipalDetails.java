package shinhan.onesol.security;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import shinhan.onesol.domain.Member;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

// 시큐리티가 "/auth/login" 주소 요청이 오면 낚아채서 로그인을 진행
// 로그인 진행이 완료되면 시큐리티 session을 만들어준다.(Security Session(Session안에 특정영역))
// 해당 세션안에는 Authentication 타입객체가 들어간다.
// Authentication 은 UserDetails 타입 객체가 들어갈수 있다.
// UserDetails 안에 Member(사용자)를 가지고 있다.
@Data
public class PrincipalDetails implements UserDetails, OAuth2User {
    // 컨트롤러에서 Authentication 객체를 가져올때 일반 / OAuth2 로그인 모두 동일한 객체를 가져올 수 있도록 함께 상속
    private Member member;
    private Map<String, Object> attributes;


    // 일반 로그인 생성자
    public PrincipalDetails(Member member) {
        this.member = member;
    }

    // OAuth 로그인 생성자
    public PrincipalDetails(Member member, Map<String, Object> attributes) {
        this.member = member;
        this.attributes = attributes;
    }

    /**
     * OAuth2User 인터페이스 메소드
     */
    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    /**
     * UserDetails 인터페이스 메소드
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(() -> String.valueOf(member.getType()));
        return authorities;
    }



    @Override
    public String getPassword() {
        return member.getPassword();
    }

    @Override
    public String getUsername() {
        return member.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getName() {
        return getUsername();
    }
}
