package hu.rrsoftware.minixrm.activity;

import hu.rrsoftware.minixrm.activity.dto.ActivityRequestDto;
import hu.rrsoftware.minixrm.activity.dto.ActivityResponseDto;
import hu.rrsoftware.minixrm.activity.dto.ActivityResponsibleReportDto;

import java.util.List;

public interface ActivityService {
    ActivityResponseDto create(ActivityRequestDto dto);

    ActivityResponseDto update(Long id, ActivityRequestDto dto);

    void delete(Long id);

    List<ActivityResponsibleReportDto>getResponsibleActivityReport();

}
