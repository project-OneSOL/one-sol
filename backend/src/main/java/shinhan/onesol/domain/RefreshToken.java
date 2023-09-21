package shinhan.onesol.domain;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;


@Getter
@RedisHash(value = "refreshToken", timeToLive = 30 * 24 * 60 * 60)
public class RefreshToken {
    @Id
    private String email;
    private String refreshToken;

    public RefreshToken(String email, String refreshToken) {
        this.email = email;
        this.refreshToken = refreshToken;
    }
}