package hu.rrsoftware.minixrm.general.report.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReportDto {
    private String responsibleName;
    private Long totalMinutes;
    private Long uniquePartnerCount;
}
