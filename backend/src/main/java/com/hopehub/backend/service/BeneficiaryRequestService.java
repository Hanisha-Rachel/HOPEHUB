package com.hopehub.backend.service;

import com.hopehub.backend.dto.BeneficiaryRequestCreateDto;
import com.hopehub.backend.dto.BeneficiaryRequestDto;
import com.hopehub.backend.exception.BadRequestException;
import com.hopehub.backend.exception.ResourceNotFoundException;
import com.hopehub.backend.exception.UnauthorizedException;
import com.hopehub.backend.model.*;
import com.hopehub.backend.repository.BeneficiaryRequestRepository;
import com.hopehub.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BeneficiaryRequestService {

    private final BeneficiaryRequestRepository beneficiaryRequestRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final AuditLogService auditLogService;

    public BeneficiaryRequestService(
            BeneficiaryRequestRepository beneficiaryRequestRepository,
            UserRepository userRepository,
            NotificationService notificationService,
            AuditLogService auditLogService) {
        this.beneficiaryRequestRepository = beneficiaryRequestRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.auditLogService = auditLogService;
    }

    @Transactional
    public BeneficiaryRequestDto submitRequest(String userEmail, BeneficiaryRequestCreateDto dto) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        BeneficiaryRequest request = new BeneficiaryRequest();
        request.setUser(user);
        request.setFullName(dto.getFullName().trim());
        request.setContactPhone(dto.getContactPhone().trim());
        request.setContactEmail(dto.getContactEmail().trim());
        request.setCategory(dto.getCategory());
        request.setAssistanceNeeded(dto.getAssistanceNeeded().trim());
        request.setEstimatedCost(dto.getEstimatedCost());
        request.setDocumentsNote(dto.getDocumentsNote());
        request.setVerificationStatus(RequestStatus.PENDING);
        request.setConfidential(true);

        BeneficiaryRequest saved = beneficiaryRequestRepository.save(request);

        notificationService.createNotification(
                user,
                "Assistance Request Submitted",
                "Your request for " + dto.getCategory() + " assistance has been submitted for confidential verification.",
                NotificationType.INFO,
                "/beneficiary-dashboard"
        );

        auditLogService.log(userEmail, "SUBMIT_ASSISTANCE_REQUEST", "BeneficiaryRequest", saved.getId(), "Confidential request submitted", null);

        return mapToDto(saved);
    }

    public List<BeneficiaryRequestDto> getMyRequests(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return beneficiaryRequestRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public BeneficiaryRequestDto getRequestById(Long requestId, String userEmail, boolean isAdmin) {
        BeneficiaryRequest request = beneficiaryRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found with ID: " + requestId));

        // Privacy check: only the owner or an administrator can access this record
        if (!isAdmin && !request.getUser().getEmail().equalsIgnoreCase(userEmail)) {
            throw new UnauthorizedException("You are not authorized to view this confidential assistance request.");
        }

        return mapToDto(request);
    }

    public List<BeneficiaryRequestDto> getAllRequestsForAdmin() {
        return beneficiaryRequestRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public BeneficiaryRequestDto updateRequestStatus(Long requestId, RequestStatus newStatus, String adminNotes, String adminEmail) {
        BeneficiaryRequest request = beneficiaryRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found with ID: " + requestId));

        request.setVerificationStatus(newStatus);
        if (adminNotes != null && !adminNotes.isBlank()) {
            request.setAdminNotes(adminNotes.trim());
        }

        BeneficiaryRequest saved = beneficiaryRequestRepository.save(request);

        notificationService.createNotification(
                saved.getUser(),
                "Assistance Request Update",
                "Your assistance request status has been updated to: " + newStatus,
                newStatus == RequestStatus.APPROVED ? NotificationType.SUCCESS : NotificationType.INFO,
                "/beneficiary-dashboard"
        );

        auditLogService.log(adminEmail, "UPDATE_REQUEST_STATUS", "BeneficiaryRequest", saved.getId(), "Status changed to " + newStatus, null);

        return mapToDto(saved);
    }

    private BeneficiaryRequestDto mapToDto(BeneficiaryRequest r) {
        BeneficiaryRequestDto dto = new BeneficiaryRequestDto();
        dto.setId(r.getId());
        dto.setUserId(r.getUser().getId());
        dto.setFullName(r.getFullName());
        dto.setContactPhone(r.getContactPhone());
        dto.setContactEmail(r.getContactEmail());
        dto.setCategory(r.getCategory());
        dto.setAssistanceNeeded(r.getAssistanceNeeded());
        dto.setEstimatedCost(r.getEstimatedCost());
        dto.setDocumentsNote(r.getDocumentsNote());
        dto.setVerificationStatus(r.getVerificationStatus());
        dto.setConfidential(r.isConfidential());
        dto.setAdminNotes(r.getAdminNotes());
        dto.setCreatedAt(r.getCreatedAt());
        dto.setUpdatedAt(r.getUpdatedAt());
        return dto;
    }
}
