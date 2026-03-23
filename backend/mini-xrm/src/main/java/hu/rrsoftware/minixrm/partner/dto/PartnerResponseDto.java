package hu.rrsoftware.minixrm.partner.dto;

import hu.rrsoftware.minixrm.enums.PartnerStatus;
import hu.rrsoftware.minixrm.enums.QualificationType;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PartnerResponseDto {
    private Long id;
    private String name;
    private String taxNumber;
    private String headquarters;
    private PartnerStatus status;
    private Set<QualificationType> qualifications;
}
