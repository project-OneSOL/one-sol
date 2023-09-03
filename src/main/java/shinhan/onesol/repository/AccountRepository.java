package shinhan.onesol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shinhan.onesol.domain.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
}
