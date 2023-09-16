package shinhan.onesol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shinhan.onesol.domain.Card;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
}
