package shinhan.onesol.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "PUSH_TOKEN")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class PushToken {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "push_token_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    private Member member;

    private String token;

    @Builder
    public PushToken(Member member, String token) {
        this.member = member;
        this.token = token;
    }
}
