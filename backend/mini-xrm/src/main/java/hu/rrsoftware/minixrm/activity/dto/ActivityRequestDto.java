package hu.rrsoftware.minixrm.activity.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActivityRequestDto {
    @NotBlank
    private String subject;

    @NotBlank
    private String type;

    private String description;

    @NotNull
    @Positive
    private Integer durationMinutes;

    @NotBlank
    private String responsibleName;

    @NotNull
    private Long partnerId;
}
