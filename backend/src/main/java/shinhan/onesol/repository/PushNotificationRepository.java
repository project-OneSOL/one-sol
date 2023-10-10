package shinhan.onesol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shinhan.onesol.domain.Member;
import shinhan.onesol.domain.PushNotification;

import java.util.List;
import java.util.Optional;

@Repository
public interface PushNotificationRepository extends JpaRepository<PushNotification, Long> {
    Optional<PushNotification> findByMember(Member member);
    Optional<PushNotification> findByMemberId(Long memberId);
}
