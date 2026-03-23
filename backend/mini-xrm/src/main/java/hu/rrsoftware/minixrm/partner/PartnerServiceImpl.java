package hu.rrsoftware.minixrm.partner;

import hu.rrsoftware.minixrm.activity.Activity;
import hu.rrsoftware.minixrm.activity.ActivityRepository;
import hu.rrsoftware.minixrm.activity.dto.ActivityResponseDto;
import hu.rrsoftware.minixrm.enums.QualificationType;
import hu.rrsoftware.minixrm.exception.BusinessException;
import hu.rrsoftware.minixrm.exception.ResourceNotFoundException;
import hu.rrsoftware.minixrm.partner.dto.PartnerDetailDto;
import hu.rrsoftware.minixrm.partner.dto.PartnerRequestDto;
import hu.rrsoftware.minixrm.partner.dto.PartnerResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PartnerServiceImpl implements PartnerService {

    private final PartnerRepository partnerRepository;
    private final ActivityRepository activityRepository;

    @Override
    public PartnerResponseDto create(PartnerRequestDto dto) {
        Partner partner = new Partner();
        mapToEntity(dto, partner);
        return mapToResponse(partnerRepository.save(partner));
    }

    @Override
    public PartnerResponseDto update(Long id, PartnerRequestDto dto) {
        Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Partner not found with id: " + id));

        mapToEntity(dto, partner);
        return mapToResponse(partnerRepository.save(partner));
    }

    @Override
    public void delete(Long id) {
        Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Partner not found with id: " + id));

        if (activityRepository.existsByPartnerId(id)) {
            throw new BusinessException("Partner cannot be deleted because it has related activities");
        }

        partnerRepository.delete(partner);
    }

    @Override
    public PartnerResponseDto getById(Long id) {
        Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Partner not found with id: " + id));

        return mapToResponse(partner);
    }

    @Override
    public PartnerDetailDto getDetailById(Long id) {
        Partner partner = partnerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Partner not found with id: " + id));

        List<ActivityResponseDto> activities =
                activityRepository.findByPartnerId(id)
                        .stream()
                        .map(this::mapActivityToResponse)
                        .toList();

        PartnerDetailDto dto = new PartnerDetailDto();

        dto.setId(partner.getId());
        dto.setName(partner.getName());
        dto.setTaxNumber(partner.getTaxNumber());
        dto.setHeadquarters(partner.getHeadquarters());
        dto.setStatus(partner.getStatus());
        dto.setQualifications(partner.getQualifications());

        dto.setActivities(activities);
        return dto;
    }

    @Override
    public List<PartnerResponseDto> getAll(List<QualificationType> qualifications) {
        List<Partner> partners =
                (qualifications == null || qualifications.isEmpty())
                        ? partnerRepository.findAll()
                        : partnerRepository.findByAllQualifications(qualifications, (long) qualifications.size());

        return partners.stream()
                .map(this::mapToResponse)
                .toList();
    }

    private void mapToEntity(PartnerRequestDto dto, Partner partner) {
        partner.setName(dto.getName());
        partner.setTaxNumber(dto.getTaxNumber());
        partner.setHeadquarters(dto.getHeadquarters());
        partner.setStatus(dto.getStatus());
        partner.setQualifications(dto.getQualifications());
    }

    private PartnerResponseDto mapToResponse(Partner partner) {
        PartnerResponseDto dto = new PartnerResponseDto();
        dto.setId(partner.getId());
        dto.setName(partner.getName());
        dto.setTaxNumber(partner.getTaxNumber());
        dto.setHeadquarters(partner.getHeadquarters());
        dto.setStatus(partner.getStatus());
        dto.setQualifications(partner.getQualifications());
        return dto;
    }

    private ActivityResponseDto mapActivityToResponse(Activity activity) {

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
