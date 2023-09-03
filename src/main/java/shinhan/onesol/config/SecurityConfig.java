package shinhan.onesol.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import shinhan.onesol.security.PrincipalService;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final PrincipalService principalService;

    // TODO 로그인 인증에 상관없이 가져와야 할 페이지들

    // 권한에 따라 허용하는 url 설정
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // /login, /signup 페이지는 모두 허용, 다른 페이지는 인증된 사용자만 허용
        http
                .authorizeHttpRequests()
                .requestMatchers(
                        new AntPathRequestMatcher("/**")
                ).permitAll()
                .anyRequest().authenticated();

        // login 설정
        http
                .formLogin()
                .loginPage("/auth/login")    // GET: 로그인 폼을 보여줌
                .usernameParameter("email")    // 로그인에 필요한 아이디
                .passwordParameter("password")    // 로그인에 필요한 password 값
                .defaultSuccessUrl("/");    // 로그인에 성공하면 /로 redirect
        // TODO 소셜로그인 설정

        // logout 설정
        http
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/auth/logout"))
                .logoutSuccessUrl("/")    // 로그아웃에 성공하면 /로 redirect
                .invalidateHttpSession(true); // 세션 삭제

        http
                .userDetailsService(principalService);

        return http.build();

    }

    // TODO 비밀번호 찾기 설정 등록

    // 로그인 방식 등록
    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration ac) throws Exception {
        return ac.getAuthenticationManager();
    }
}