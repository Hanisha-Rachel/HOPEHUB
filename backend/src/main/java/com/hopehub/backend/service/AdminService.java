package com.hopehub.backend.service;

import com.hopehub.backend.dto.AdminStatsDto;
import com.hopehub.backend.dto.UserProfileDto;
import com.hopehub.backend.exception.ResourceNotFoundException;
import com.hopehub.backend.model.*;
import com.hopehub.backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final NgoProfileRepository ngoProfileRepository;
    private final CampaignRepository campaignRepository;
    private final VolunteerOpportunityRepository opportunityRepository;
    private final VolunteerApplicationRepository applicationRepository;
    private final BeneficiaryRequestRepository beneficiaryRequestRepository;
    private final AuditLogService auditLogService;
    private final NotificationService notificationService;

    public AdminService(
            UserRepository userRepository,
            NgoProfileRepository ngoProfileRepository,
            CampaignRepository campaignRepository,
            VolunteerOpportunityRepository opportunityRepository,
            VolunteerApplicationRepository applicationRepository,
            BeneficiaryRequestRepository beneficiaryRequestRepository,
            AuditLogService auditLogService,
            NotificationService notificationService) {
        this.userRepository = userRepository;
        this.ngoProfileRepository = ngoProfileRepository;
        this.campaignRepository = campaignRepository;
        this.opportunityRepository = opportunityRepository;
        this.applicationRepository = applicationRepository;
        this.beneficiaryRequestRepository = beneficiaryRequestRepository;
        this.auditLogService = auditLogService;
        this.notificationService = notificationService;
    }

    public AdminStatsDto getDashboardStats() {
        AdminStatsDto stats = new AdminStatsDto();
        stats.setTotalUsers(userRepository.count());
        stats.setTotalDonors(userRepository.countByRole(Role.DONOR));
        stats.setTotalBeneficiaries(userRepository.countByRole(Role.BENEFICIARY));
        stats.setTotalVolunteers(userRepository.countByRole(Role.VOLUNTEER));
        stats.setTotalNgos(userRepository.countByRole(Role.NGO));
        stats.setVerifiedNgos(ngoProfileRepository.countByVerificationStatus(NgoVerificationStatus.VERIFIED));
        stats.setPendingNgos(ngoProfileRepository.countByVerificationStatus(NgoVerificationStatus.PENDING));

        stats.setTotalCampaigns(campaignRepository.count());
        stats.setActiveCampaigns(campaignRepository.countByStatus(CampaignStatus.ACTIVE));
        stats.setPendingCampaigns(campaignRepository.countByStatus(CampaignStatus.PENDING_APPROVAL));

        BigDecimal funds = campaignRepository.calculateTotalFundsRaised();
        stats.setTotalFundsRaised(funds != null ? funds : BigDecimal.ZERO);

        stats.setPendingBeneficiaryRequests(beneficiaryRequestRepository.countByVerificationStatus(RequestStatus.PENDING));
        stats.setDemonstration(true);

        Map<String, Object> extra = new HashMap<>();
        extra.put("openVolunteerDrives", opportunityRepository.countByStatus(OpportunityStatus.OPEN));
        stats.setAdditionalMetrics(extra);

        return stats;
    }

    public List<UserProfileDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapUserToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserProfileDto toggleUserActiveStatus(Long userId, boolean isActive, String adminEmail) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        user.setActive(isActive);
        User saved = userRepository.save(user);

        auditLogService.log(adminEmail, "TOGGLE_USER_STATUS", "User", saved.getId(), "Set active=" + isActive, null);

        notificationService.createNotification(
                saved,
                "Account Status Notice",
                isActive ? "Your HOPEHUB account has been reactivated." : "Your HOPEHUB account has been suspended by administration.",
                isActive ? NotificationType.SUCCESS : NotificationType.ALERT,
                "/contact"
        );

        return mapUserToDto(saved);
    }

    private UserProfileDto mapUserToDto(User u) {
        UserProfileDto dto = new UserProfileDto();
        dto.setId(u.getId());
        dto.setFullName(u.getFullName());
        dto.setEmail(u.getEmail());
        dto.setRole(u.getRole());
        dto.setPhone(u.getPhone());
        dto.setAvatarUrl(u.getAvatarUrl());
        dto.setBio(u.getBio());
        dto.setAddress(u.getAddress());
        dto.setCreatedAt(u.getCreatedAt());
        return dto;
    }
}
