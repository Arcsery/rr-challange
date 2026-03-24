package hu.rrsoftware.minixrm.activity.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActivityResponsibleReportDto {
    private String responsibleName;
    private Long totalMinutes;
    private Long uniquePartners;
}
