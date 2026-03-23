package hu.rrsoftware.minixrm.partner;

import hu.rrsoftware.minixrm.enums.QualificationType;
import hu.rrsoftware.minixrm.partner.dto.PartnerDetailDto;
import hu.rrsoftware.minixrm.partner.dto.PartnerRequestDto;
import hu.rrsoftware.minixrm.partner.dto.PartnerResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/partners")
@RequiredArgsConstructor
public class PartnerController {
    private final PartnerService partnerService;

    @PostMapping
    public ResponseEntity<PartnerResponseDto> create(@Valid @RequestBody PartnerRequestDto dto) {
        PartnerResponseDto response = partnerService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PartnerResponseDto> update(@PathVariable Long id,
                                                     @Valid @RequestBody PartnerRequestDto dto) {
        PartnerResponseDto response = partnerService.update(id, dto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        partnerService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<PartnerResponseDto>> getAll(
            @RequestParam(name = "qualification", required = false)
            List<QualificationType> qualifications
    ) {
        return ResponseEntity.ok(partnerService.getAll(qualifications));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PartnerDetailDto> getDetailById(@PathVariable Long id) {
        return ResponseEntity.ok(partnerService.getDetailById(id));
    }
}
