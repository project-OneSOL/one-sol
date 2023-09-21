package shinhan.onesol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shinhan.onesol.domain.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
