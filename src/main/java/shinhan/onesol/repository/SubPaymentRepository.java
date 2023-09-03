package shinhan.onesol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shinhan.onesol.domain.SubPayment;

@Repository
public interface SubPaymentRepository extends JpaRepository<SubPayment, Long> {
}
