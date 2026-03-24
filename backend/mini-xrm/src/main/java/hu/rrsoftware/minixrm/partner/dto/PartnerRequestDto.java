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

    private Long version;
    @NotBlank(message = "A partner neve kötelező")
    private String name;
    @NotBlank(message = "Az adószám kötelező")
    private String taxNumber;
    @NotBlank(message = "A székhely kötelező")
    private String headquarters;
    @NotNull(message = "A státusz kötelező")
    private PartnerStatus status;
    private Set<QualificationType> qualifications = new HashSet<>();
}
