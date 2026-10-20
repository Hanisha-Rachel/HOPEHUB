package com.hopehub.backend.service;

import com.hopehub.backend.dto.ResourceContributionDto;
import com.hopehub.backend.exception.ResourceNotFoundException;
import com.hopehub.backend.model.NotificationType;
import com.hopehub.backend.model.ResourceContribution;
import com.hopehub.backend.model.ResourceStatus;
import com.hopehub.backend.model.User;
import com.hopehub.backend.repository.ResourceContributionRepository;
import com.hopehub.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResourceContributionService {

    private final ResourceContributionRepository resourceRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final AuditLogService auditLogService;

    public ResourceContributionService(
            ResourceContributionRepository resourceRepository,
            UserRepository userRepository,
            NotificationService notificationService,
            AuditLogService auditLogService) {
        this.resourceRepository = resourceRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.auditLogService = auditLogService;
    }

    @Transactional
    public ResourceContributionDto submitContribution(ResourceContributionDto dto, String optionalEmail) {
        User user = null;
        if (optionalEmail != null && !optionalEmail.isBlank()) {
            user = userRepository.findByEmail(optionalEmail).orElse(null);
        }

        ResourceContribution rc = new ResourceContribution();
        rc.setUser(user);
        rc.setDonorName(dto.getDonorName().trim());
        rc.setDonorEmail(dto.getDonorEmail().trim());
        rc.setDonorPhone(dto.getDonorPhone().trim());
        rc.setItemType(dto.getItemType());
        rc.setItemDescription(dto.getItemDescription().trim());
        rc.setQuantity(dto.getQuantity());
        rc.setUnit(dto.getUnit() != null ? dto.getUnit() : "units");
        rc.setPickupAddress(dto.getPickupAddress().trim());
        rc.setPreferredDate(dto.getPreferredDate());
        rc.setStatus(ResourceStatus.OFFERED);
        rc.setNotes(dto.getNotes());

        ResourceContribution saved = resourceRepository.save(rc);

        if (user != null) {
            notificationService.createNotification(
                    user,
                    "Resource Contribution Registered",
                    "Your pledge to donate " + dto.getQuantity() + " " + dto.getUnit() + " of " + dto.getItemType() + " has been scheduled.",
                    NotificationType.SUCCESS,
                    "/donor-dashboard"
            );
        }

        auditLogService.log(
                user != null ? user.getEmail() : dto.getDonorEmail(),
                "RESOURCE_PLEDGE",
                "ResourceContribution",
                saved.getId(),
                "Pledged " + dto.getQuantity() + " " + dto.getItemType(),
                null
        );

        return mapToDto(saved);
    }

    public List<ResourceContributionDto> getMyContributions(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return resourceRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<ResourceContributionDto> getAllForAdmin() {
        return resourceRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ResourceContributionDto updateStatus(Long id, ResourceStatus status, String adminEmail) {
        ResourceContribution rc = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource contribution not found with ID: " + id));

        rc.setStatus(status);
        ResourceContribution saved = resourceRepository.save(rc);

        if (saved.getUser() != null) {
            notificationService.createNotification(
                    saved.getUser(),
                    "Resource Contribution Status",
                    "Your in-kind donation of " + saved.getItemType() + " is now: " + status,
                    NotificationType.INFO,
                    "/donor-dashboard"
            );
        }

        auditLogService.log(adminEmail, "UPDATE_RESOURCE_STATUS", "ResourceContribution", saved.getId(), "Status: " + status, null);

        return mapToDto(saved);
    }

    private ResourceContributionDto mapToDto(ResourceContribution rc) {
        ResourceContributionDto dto = new ResourceContributionDto();
        dto.setId(rc.getId());
        dto.setUserId(rc.getUser() != null ? rc.getUser().getId() : null);
        dto.setDonorName(rc.getDonorName());
        dto.setDonorEmail(rc.getDonorEmail());
        dto.setDonorPhone(rc.getDonorPhone());
        dto.setItemType(rc.getItemType());
        dto.setItemDescription(rc.getItemDescription());
        dto.setQuantity(rc.getQuantity());
        dto.setUnit(rc.getUnit());
        dto.setPickupAddress(rc.getPickupAddress());
        dto.setPreferredDate(rc.getPreferredDate());
        dto.setStatus(rc.getStatus());
        dto.setNotes(rc.getNotes());
        dto.setCreatedAt(rc.getCreatedAt());
        return dto;
    }
}
