package hu.rrsoftware.minixrm.partner;

import hu.rrsoftware.minixrm.enums.QualificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, Long> {
    @Query("""
        select p
        from Partner p
        join p.qualifications q
        where q in :qualifications
        group by p
        having count(distinct q) = :qualificationCount
        """)
    List<Partner> findByAllQualifications(
            List<QualificationType> qualifications,
            long qualificationCount
    );
}
