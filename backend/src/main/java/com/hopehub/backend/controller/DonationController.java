package com.hopehub.backend.controller;

import com.hopehub.backend.dto.ApiResponse;
import com.hopehub.backend.dto.DonationRequest;
import com.hopehub.backend.dto.DonationResponseDto;
import com.hopehub.backend.service.DonationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/donations")
public class DonationController {

    private final DonationService donationService;

    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<DonationResponseDto>> makeDonation(
            @Valid @RequestBody DonationRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        String authEmail = userDetails != null ? userDetails.getUsername() : null;
        DonationResponseDto response = donationService.processDonation(request, authEmail);
        return ResponseEntity.ok(ApiResponse.success("Simulated donation processed successfully. " + DonationService.DEMO_DISCLAIMER, response));
    }

    @GetMapping("/receipt/{receiptNumber}")
    public ResponseEntity<ApiResponse<DonationResponseDto>> getReceipt(@PathVariable String receiptNumber) {
        DonationResponseDto response = donationService.getReceipt(receiptNumber);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/my-donations")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<DonationResponseDto>>> getMyDonations(@AuthenticationPrincipal UserDetails userDetails) {
        List<DonationResponseDto> donations = donationService.getMyDonations(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(donations));
    }

    @GetMapping("/campaign/{campaignId}")
    public ResponseEntity<ApiResponse<List<DonationResponseDto>>> getCampaignDonations(@PathVariable Long campaignId) {
        List<DonationResponseDto> donations = donationService.getCampaignDonations(campaignId);
        return ResponseEntity.ok(ApiResponse.success(donations));
    }
}
