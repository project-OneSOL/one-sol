package shinhan.onesol.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "MEMBER_FRIEND")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberFriend {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "friend_id", referencedColumnName = "member_id")
    private Member friend;

    @Builder
    public MemberFriend(Member member, Member friend){
        this.member = member;
        this.friend = friend;
    }
}
