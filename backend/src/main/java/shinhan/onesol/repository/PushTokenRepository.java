package shinhan.onesol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shinhan.onesol.domain.PushToken;

public interface PushTokenRepository extends JpaRepository<PushToken, Long> {
}
