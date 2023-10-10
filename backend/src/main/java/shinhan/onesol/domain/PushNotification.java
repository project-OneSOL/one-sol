package shinhan.onesol.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PushNotification {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String expoPushToken;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    private PushNotification(String expoPushToken, Member member) {
        this.expoPushToken = expoPushToken;
        this.member = member;
    }
}
