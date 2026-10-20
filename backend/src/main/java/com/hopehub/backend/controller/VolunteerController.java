package com.hopehub.backend.controller;

import com.hopehub.backend.dto.ApiResponse;
import com.hopehub.backend.dto.VolunteerApplicationDto;
import com.hopehub.backend.dto.VolunteerOpportunityDto;
import com.hopehub.backend.model.ApplicationStatus;
import com.hopehub.backend.service.VolunteerService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/volunteers")
public class VolunteerController {

    private final VolunteerService volunteerService;

    public VolunteerController(VolunteerService volunteerService) {
        this.volunteerService = volunteerService;
    }

    @GetMapping("/opportunities")
    public ResponseEntity<ApiResponse<List<VolunteerOpportunityDto>>> getAllOpportunities() {
        List<VolunteerOpportunityDto> list = volunteerService.getAllOpenOpportunities();
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @GetMapping("/opportunities/{id}")
    public ResponseEntity<ApiResponse<VolunteerOpportunityDto>> getOpportunityById(@PathVariable Long id) {
        VolunteerOpportunityDto dto = volunteerService.getOpportunityById(id);
        return ResponseEntity.ok(ApiResponse.success(dto));
    }

    @PostMapping("/apply/{opportunityId}")
    @PreAuthorize("hasRole('VOLUNTEER')")
    public ResponseEntity<ApiResponse<VolunteerApplicationDto>> apply(
            @PathVariable Long opportunityId,
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody(required = false) Map<String, String> body) {
        String message = body != null ? body.get("message") : "";
        VolunteerApplicationDto app = volunteerService.applyForOpportunity(opportunityId, userDetails.getUsername(), message);
        return ResponseEntity.ok(ApiResponse.success("Volunteer application submitted successfully.", app));
    }

    @GetMapping("/my-applications")
    @PreAuthorize("hasRole('VOLUNTEER')")
    public ResponseEntity<ApiResponse<List<VolunteerApplicationDto>>> getMyApplications(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<VolunteerApplicationDto> list = volunteerService.getMyApplications(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @GetMapping("/ngo-applications")
    @PreAuthorize("hasRole('NGO')")
    public ResponseEntity<ApiResponse<List<VolunteerApplicationDto>>> getNgoApplications(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<VolunteerApplicationDto> list = volunteerService.getNgoApplications(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @PutMapping("/applications/{id}/status")
    @PreAuthorize("hasAnyRole('NGO', 'ADMIN')")
    public ResponseEntity<ApiResponse<VolunteerApplicationDto>> updateApplicationStatus(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        ApplicationStatus status = ApplicationStatus.valueOf((String) body.get("status"));
        int hours = body.containsKey("hoursLogged") ? ((Number) body.get("hoursLogged")).intValue() : 0;
        boolean isAdmin = userDetails.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        VolunteerApplicationDto app = volunteerService.updateApplicationStatus(id, status, hours, userDetails.getUsername(), isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Application status updated.", app));
    }
}
