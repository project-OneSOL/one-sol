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
    private String storeName; // 점주 - 가게명
    private String corpRegisterNum; // 점주 - 사업자 번호

    @Enumerated(value = EnumType.STRING)
    private MemberTypeEnum type;

    private String email;
    private String password;
    private String phoneNumber;

    @Enumerated(value = EnumType.STRING)
    private MemberStatusEnum status; // 카드 등록 여부

    @OneToMany(mappedBy = "friend")
    private List<MemberFriend> friends = new ArrayList<>();

    @Builder
    public Member(String name, MemberTypeEnum type, String email, String password, MemberStatusEnum status, String phoneNumber){
        this.name = name;
        this.type = type;
        this.email = email;
        this.password = password;
        this.status = status;
        this.phoneNumber = phoneNumber;
    }


}
