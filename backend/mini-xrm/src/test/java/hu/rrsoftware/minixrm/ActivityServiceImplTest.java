package hu.rrsoftware.minixrm;

import hu.rrsoftware.minixrm.activity.Activity;
import hu.rrsoftware.minixrm.activity.ActivityRepository;
import hu.rrsoftware.minixrm.activity.ActivityServiceImpl;
import hu.rrsoftware.minixrm.activity.dto.ActivityRequestDto;
import hu.rrsoftware.minixrm.enums.PartnerStatus;
import hu.rrsoftware.minixrm.exception.BusinessException;
import hu.rrsoftware.minixrm.partner.Partner;
import hu.rrsoftware.minixrm.partner.PartnerRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(MockitoExtension.class)
class ActivityServiceImplTest {

    @Mock
    private ActivityRepository activityRepository;

    @Mock
    private PartnerRepository partnerRepository;

    @InjectMocks
    private ActivityServiceImpl activityService;

    @Test
    void create_shouldThrowBusinessException_whenPartnerIsInactive() {
        ActivityRequestDto dto = new ActivityRequestDto();
        dto.setSubject("Telefonhívás");
        dto.setType("CALL");
        dto.setDescription("Leírás");
        dto.setDurationMinutes(30);
        dto.setResponsibleName("Teszt Elek");
        dto.setPartnerId(1L);

        Partner partner = new Partner();
        partner.setId(1L);
        partner.setStatus(PartnerStatus.INACTIVE);

        when(partnerRepository.findById(1L)).thenReturn(Optional.of(partner));

        assertThrows(BusinessException.class, () -> activityService.create(dto));

        verify(activityRepository, never()).save(org.mockito.ArgumentMatchers.any(Activity.class));
    }

    @Test
    void create_shouldThrowBusinessException_whenDurationIsZero() {
        ActivityRequestDto dto = new ActivityRequestDto();
        dto.setSubject("Telefonhívás");
        dto.setType("CALL");
        dto.setDescription("Leírás");
        dto.setDurationMinutes(0);
        dto.setResponsibleName("Teszt Elek");
        dto.setPartnerId(1L);

        assertThrows(BusinessException.class, () -> activityService.create(dto));

        verify(partnerRepository, never()).findById(org.mockito.ArgumentMatchers.anyLong());
        verify(activityRepository, never()).save(org.mockito.ArgumentMatchers.any(Activity.class));
    }

    @Test
    void create_shouldThrowBusinessException_whenDurationIsNegative() {
        ActivityRequestDto dto = new ActivityRequestDto();
        dto.setSubject("Telefonhívás");
        dto.setType("CALL");
        dto.setDescription("Leírás");
        dto.setDurationMinutes(-10);
        dto.setResponsibleName("Teszt Elek");
        dto.setPartnerId(1L);

        assertThrows(BusinessException.class, () -> activityService.create(dto));

        verify(partnerRepository, never()).findById(org.mockito.ArgumentMatchers.anyLong());
        verify(activityRepository, never()).save(org.mockito.ArgumentMatchers.any(Activity.class));
    }
}
