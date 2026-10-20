package com.hopehub.backend.dto;

import com.hopehub.backend.model.CampaignCategory;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import com.hopehub.backend.model.CampaignStatus;

import java.math.BigDecimal;
import java.time.LocalDate;

public class CampaignCreateDto {

    @NotBlank(message = "Title is required")
    @Size(min = 5, max = 250, message = "Title must be between 5 and 250 characters")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Category is required")
    private CampaignCategory category;

    @NotNull(message = "Goal amount is required")
    @DecimalMin(value = "100.00", message = "Goal amount must be at least ₹100")
    private BigDecimal goalAmount;

    private String imageUrl;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
    private CampaignStatus status;

    public CampaignCreateDto() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public CampaignCategory getCategory() { return category; }
    public void setCategory(CampaignCategory category) { this.category = category; }

    public BigDecimal getGoalAmount() { return goalAmount; }
    public void setGoalAmount(BigDecimal goalAmount) { this.goalAmount = goalAmount; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

public CampaignStatus getStatus() {
    return status;
}

public void setStatus(CampaignStatus status) {
    this.status = status;
}
}
