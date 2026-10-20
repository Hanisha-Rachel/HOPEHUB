package com.hopehub.backend.controller;

import com.hopehub.backend.dto.*;
import com.hopehub.backend.model.*;
import com.hopehub.backend.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;
    private final CampaignService campaignService;
    private final NgoService ngoService;
    private final BeneficiaryRequestService beneficiaryRequestService;
    private final AuditLogService auditLogService;

    public AdminController(
            AdminService adminService,
            CampaignService campaignService,
            NgoService ngoService,
            BeneficiaryRequestService beneficiaryRequestService,
            AuditLogService auditLogService) {
        this.adminService = adminService;
        this.campaignService = campaignService;
        this.ngoService = ngoService;
        this.beneficiaryRequestService = beneficiaryRequestService;
        this.auditLogService = auditLogService;
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<AdminStatsDto>> getDashboardStats() {
        AdminStatsDto stats = adminService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserProfileDto>>> getAllUsers() {
        List<UserProfileDto> users = adminService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.success(users));
    }

    @PutMapping("/users/{id}/status")
    public ResponseEntity<ApiResponse<UserProfileDto>> toggleUserStatus(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        boolean active = body.getOrDefault("active", true);
        UserProfileDto updated = adminService.toggleUserActiveStatus(id, active, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("User account status updated.", updated));
    }

    @GetMapping("/campaigns")
    public ResponseEntity<ApiResponse<List<CampaignDto>>> getAllCampaigns() {
        List<CampaignDto> list = campaignService.getAllCampaignsForAdmin();
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @PutMapping("/campaigns/{id}/status")
    public ResponseEntity<ApiResponse<CampaignDto>> updateCampaignStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        CampaignStatus status = CampaignStatus.valueOf(body.get("status"));
        CampaignDto updated = campaignService.updateCampaignStatus(id, status, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Campaign moderation status updated.", updated));
    }

    @GetMapping("/ngos")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAllNgos() {
        List<Map<String, Object>> list = ngoService.getAllNgosForAdmin();
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @PutMapping("/ngos/{id}/verify")
    public ResponseEntity<ApiResponse<Map<String, Object>>> verifyNgo(
            @PathVariable Long id,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        NgoVerificationStatus status = NgoVerificationStatus.valueOf(body.get("status"));
        Map<String, Object> updated = ngoService.updateVerificationStatus(id, status, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("NGO verification status updated.", updated));
    }

    @GetMapping("/requests")
    public ResponseEntity<ApiResponse<List<BeneficiaryRequestDto>>> getAllRequests() {
        List<BeneficiaryRequestDto> list = beneficiaryRequestService.getAllRequestsForAdmin();
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @PutMapping("/requests/{id}/status")
    public ResponseEntity<ApiResponse<BeneficiaryRequestDto>> updateRequestStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        RequestStatus status = RequestStatus.valueOf(body.get("status"));
        String notes = body.get("adminNotes");
        BeneficiaryRequestDto updated = beneficiaryRequestService.updateRequestStatus(id, status, notes, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Beneficiary assistance request status updated.", updated));
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<ApiResponse<List<AuditLog>>> getAuditLogs() {
        List<AuditLog> logs = auditLogService.getRecentLogs();
        return ResponseEntity.ok(ApiResponse.success(logs));
    }
}
