package com.hopehub.backend.controller;

import com.hopehub.backend.dto.ApiResponse;
import com.hopehub.backend.dto.CampaignCreateDto;
import com.hopehub.backend.dto.CampaignDto;
import com.hopehub.backend.model.CampaignCategory;
import com.hopehub.backend.service.CampaignService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/campaigns")
public class CampaignController {

    private final CampaignService campaignService;

    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    // Get all active campaigns for Explore Campaigns
    @GetMapping
    public ResponseEntity<ApiResponse<List<CampaignDto>>> getAllCampaigns() {

        List<CampaignDto> campaigns =
                campaignService.getAllActiveCampaigns();

        return ResponseEntity.ok(
                ApiResponse.success(campaigns)
        );
    }

    // Get featured campaigns
    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<CampaignDto>>> getFeaturedCampaigns() {

        List<CampaignDto> campaigns =
                campaignService.getFeaturedCampaigns();

        return ResponseEntity.ok(
                ApiResponse.success(campaigns)
        );
    }

    // Get a campaign by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CampaignDto>> getCampaignById(
            @PathVariable Long id) {

        CampaignDto campaign =
                campaignService.getCampaignById(id);

        return ResponseEntity.ok(
                ApiResponse.success(campaign)
        );
    }

    // Get campaigns by category
    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<List<CampaignDto>>> getCampaignsByCategory(
            @PathVariable CampaignCategory category) {

        List<CampaignDto> campaigns =
                campaignService.getCampaignsByCategory(category);

        return ResponseEntity.ok(
                ApiResponse.success(campaigns)
        );
    }

    // Search active campaigns
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<CampaignDto>>> searchCampaigns(
            @RequestParam(required = false) String q) {

        List<CampaignDto> campaigns =
                campaignService.searchCampaigns(q);

        return ResponseEntity.ok(
                ApiResponse.success(campaigns)
        );
    }

    // Create a campaign (NGO only)
    @PostMapping
    @PreAuthorize("hasRole('NGO')")
    public ResponseEntity<ApiResponse<CampaignDto>> createCampaign(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CampaignCreateDto dto) {

        CampaignDto created =
                campaignService.createCampaign(
                        userDetails.getUsername(),
                        dto
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Campaign created successfully",
                        created
                )
        );
    }

    // Get campaigns belonging to the logged-in NGO
    @GetMapping("/my-campaigns")
    @PreAuthorize("hasRole('NGO')")
    public ResponseEntity<ApiResponse<List<CampaignDto>>> getMyCampaigns(
            @AuthenticationPrincipal UserDetails userDetails) {

        List<CampaignDto> campaigns =
                campaignService.getNgoCampaigns(
                        userDetails.getUsername()
                );

        return ResponseEntity.ok(
                ApiResponse.success(campaigns)
        );
    }

    // Get ALL campaigns for the Admin Dashboard,
    // including PENDING_APPROVAL, ACTIVE, and other statuses
    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<CampaignDto>>> getAllCampaignsForAdmin() {

        List<CampaignDto> campaigns =
                campaignService.getAllCampaignsForAdmin();

        return ResponseEntity.ok(
                ApiResponse.success(campaigns)
        );
    }
}