package shinhan.onesol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberFriend extends JpaRepository<shinhan.onesol.domain.MemberFriend, Long> {
}
