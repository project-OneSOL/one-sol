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
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import shinhan.onesol.security.JwtAuthenticationFilter;
import shinhan.onesol.security.PrincipalService;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final PrincipalService principalService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final String[] PUBLIC_URL = {
            "/auth/signUp",
            "/auth/login",
            "/mail/authentication",
            "/auth/**",
            "/oauth2/**",
            "/login/**",

            // 수정 필요
            "/api/payments/**"
    };

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .sessionManagement()
                .enableSessionUrlRewriting(true)
                .and()

                .authorizeRequests()
                .antMatchers(PUBLIC_URL).permitAll()
                .antMatchers("/members/user").hasRole("GENERAL")
                .antMatchers("/members/owner").hasRole("OWNER")
                .anyRequest().permitAll()
                .and()

                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 로그인 방식 등록
    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration ac) throws Exception {
        return ac.getAuthenticationManager();
    }
}