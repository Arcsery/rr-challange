package hu.rrsoftware.minixrm.activity;

import hu.rrsoftware.minixrm.activity.dto.ActivityResponsibleReportDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByPartnerId(Long partnerId);
    @Query("""
        select new hu.rrsoftware.minixrm.activity.dto.ActivityResponsibleReportDto(
            a.responsibleName,
            sum(a.durationMinutes),
            count(distinct a.partner.id)
        )
        from Activity a
        group by a.responsibleName
        order by a.responsibleName
    """)
    List<ActivityResponsibleReportDto> getResponsibleActivityReport();
}
