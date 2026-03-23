package hu.rrsoftware.minixrm.partner;

import hu.rrsoftware.minixrm.enums.QualificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, Long> {
    @Query("""
            select distinct p
            from Partner p
            join p.qualifications q
            where q = :qualification
            """)
    List<Partner> findByQualification(QualificationType qualification);
}
