package shinhan.onesol.repository;

import org.springframework.data.repository.CrudRepository;
import shinhan.onesol.domain.RefreshToken;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
}
