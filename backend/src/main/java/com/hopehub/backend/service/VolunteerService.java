package com.hopehub.backend.service;

import com.hopehub.backend.dto.VolunteerApplicationDto;
import com.hopehub.backend.dto.VolunteerOpportunityDto;
import com.hopehub.backend.exception.BadRequestException;
import com.hopehub.backend.exception.ResourceNotFoundException;
import com.hopehub.backend.exception.UnauthorizedException;
import com.hopehub.backend.model.*;
import com.hopehub.backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VolunteerService {

    private final VolunteerOpportunityRepository opportunityRepository;
    private final VolunteerApplicationRepository applicationRepository;
    private final NgoProfileRepository ngoProfileRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final AuditLogService auditLogService;

    public VolunteerService(
            VolunteerOpportunityRepository opportunityRepository,
            VolunteerApplicationRepository applicationRepository,
            NgoProfileRepository ngoProfileRepository,
            UserRepository userRepository,
            NotificationService notificationService,
            AuditLogService auditLogService) {
        this.opportunityRepository = opportunityRepository;
        this.applicationRepository = applicationRepository;
        this.ngoProfileRepository = ngoProfileRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.auditLogService = auditLogService;
    }

    public List<VolunteerOpportunityDto> getAllOpenOpportunities() {
        return opportunityRepository.findByStatusOrderByStartDateAsc(OpportunityStatus.OPEN)
                .stream()
                .map(this::mapOpportunityToDto)
                .collect(Collectors.toList());
    }

    public VolunteerOpportunityDto getOpportunityById(Long id) {
        VolunteerOpportunity opp = opportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Volunteer opportunity not found with ID: " + id));
        return mapOpportunityToDto(opp);
    }

    @Transactional
    public VolunteerApplicationDto applyForOpportunity(Long opportunityId, String userEmail, String message) {
        User volunteer = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        VolunteerOpportunity opp = opportunityRepository.findById(opportunityId)
                .orElseThrow(() -> new ResourceNotFoundException("Opportunity not found with ID: " + opportunityId));

        if (opp.getStatus() != OpportunityStatus.OPEN) {
            throw new BadRequestException("This volunteer opportunity is currently closed for applications.");
        }

        // Check duplicate application
        if (applicationRepository.existsByOpportunityIdAndVolunteerId(opportunityId, volunteer.getId())) {
            throw new BadRequestException("You have already submitted an application for this volunteer initiative.");
        }

        VolunteerApplication app = new VolunteerApplication(opp, volunteer, message);
        VolunteerApplication saved = applicationRepository.save(app);

        // Update slots count
        opp.setFilledSlots(opp.getFilledSlots() + 1);
        if (opp.getFilledSlots() >= opp.getOpenSlots()) {
            opp.setStatus(OpportunityStatus.CLOSED);
        }
        opportunityRepository.save(opp);

        // Notify volunteer
        notificationService.createNotification(
                volunteer,
                "Volunteer Application Submitted",
                "Your application for '" + opp.getTitle() + "' has been received by " + opp.getNgo().getOrganizationName() + ".",
                NotificationType.INFO,
                "/volunteer-dashboard"
        );

        // Notify NGO
        if (opp.getNgo() != null && opp.getNgo().getUser() != null) {
            notificationService.createNotification(
                    opp.getNgo().getUser(),
                    "New Volunteer Application",
                    volunteer.getFullName() + " applied for '" + opp.getTitle() + "'.",
                    NotificationType.INFO,
                    "/ngo-dashboard"
            );
        }

        auditLogService.log(userEmail, "VOLUNTEER_APPLY", "VolunteerApplication", saved.getId(), "Applied for " + opp.getTitle(), null);

        return mapApplicationToDto(saved);
    }

    public List<VolunteerApplicationDto> getMyApplications(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return applicationRepository.findByVolunteerIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::mapApplicationToDto)
                .collect(Collectors.toList());
    }

    public List<VolunteerApplicationDto> getNgoApplications(String ngoUserEmail) {
        User user = userRepository.findByEmail(ngoUserEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        NgoProfile ngo = ngoProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new BadRequestException("User does not have an NGO profile"));

        List<VolunteerOpportunity> opps = opportunityRepository.findByNgoIdOrderByCreatedAtDesc(ngo.getId());
        List<Long> oppIds = opps.stream().map(VolunteerOpportunity::getId).collect(Collectors.toList());

        return oppIds.stream()
                .flatMap(id -> applicationRepository.findByOpportunityIdOrderByCreatedAtDesc(id).stream())
                .map(this::mapApplicationToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public VolunteerApplicationDto updateApplicationStatus(Long applicationId, ApplicationStatus newStatus, int hoursLogged, String userEmail, boolean isAdmin) {
        VolunteerApplication app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + applicationId));

        // Security check: Only the owning NGO or Admin can update application status
        if (!isAdmin) {
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            NgoProfile ngo = ngoProfileRepository.findByUserId(user.getId()).orElse(null);
            if (ngo == null || !app.getOpportunity().getNgo().getId().equals(ngo.getId())) {
                throw new UnauthorizedException("You are not authorized to update applications for this opportunity.");
            }
        }

        app.setStatus(newStatus);
        if (hoursLogged > 0) {
            app.setHoursContributed(hoursLogged);
        }

        VolunteerApplication saved = applicationRepository.save(app);

        notificationService.createNotification(
                saved.getVolunteer(),
                "Volunteer Application Status",
                "Your application for '" + saved.getOpportunity().getTitle() + "' has been updated to: " + newStatus,
                newStatus == ApplicationStatus.ACCEPTED ? NotificationType.SUCCESS : NotificationType.INFO,
                "/volunteer-dashboard"
        );

        auditLogService.log(userEmail, "UPDATE_VOLUNTEER_APP", "VolunteerApplication", saved.getId(), "Status: " + newStatus, null);

        return mapApplicationToDto(saved);
    }

    public int getTotalHoursForVolunteer(Long volunteerId) {
        return applicationRepository.calculateTotalHoursForVolunteer(volunteerId);
    }

    private VolunteerOpportunityDto mapOpportunityToDto(VolunteerOpportunity o) {
        VolunteerOpportunityDto dto = new VolunteerOpportunityDto();
        dto.setId(o.getId());
        dto.setNgoId(o.getNgo().getId());
        dto.setNgoName(o.getNgo().getOrganizationName());
        dto.setNgoVerified(o.getNgo().getVerificationStatus() == NgoVerificationStatus.VERIFIED);
        dto.setTitle(o.getTitle());
        dto.setDescription(o.getDescription());
        dto.setCategory(o.getCategory());
        dto.setLocation(o.getLocation());
        dto.setStartDate(o.getStartDate());
        dto.setEndDate(o.getEndDate());
        dto.setRequiredSkills(o.getRequiredSkills());
        dto.setOpenSlots(o.getOpenSlots());
        dto.setFilledSlots(o.getFilledSlots());
        dto.setStatus(o.getStatus());
        dto.setCreatedAt(o.getCreatedAt());
        return dto;
    }

    private VolunteerApplicationDto mapApplicationToDto(VolunteerApplication a) {
        VolunteerApplicationDto dto = new VolunteerApplicationDto();
        dto.setId(a.getId());
        dto.setOpportunityId(a.getOpportunity().getId());
        dto.setOpportunityTitle(a.getOpportunity().getTitle());
        dto.setNgoName(a.getOpportunity().getNgo().getOrganizationName());
        dto.setVolunteerId(a.getVolunteer().getId());
        dto.setVolunteerName(a.getVolunteer().getFullName());
        dto.setVolunteerEmail(a.getVolunteer().getEmail());
        dto.setVolunteerPhone(a.getVolunteer().getPhone());
        dto.setStatus(a.getStatus());
        dto.setMessage(a.getMessage());
        dto.setHoursContributed(a.getHoursContributed());
        dto.setCreatedAt(a.getCreatedAt());
        return dto;
    }
}
