package com.hopehub.backend.dto;

import com.hopehub.backend.model.OpportunityStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class VolunteerOpportunityDto {

    private Long id;
    private Long ngoId;
    private String ngoName;
    private boolean ngoVerified;
    private String title;
    private String description;
    private String category;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
    private String requiredSkills;
    private int openSlots;
    private int filledSlots;
    private OpportunityStatus status;
    private LocalDateTime createdAt;

    public VolunteerOpportunityDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getNgoId() { return ngoId; }
    public void setNgoId(Long ngoId) { this.ngoId = ngoId; }

    public String getNgoName() { return ngoName; }
    public void setNgoName(String ngoName) { this.ngoName = ngoName; }

    public boolean isNgoVerified() { return ngoVerified; }
    public void setNgoVerified(boolean ngoVerified) { this.ngoVerified = ngoVerified; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public String getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(String requiredSkills) { this.requiredSkills = requiredSkills; }

    public int getOpenSlots() { return openSlots; }
    public void setOpenSlots(int openSlots) { this.openSlots = openSlots; }

    public int getFilledSlots() { return filledSlots; }
    public void setFilledSlots(int filledSlots) { this.filledSlots = filledSlots; }

    public OpportunityStatus getStatus() { return status; }
    public void setStatus(OpportunityStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
