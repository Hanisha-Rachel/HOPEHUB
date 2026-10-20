package com.hopehub.backend.controller;

import com.hopehub.backend.dto.ApiResponse;
import com.hopehub.backend.repository.CampaignRepository;
import com.hopehub.backend.repository.NgoProfileRepository;
import com.hopehub.backend.repository.UserRepository;
import com.hopehub.backend.repository.VolunteerApplicationRepository;
import com.hopehub.backend.model.CampaignStatus;
import com.hopehub.backend.model.NgoVerificationStatus;
import com.hopehub.backend.model.Role;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {

    private final UserRepository userRepository;
    private final CampaignRepository campaignRepository;
    private final NgoProfileRepository ngoProfileRepository;
    private final VolunteerApplicationRepository volunteerApplicationRepository;

    public HealthController(
            UserRepository userRepository,
            CampaignRepository campaignRepository,
            NgoProfileRepository ngoProfileRepository,
            VolunteerApplicationRepository volunteerApplicationRepository) {
        this.userRepository = userRepository;
        this.campaignRepository = campaignRepository;
        this.ngoProfileRepository = ngoProfileRepository;
        this.volunteerApplicationRepository = volunteerApplicationRepository;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("application", "HOPEHUB Intelligent Charity Management System");
        health.put("timestamp", LocalDateTime.now());
        health.put("javaVersion", System.getProperty("java.version"));
        health.put("demoMode", true);
        return ResponseEntity.ok(health);
    }

    @GetMapping("/stats/overview")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPublicPlatformStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("activeCampaigns", campaignRepository.countByStatus(CampaignStatus.ACTIVE));
        stats.put("verifiedNGOs", ngoProfileRepository.countByVerificationStatus(NgoVerificationStatus.VERIFIED));
        stats.put("activeVolunteers", userRepository.countByRole(Role.VOLUNTEER));

        BigDecimal funds = campaignRepository.calculateTotalFundsRaised();
        stats.put("fundsMobilized", funds != null ? "₹ " + funds.toPlainString() : "₹ 0.00");
        stats.put("isDemonstration", true);

        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}
