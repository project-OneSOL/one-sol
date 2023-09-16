package shinhan.onesol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import shinhan.onesol.domain.Member;
import shinhan.onesol.domain.Payment;
import shinhan.onesol.domain.SubPayment;

import java.util.List;

@Repository
public interface SubPaymentRepository extends JpaRepository<SubPayment, Long> {
    List<SubPayment> findByPayment(Payment payment);
    List<SubPayment> findByMember(Member member);
    List<SubPayment> findByPaymentId(Long paymentId);

    List<SubPayment> findByPaymentIdOrderByDateDesc(Long paymentId);

}
