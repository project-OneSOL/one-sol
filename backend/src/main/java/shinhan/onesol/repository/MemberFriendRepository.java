package shinhan.onesol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shinhan.onesol.domain.Member;
import shinhan.onesol.domain.MemberFriend;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberFriendRepository extends JpaRepository<MemberFriend, Long> {
    Optional<MemberFriend> findByMemberAndFriend(Member member, Member memberFriend);
    List<MemberFriend> findAllByMember(Member member);

}
