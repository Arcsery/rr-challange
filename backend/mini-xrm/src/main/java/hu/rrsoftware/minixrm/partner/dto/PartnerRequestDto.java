package hu.rrsoftware.minixrm.partner.dto;

import hu.rrsoftware.minixrm.enums.PartnerStatus;
import hu.rrsoftware.minixrm.enums.QualificationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PartnerRequestDto {

    @NotBlank
    private String name;
    @NotBlank
    private String taxNumber;
    @NotBlank
    private String headquarters;
    @NotNull
    private PartnerStatus status;
    private Set<QualificationType> qualifications = new HashSet<>();
}
