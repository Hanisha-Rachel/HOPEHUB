package com.hopehub.backend.service;

import com.hopehub.backend.exception.ResourceNotFoundException;
import com.hopehub.backend.model.*;
import com.hopehub.backend.repository.CampaignRepository;
import com.hopehub.backend.repository.NgoProfileRepository;
import com.hopehub.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class NgoService {

    private final NgoProfileRepository ngoProfileRepository;
    private final CampaignRepository campaignRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final AuditLogService auditLogService;

    public NgoService(
            NgoProfileRepository ngoProfileRepository,
            CampaignRepository campaignRepository,
            UserRepository userRepository,
            NotificationService notificationService,
            AuditLogService auditLogService) {
        this.ngoProfileRepository = ngoProfileRepository;
        this.campaignRepository = campaignRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.auditLogService = auditLogService;
    }

    public List<Map<String, Object>> getVerifiedNgos() {
        return ngoProfileRepository.findByVerificationStatus(NgoVerificationStatus.VERIFIED)
                .stream()
                .map(this::mapNgoToSummary)
                .collect(Collectors.toList());
    }

    public Map<String, Object> getNgoById(Long id) {
        NgoProfile ngo = ngoProfileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("NGO not found with ID: " + id));
        return mapNgoToSummary(ngo);
    }

    public Map<String, Object> getMyNgoProfile(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        NgoProfile ngo = ngoProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("NGO profile not found for user"));
        return mapNgoToSummary(ngo);
    }

    public List<Map<String, Object>> getAllNgosForAdmin() {
        return ngoProfileRepository.findAll()
                .stream()
                .map(this::mapNgoToSummary)
                .collect(Collectors.toList());
    }

    @Transactional
    public Map<String, Object> updateVerificationStatus(Long ngoId, NgoVerificationStatus status, String adminEmail) {
        NgoProfile ngo = ngoProfileRepository.findById(ngoId)
                .orElseThrow(() -> new ResourceNotFoundException("NGO not found with ID: " + ngoId));

        ngo.setVerificationStatus(status);
        NgoProfile saved = ngoProfileRepository.save(ngo);

        if (saved.getUser() != null) {
            notificationService.createNotification(
                    saved.getUser(),
                    "NGO Verification Update",
                    "Your NGO verification status has been updated to: " + status,
                    status == NgoVerificationStatus.VERIFIED ? NotificationType.SUCCESS : NotificationType.WARNING,
                    "/ngo-dashboard"
            );
        }

        auditLogService.log(adminEmail, "MODERATE_NGO", "NgoProfile", saved.getId(), "Status changed to " + status, null);

        return mapNgoToSummary(saved);
    }

    private Map<String, Object> mapNgoToSummary(NgoProfile n) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", n.getId());
        map.put("organizationName", n.getOrganizationName());
        map.put("registrationNumber", n.getRegistrationNumber());
        map.put("contactEmail", n.getContactEmail());
        map.put("phone", n.getPhone());
        map.put("address", n.getAddress());
        map.put("website", n.getWebsite());
        map.put("missionStatement", n.getMissionStatement());
        map.put("verificationStatus", n.getVerificationStatus());
        map.put("verified", n.getVerificationStatus() == NgoVerificationStatus.VERIFIED);
        if (n.getUser() != null) {
            map.put("logo", n.getUser().getAvatarUrl());
        }
        long activeCampaigns = campaignRepository.findByNgoId(n.getId())
                .stream()
                .filter(c -> c.getStatus() == CampaignStatus.ACTIVE)
                .count();
        map.put("activeCampaignsCount", activeCampaigns);
        return map;
    }
}
