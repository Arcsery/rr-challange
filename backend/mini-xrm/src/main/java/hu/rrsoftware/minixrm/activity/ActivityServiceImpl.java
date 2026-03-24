package hu.rrsoftware.minixrm.activity;

import hu.rrsoftware.minixrm.activity.dto.ActivityRequestDto;
import hu.rrsoftware.minixrm.activity.dto.ActivityResponseDto;
import hu.rrsoftware.minixrm.activity.dto.ActivityResponsibleReportDto;
import hu.rrsoftware.minixrm.enums.PartnerStatus;
import hu.rrsoftware.minixrm.exception.BusinessException;
import hu.rrsoftware.minixrm.exception.ResourceNotFoundException;
import hu.rrsoftware.minixrm.partner.Partner;
import hu.rrsoftware.minixrm.partner.PartnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {

    private final ActivityRepository activityRepository;
    private final PartnerRepository partnerRepository;


    @Override
    @Transactional
    public ActivityResponseDto create(ActivityRequestDto dto) {

        if (dto.getDurationMinutes() == null || dto.getDurationMinutes() <= 0) {
            throw new BusinessException("Duration must be greater than 0");
        }

        Partner partner = partnerRepository.findById(dto.getPartnerId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Partner not found with id: " + dto.getPartnerId()
                ));

        if (partner.getStatus() == PartnerStatus.INACTIVE) {
            throw new BusinessException("Cannot create activity for inactive partner");
        }

        Activity activity = new Activity();
        mapToEntity(dto, activity, partner);

        return mapToResponse(activityRepository.save(activity));
    }

    @Override
    @Transactional
    public ActivityResponseDto update(Long id, ActivityRequestDto dto) {
        Activity activity = activityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Activity not found with id: " + id
                ));

        Partner partner = partnerRepository.findById(dto.getPartnerId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Partner not found with id: " + dto.getPartnerId()
                ));

        if (partner.getStatus() == PartnerStatus.INACTIVE) {
            throw new BusinessException("Cannot assign activity to inactive partner");
        }

        mapToEntity(dto, activity, partner);

        return mapToResponse(activityRepository.save(activity));
    }

    @Override
    public List<ActivityResponsibleReportDto> getResponsibleActivityReport() {
        return activityRepository.getResponsibleActivityReport();
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Activity activity = activityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Activity not found with id: " + id
                ));

        activityRepository.delete(activity);
    }

    private void mapToEntity(ActivityRequestDto dto, Activity activity, Partner partner) {
        activity.setSubject(dto.getSubject());
        activity.setType(dto.getType());
        activity.setDescription(dto.getDescription());
        activity.setDurationMinutes(dto.getDurationMinutes());
        activity.setResponsibleName(dto.getResponsibleName());
        activity.setPartner(partner);
    }

    private ActivityResponseDto mapToResponse(Activity activity) {
        ActivityResponseDto dto = new ActivityResponseDto();
        dto.setId(activity.getId());
        dto.setSubject(activity.getSubject());
        dto.setType(activity.getType());
        dto.setDescription(activity.getDescription());
        dto.setDurationMinutes(activity.getDurationMinutes());
        dto.setResponsibleName(activity.getResponsibleName());
        dto.setPartnerId(activity.getPartner().getId());
        dto.setPartnerName(activity.getPartner().getName());
        return dto;
    }
}
