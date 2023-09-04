package shinhan.onesol.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import shinhan.onesol.domain.RefreshToken;
import shinhan.onesol.dto.TokenInfo;
import shinhan.onesol.repository.MemberRepository;
import shinhan.onesol.repository.RefreshTokenRepository;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtTokenProvider {
    private Key key;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final SignatureAlgorithm SIGNATURE_ALG = SignatureAlgorithm.HS256;
    private int MINUTE;
    private int HOUR;
    private int DAY;
    private long ACCESS_TOKEN_EXP_TIME;
    private long REFRESH_TOKEN_EXP_TIME;

    public JwtTokenProvider(
            @Value("${jwt.secretKey}") String secretKey,
            @Value("${time.ms.minute}") int minute,
            @Value("${time.ms.hour}") int hour,
            @Value("${time.ms.day}") int day,
            @Value("${time.token.accessExp}") long accessTokenExpTime,
            @Value("${time.token.refreshExp}") long refreshTokenExpTime,
            RefreshTokenRepository refreshTokenRepository,
            MemberRepository memberRepository
    ){
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.MINUTE = minute;
        this.HOUR = hour;
        this.DAY = day;
        this.ACCESS_TOKEN_EXP_TIME = accessTokenExpTime;
        this.REFRESH_TOKEN_EXP_TIME = refreshTokenExpTime;
        this.refreshTokenRepository = refreshTokenRepository;
        this.memberRepository = memberRepository;
    }

    public TokenInfo generateToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        // Access Token 생성
        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXP_TIME);
        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim("auth", authorities)
                .setExpiration(accessTokenExpiresIn)
                .signWith(key, SIGNATURE_ALG)
                .compact();

        // Refresh Token 생성
        String refreshToken = Jwts.builder()
                .setExpiration(new Date(now + REFRESH_TOKEN_EXP_TIME))
                .signWith(key, SIGNATURE_ALG)
                .compact();
        // Refresh Token 저장
        RefreshToken refToken = new RefreshToken(authentication.getName(), refreshToken);
        refreshTokenRepository.save(refToken);

        return TokenInfo.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    // JWT 토큰 복호화
    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);

        if (claims.get("auth") == null) {
            throw new IllegalStateException();
        }

        // 클레임에서 권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get("auth").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        // PrincipalDetails 객체를 만들어서 Authentication 리턴
        PrincipalDetails principal = memberRepository.findByEmail(claims.getSubject())
                .map(PrincipalDetails::new)
                .orElseThrow(() -> new IllegalStateException());

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    // 토큰 정보 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token", e);
            throw new IllegalStateException();
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token", e);
            throw new IllegalStateException();
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty.", e);
            throw new IllegalStateException();
        } catch (ExpiredJwtException e){
            log.error("Expired JWT Token", e);
            throw new IllegalStateException();
        }
    }

    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}