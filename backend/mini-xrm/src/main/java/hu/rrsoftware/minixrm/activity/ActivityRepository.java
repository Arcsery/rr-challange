package hu.rrsoftware.minixrm.activity;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByPartnerId(Long partnerId);
    boolean existsByPartnerId(Long partnerId);
}
