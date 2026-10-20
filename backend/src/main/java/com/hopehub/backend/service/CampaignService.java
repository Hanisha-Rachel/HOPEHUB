package com.hopehub.backend.service;
import org.springframework.transaction.annotation.Transactional;
import com.hopehub.backend.dto.CampaignCreateDto;
import com.hopehub.backend.dto.CampaignDto;
import com.hopehub.backend.exception.BadRequestException;
import com.hopehub.backend.exception.ResourceNotFoundException;
import com.hopehub.backend.exception.UnauthorizedException;
import com.hopehub.backend.model.*;
import com.hopehub.backend.repository.CampaignRepository;
import com.hopehub.backend.repository.NgoProfileRepository;
import com.hopehub.backend.repository.UserRepository;
import org.springframework.stereotype.Service;


import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final NgoProfileRepository ngoProfileRepository;
    private final UserRepository userRepository;
    private final AuditLogService auditLogService;
    private final NotificationService notificationService;

    public CampaignService(
            CampaignRepository campaignRepository,
            NgoProfileRepository ngoProfileRepository,
            UserRepository userRepository,
            AuditLogService auditLogService,
            NotificationService notificationService) {
        this.campaignRepository = campaignRepository;
        this.ngoProfileRepository = ngoProfileRepository;
        this.userRepository = userRepository;
        this.auditLogService = auditLogService;
        this.notificationService = notificationService;
    }

    @Transactional(readOnly = true)
public List<CampaignDto> getAllActiveCampaigns() {
    return campaignRepository.findByStatus(CampaignStatus.ACTIVE)
            .stream()
            .map(this::mapToDto)
            .collect(Collectors.toList());
}

    public List<CampaignDto> getFeaturedCampaigns() {
        return campaignRepository.findByStatusAndIsFeaturedTrue(CampaignStatus.ACTIVE)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<CampaignDto> getCampaignsByCategory(CampaignCategory category) {
        return campaignRepository.findByStatusAndCategory(CampaignStatus.ACTIVE, category)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<CampaignDto> searchCampaigns(String query) {
        if (query == null || query.isBlank()) {
            return getAllActiveCampaigns();
        }
        return campaignRepository.searchActiveCampaigns(CampaignStatus.ACTIVE, query.trim())
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public CampaignDto getCampaignById(Long id) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign not found with ID: " + id));
        return mapToDto(campaign);
    }

    @Transactional(readOnly = true)
public List<CampaignDto> getNgoCampaigns(String userEmail) {
    User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    NgoProfile ngo = ngoProfileRepository.findByUserId(user.getId())
            .orElseThrow(() -> new ResourceNotFoundException("NGO profile not found for user"));

    return campaignRepository.findByNgoId(ngo.getId())
            .stream()
            .map(this::mapToDto)
            .collect(Collectors.toList());
}

    @Transactional
    public CampaignDto createCampaign(String userEmail, CampaignCreateDto dto) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        NgoProfile ngo = ngoProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new BadRequestException("Only registered NGOs can create campaigns"));

        if (ngo.getVerificationStatus() != NgoVerificationStatus.VERIFIED) {
            throw new UnauthorizedException("Your NGO profile is pending verification. Only verified NGOs can publish campaigns.");
        }

        Campaign campaign = new Campaign();
        campaign.setNgo(ngo);
        campaign.setTitle(dto.getTitle().trim());
        campaign.setDescription(dto.getDescription().trim());
        campaign.setCategory(dto.getCategory());
        campaign.setGoalAmount(dto.getGoalAmount());
        campaign.setRaisedAmount(BigDecimal.ZERO);
        campaign.setDonorCount(0);
        // Submitted campaigns are active or pending approval
        campaign.setStatus(CampaignStatus.PENDING_APPROVAL);
        campaign.setImageUrl(dto.getImageUrl());
        campaign.setLocation(dto.getLocation());
        campaign.setStartDate(dto.getStartDate());
        campaign.setEndDate(dto.getEndDate());
        campaign.setFeatured(false);

        Campaign saved = campaignRepository.save(campaign);

        auditLogService.log(userEmail, "CREATE_CAMPAIGN", "Campaign", saved.getId(), "Created campaign: " + saved.getTitle(), null);
        notificationService.createNotification(user, "Campaign Published", "Your campaign '" + saved.getTitle() + "' is now live.", NotificationType.SUCCESS, "/campaigns/" + saved.getId());

        return mapToDto(saved);
    }

    @Transactional
    public CampaignDto updateCampaignStatus(Long campaignId, CampaignStatus newStatus, String adminEmail) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign not found with ID: " + campaignId));

        campaign.setStatus(newStatus);
        Campaign saved = campaignRepository.save(campaign);

        auditLogService.log(adminEmail, "MODERATE_CAMPAIGN", "Campaign", saved.getId(), "Status updated to " + newStatus, null);

        if (saved.getNgo() != null && saved.getNgo().getUser() != null) {
            notificationService.createNotification(
                    saved.getNgo().getUser(),
                    "Campaign Status Updated",
                    "Your campaign '" + saved.getTitle() + "' status changed to " + newStatus,
                    NotificationType.INFO,
                    "/campaigns/" + saved.getId()
            );
        }

        return mapToDto(saved);
    }

    public List<CampaignDto> getAllCampaignsForAdmin() {
        return campaignRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public CampaignDto mapToDto(Campaign c) {
        CampaignDto dto = new CampaignDto();
        dto.setId(c.getId());
        dto.setTitle(c.getTitle());
        dto.setDescription(c.getDescription());
        dto.setCategory(c.getCategory());
        dto.setGoalAmount(c.getGoalAmount());
        dto.setRaisedAmount(c.getRaisedAmount());
        dto.setDonorCount(c.getDonorCount());
        dto.setStatus(c.getStatus());
        dto.setImageUrl(c.getImageUrl());
        dto.setLocation(c.getLocation());
        dto.setStartDate(c.getStartDate());
        dto.setEndDate(c.getEndDate());
        dto.setFeatured(c.isFeatured());
        dto.setCreatedAt(c.getCreatedAt());

        if (c.getNgo() != null) {
            dto.setNgoId(c.getNgo().getId());
            dto.setNgoName(c.getNgo().getOrganizationName());
            dto.setNgoVerified(c.getNgo().getVerificationStatus() == NgoVerificationStatus.VERIFIED);
            if (c.getNgo().getUser() != null) {
                dto.setNgoLogo(c.getNgo().getUser().getAvatarUrl());
            }
        }
        return dto;
    }
}
