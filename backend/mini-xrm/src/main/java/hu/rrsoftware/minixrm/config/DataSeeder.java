package hu.rrsoftware.minixrm.config;

import hu.rrsoftware.minixrm.activity.Activity;
import hu.rrsoftware.minixrm.activity.ActivityRepository;
import hu.rrsoftware.minixrm.enums.PartnerStatus;
import hu.rrsoftware.minixrm.enums.QualificationType;
import hu.rrsoftware.minixrm.partner.Partner;
import hu.rrsoftware.minixrm.partner.PartnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Set;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    @Bean
    CommandLineRunner seedDatabase(
            PartnerRepository partnerRepository,
            ActivityRepository activityRepository
    ) {
        return args -> {
            if (partnerRepository.count() > 0) {
                return;
            }

            Partner partner1 = new Partner();
            partner1.setName("Alfa Kft.");
            partner1.setTaxNumber("12345678-1-41");
            partner1.setHeadquarters("Budapest");
            partner1.setStatus(PartnerStatus.ACTIVE);
            partner1.setQualifications(Set.of(
                    QualificationType.AKTIV,
                    QualificationType.TOP
            ));

            Partner partner2 = new Partner();
            partner2.setName("Beta Export Zrt.");
            partner2.setTaxNumber("87654321-2-42");
            partner2.setHeadquarters("Szeged");
            partner2.setStatus(PartnerStatus.ACTIVE);
            partner2.setQualifications(Set.of(
                    QualificationType.EXPORT,
                    QualificationType.KULFOLDI
            ));

            Partner partner3 = new Partner();
            partner3.setName("Gamma Bt.");
            partner3.setTaxNumber("11223344-1-43");
            partner3.setHeadquarters("Pécs");
            partner3.setStatus(PartnerStatus.INACTIVE);
            partner3.setQualifications(Set.of(
                    QualificationType.AKTIV
            ));

            Partner partner4 = new Partner();
            partner4.setName("Delta Solutions Kft.");
            partner4.setTaxNumber("22334455-1-44");
            partner4.setHeadquarters("Debrecen");
            partner4.setStatus(PartnerStatus.ACTIVE);
            partner4.setQualifications(Set.of(
                    QualificationType.TOP
            ));

            Partner partner5 = new Partner();
            partner5.setName("Epsilon Logisztika Zrt.");
            partner5.setTaxNumber("33445566-2-45");
            partner5.setHeadquarters("Győr");
            partner5.setStatus(PartnerStatus.ACTIVE);
            partner5.setQualifications(Set.of(
                    QualificationType.EXPORT
            ));

            Partner partner6 = new Partner();
            partner6.setName("Zeta Trade Kft.");
            partner6.setTaxNumber("44556677-1-46");
            partner6.setHeadquarters("Kecskemét");
            partner6.setStatus(PartnerStatus.INACTIVE);
            partner6.setQualifications(Set.of(
                    QualificationType.KULFOLDI
            ));

            Partner partner7 = new Partner();
            partner7.setName("Eta Services Bt.");
            partner7.setTaxNumber("55667788-1-47");
            partner7.setHeadquarters("Nyíregyháza");
            partner7.setStatus(PartnerStatus.ACTIVE);
            partner7.setQualifications(Set.of(
                    QualificationType.AKTIV,
                    QualificationType.EXPORT
            ));

            Partner partner8 = new Partner();
            partner8.setName("Theta Consulting Kft.");
            partner8.setTaxNumber("66778899-1-48");
            partner8.setHeadquarters("Miskolc");
            partner8.setStatus(PartnerStatus.ACTIVE);
            partner8.setQualifications(Set.of(
                    QualificationType.TOP
            ));

            Partner partner9 = new Partner();
            partner9.setName("Iota Global Zrt.");
            partner9.setTaxNumber("77889900-2-49");
            partner9.setHeadquarters("Székesfehérvár");
            partner9.setStatus(PartnerStatus.ACTIVE);
            partner9.setQualifications(Set.of(
                    QualificationType.EXPORT,
                    QualificationType.KULFOLDI
            ));

            Partner partner10 = new Partner();
            partner10.setName("Kappa Engineering Kft.");
            partner10.setTaxNumber("88990011-1-50");
            partner10.setHeadquarters("Szolnok");
            partner10.setStatus(PartnerStatus.INACTIVE);
            partner10.setQualifications(Set.of(
                    QualificationType.AKTIV
            ));

            Partner partner11 = new Partner();
            partner11.setName("Lambda Systems Bt.");
            partner11.setTaxNumber("99001122-1-51");
            partner11.setHeadquarters("Sopron");
            partner11.setStatus(PartnerStatus.ACTIVE);
            partner11.setQualifications(Set.of(
                    QualificationType.TOP,
                    QualificationType.EXPORT
            ));
            partnerRepository.save(partner1);
            partnerRepository.save(partner2);
            partnerRepository.save(partner3);
            partnerRepository.save(partner4);
            partnerRepository.save(partner5);
            partnerRepository.save(partner6);
            partnerRepository.save(partner7);
            partnerRepository.save(partner8);
            partnerRepository.save(partner9);
            partnerRepository.save(partner10);
            partnerRepository.save(partner11);

            Activity activity1 = new Activity();
            activity1.setSubject("Telefonos egyeztetés");
            activity1.setType("CALL");
            activity1.setDescription("Első kapcsolatfelvétel");
            activity1.setDurationMinutes(30);
            activity1.setResponsibleName("Kiss Péter");
            activity1.setPartner(partner1);

            Activity activity2 = new Activity();
            activity2.setSubject("Személyes meeting");
            activity2.setType("MEETING");
            activity2.setDescription("Szerződés egyeztetése");
            activity2.setDurationMinutes(90);
            activity2.setResponsibleName("Kiss Péter");
            activity2.setPartner(partner2);

            Activity activity3 = new Activity();
            activity3.setSubject("Follow-up email");
            activity3.setType("EMAIL");
            activity3.setDescription("Ajánlat kiküldése");
            activity3.setDurationMinutes(15);
            activity3.setResponsibleName("Nagy Anna");
            activity3.setPartner(partner1);

            Activity activity4 = new Activity();
            activity4.setSubject("Online demo");
            activity4.setType("MEETING");
            activity4.setDescription("Termékbemutató");
            activity4.setDurationMinutes(45);
            activity4.setResponsibleName("Nagy Anna");
            activity4.setPartner(partner4);

            Activity activity5 = new Activity();
            activity5.setSubject("Ajánlat egyeztetés");
            activity5.setType("CALL");
            activity5.setDescription("Ár pontosítása");
            activity5.setDurationMinutes(20);
            activity5.setResponsibleName("Kiss Péter");
            activity5.setPartner(partner5);

            Activity activity6 = new Activity();
            activity6.setSubject("Projekt kickoff");
            activity6.setType("MEETING");
            activity6.setDescription("Projekt indítása");
            activity6.setDurationMinutes(120);
            activity6.setResponsibleName("Szabó Márk");
            activity6.setPartner(partner7);

            Activity activity7 = new Activity();
            activity7.setSubject("Support email");
            activity7.setType("EMAIL");
            activity7.setDescription("Technikai kérdés");
            activity7.setDurationMinutes(10);
            activity7.setResponsibleName("Kiss Péter");
            activity7.setPartner(partner8);

            Activity activity8 = new Activity();
            activity8.setSubject("Szerződés véglegesítés");
            activity8.setType("MEETING");
            activity8.setDescription("Aláírás előkészítés");
            activity8.setDurationMinutes(60);
            activity8.setResponsibleName("Szabó Márk");
            activity8.setPartner(partner9);

            Activity activity9 = new Activity();
            activity9.setSubject("Follow-up call");
            activity9.setType("CALL");
            activity9.setDescription("Kapcsolattartás");
            activity9.setDurationMinutes(15);
            activity9.setResponsibleName("Nagy Anna");
            activity9.setPartner(partner11);

            activityRepository.save(activity1);
            activityRepository.save(activity2);
            activityRepository.save(activity3);
            activityRepository.save(activity4);
            activityRepository.save(activity5);
            activityRepository.save(activity6);
            activityRepository.save(activity7);
            activityRepository.save(activity8);
            activityRepository.save(activity9);
        };
    }
}
