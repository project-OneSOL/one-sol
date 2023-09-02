package shinhan.onesol.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import shinhan.onesol.enums.MemberStatusEnum;
import shinhan.onesol.enums.MemberTypeEnum;
import shinhan.onesol.enums.ProviderEnum;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Member")
@Getter
@NoArgsConstructor
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
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



}
