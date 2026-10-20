package com.hopehub.backend.dto;

import com.hopehub.backend.model.ApplicationStatus;

import java.time.LocalDateTime;

public class VolunteerApplicationDto {

    private Long id;
    private Long opportunityId;
    private String opportunityTitle;
    private String ngoName;
    private Long volunteerId;
    private String volunteerName;
    private String volunteerEmail;
    private String volunteerPhone;
    private ApplicationStatus status;
    private String message;
    private int hoursContributed;
    private LocalDateTime createdAt;

    public VolunteerApplicationDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getOpportunityId() { return opportunityId; }
    public void setOpportunityId(Long opportunityId) { this.opportunityId = opportunityId; }

    public String getOpportunityTitle() { return opportunityTitle; }
    public void setOpportunityTitle(String opportunityTitle) { this.opportunityTitle = opportunityTitle; }

    public String getNgoName() { return ngoName; }
    public void setNgoName(String ngoName) { this.ngoName = ngoName; }

    public Long getVolunteerId() { return volunteerId; }
    public void setVolunteerId(Long volunteerId) { this.volunteerId = volunteerId; }

    public String getVolunteerName() { return volunteerName; }
    public void setVolunteerName(String volunteerName) { this.volunteerName = volunteerName; }

    public String getVolunteerEmail() { return volunteerEmail; }
    public void setVolunteerEmail(String volunteerEmail) { this.volunteerEmail = volunteerEmail; }

    public String getVolunteerPhone() { return volunteerPhone; }
    public void setVolunteerPhone(String volunteerPhone) { this.volunteerPhone = volunteerPhone; }

    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public int getHoursContributed() { return hoursContributed; }
    public void setHoursContributed(int hoursContributed) { this.hoursContributed = hoursContributed; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
