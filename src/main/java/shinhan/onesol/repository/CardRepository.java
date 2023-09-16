package shinhan.onesol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shinhan.onesol.domain.Card;
import shinhan.onesol.domain.Member;
import shinhan.onesol.enums.CardStatusEnum;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card> findAllByMember(Member member);
    Card findByMemberAndStatus(Member member, CardStatusEnum status);
}
