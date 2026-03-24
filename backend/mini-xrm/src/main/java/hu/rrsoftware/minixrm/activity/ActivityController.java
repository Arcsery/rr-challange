package hu.rrsoftware.minixrm.activity;

import hu.rrsoftware.minixrm.activity.dto.ActivityRequestDto;
import hu.rrsoftware.minixrm.activity.dto.ActivityResponseDto;
import hu.rrsoftware.minixrm.activity.dto.ActivityResponsibleReportDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping
    public ResponseEntity<ActivityResponseDto> create(@Valid @RequestBody ActivityRequestDto dto) {
        ActivityResponseDto response = activityService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ActivityResponseDto> update(@PathVariable Long id,
                                                      @Valid @RequestBody ActivityRequestDto dto) {
        ActivityResponseDto response = activityService.update(id, dto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        activityService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/responsible-report")
    public List<ActivityResponsibleReportDto> getResponsibleActivityReport() {
        return activityService.getResponsibleActivityReport();
    }
}
