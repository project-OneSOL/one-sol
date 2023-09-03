package shinhan.onesol.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import shinhan.onesol.enums.MemberStatusEnum;
import shinhan.onesol.enums.MemberTypeEnum;
import shinhan.onesol.enums.ProviderEnum;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "MEMBER")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String name;

    @Enumerated(value = EnumType.STRING)
    private MemberTypeEnum type;

    private String email;
    private String password;

    @Enumerated(value = EnumType.STRING)
    private MemberStatusEnum status;

    @Enumerated(value = EnumType.STRING)
    private ProviderEnum provider;

    @OneToMany(mappedBy = "friend")
    private List<MemberFriend> friends = new ArrayList<>();

    @Builder
    public Member(String name, MemberTypeEnum type, String email, String password, MemberStatusEnum status, ProviderEnum provider){
        this.name = name;
        this.type = type;
        this.email = email;
        this.password = password;
        this.status = status;
        this.provider = provider;
    }


}
