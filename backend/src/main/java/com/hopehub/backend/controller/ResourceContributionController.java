package com.hopehub.backend.controller;

import com.hopehub.backend.dto.ApiResponse;
import com.hopehub.backend.dto.ResourceContributionDto;
import com.hopehub.backend.service.ResourceContributionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/resources")
public class ResourceContributionController {

    private final ResourceContributionService resourceService;

    public ResourceContributionController(ResourceContributionService resourceService) {
        this.resourceService = resourceService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ResourceContributionDto>> submitContribution(
            @Valid @RequestBody ResourceContributionDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        String userEmail = userDetails != null ? userDetails.getUsername() : null;
        ResourceContributionDto created = resourceService.submitContribution(dto, userEmail);
        return ResponseEntity.ok(ApiResponse.success("Resource donation scheduled successfully.", created));
    }

    @GetMapping("/my-resources")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<ResourceContributionDto>>> getMyContributions(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<ResourceContributionDto> list = resourceService.getMyContributions(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(list));
    }
}
