package hu.rrsoftware.minixrm.partner.dto;

import hu.rrsoftware.minixrm.activity.dto.ActivityResponseDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PartnerDetailDto extends PartnerResponseDto{
    private List<ActivityResponseDto> activities;
}
