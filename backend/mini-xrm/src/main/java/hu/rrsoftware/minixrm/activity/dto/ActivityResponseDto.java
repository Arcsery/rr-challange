package hu.rrsoftware.minixrm.activity.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActivityResponseDto {
    private Long id;
    private String subject;
    private String type;
    private String description;
    private Integer durationMinutes;
    private String responsibleName;
    private Long partnerId;
    private String partnerName;
}
