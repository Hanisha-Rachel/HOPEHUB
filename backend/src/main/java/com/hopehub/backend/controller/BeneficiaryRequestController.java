package com.hopehub.backend.controller;

import com.hopehub.backend.dto.ApiResponse;
import com.hopehub.backend.dto.BeneficiaryRequestCreateDto;
import com.hopehub.backend.dto.BeneficiaryRequestDto;
import com.hopehub.backend.service.BeneficiaryRequestService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/beneficiaries")
public class BeneficiaryRequestController {

    private final BeneficiaryRequestService beneficiaryRequestService;

    public BeneficiaryRequestController(BeneficiaryRequestService beneficiaryRequestService) {
        this.beneficiaryRequestService = beneficiaryRequestService;
    }

    @PostMapping("/requests")
    @PreAuthorize("hasRole('BENEFICIARY')")
    public ResponseEntity<ApiResponse<BeneficiaryRequestDto>> submitRequest(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody BeneficiaryRequestCreateDto dto) {
        BeneficiaryRequestDto created = beneficiaryRequestService.submitRequest(userDetails.getUsername(), dto);
        return ResponseEntity.ok(ApiResponse.success("Assistance request submitted confidentially.", created));
    }

    @GetMapping("/my-requests")
    @PreAuthorize("hasRole('BENEFICIARY')")
    public ResponseEntity<ApiResponse<List<BeneficiaryRequestDto>>> getMyRequests(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<BeneficiaryRequestDto> requests = beneficiaryRequestService.getMyRequests(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(requests));
    }

    @GetMapping("/requests/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<BeneficiaryRequestDto>> getRequestById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        boolean isAdmin = userDetails.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        BeneficiaryRequestDto request = beneficiaryRequestService.getRequestById(id, userDetails.getUsername(), isAdmin);
        return ResponseEntity.ok(ApiResponse.success(request));
    }
}
