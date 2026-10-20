package com.hopehub.backend.dto;

import com.hopehub.backend.model.CampaignCategory;
import com.hopehub.backend.model.CampaignStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class CampaignDto {

    private Long id;
    private String title;
    private String description;
    private CampaignCategory category;
    private BigDecimal goalAmount;
    private BigDecimal raisedAmount;
    private int donorCount;
    private CampaignStatus status;
    private String imageUrl;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean isFeatured;
    private Long ngoId;
    private String ngoName;
    private boolean ngoVerified;
    private String ngoLogo;
    private LocalDateTime createdAt;

    public CampaignDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public CampaignCategory getCategory() { return category; }
    public void setCategory(CampaignCategory category) { this.category = category; }

    public BigDecimal getGoalAmount() { return goalAmount; }
    public void setGoalAmount(BigDecimal goalAmount) { this.goalAmount = goalAmount; }

    public BigDecimal getRaisedAmount() { return raisedAmount; }
    public void setRaisedAmount(BigDecimal raisedAmount) { this.raisedAmount = raisedAmount; }

    public int getDonorCount() { return donorCount; }
    public void setDonorCount(int donorCount) { this.donorCount = donorCount; }

    public CampaignStatus getStatus() { return status; }
    public void setStatus(CampaignStatus status) { this.status = status; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public boolean isFeatured() { return isFeatured; }
    public void setFeatured(boolean featured) { isFeatured = featured; }

    public Long getNgoId() { return ngoId; }
    public void setNgoId(Long ngoId) { this.ngoId = ngoId; }

    public String getNgoName() { return ngoName; }
    public void setNgoName(String ngoName) { this.ngoName = ngoName; }

    public boolean isNgoVerified() { return ngoVerified; }
    public void setNgoVerified(boolean ngoVerified) { this.ngoVerified = ngoVerified; }

    public String getNgoLogo() { return ngoLogo; }
    public void setNgoLogo(String ngoLogo) { this.ngoLogo = ngoLogo; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
