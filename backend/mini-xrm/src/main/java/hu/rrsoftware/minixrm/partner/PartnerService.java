package hu.rrsoftware.minixrm.partner;

import hu.rrsoftware.minixrm.enums.QualificationType;
import hu.rrsoftware.minixrm.partner.dto.PartnerDetailDto;
import hu.rrsoftware.minixrm.partner.dto.PartnerRequestDto;
import hu.rrsoftware.minixrm.partner.dto.PartnerResponseDto;

import java.util.List;

public interface PartnerService {

    PartnerResponseDto create(PartnerRequestDto dto);

    PartnerResponseDto update(Long id, PartnerRequestDto dto);

    void delete(Long id);

    PartnerResponseDto getById(Long id);

    PartnerDetailDto getDetailById(Long id);

    List<PartnerResponseDto> getAll(QualificationType qualification);
}
