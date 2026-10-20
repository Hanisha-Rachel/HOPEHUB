package com.hopehub.backend.dto;

import com.hopehub.backend.model.CampaignCategory;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public class BeneficiaryRequestCreateDto {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Contact phone is required")
    private String contactPhone;

    @NotBlank(message = "Contact email is required")
    private String contactEmail;

    @NotNull(message = "Category is required")
    private CampaignCategory category;

    @NotBlank(message = "Assistance needed description is required")
    @Size(min = 10, message = "Please describe the assistance needed in at least 10 characters")
    private String assistanceNeeded;

    @DecimalMin(value = "0.00", message = "Estimated cost must be non-negative")
    private BigDecimal estimatedCost;

    private String documentsNote;

    public BeneficiaryRequestCreateDto() {}

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public CampaignCategory getCategory() { return category; }
    public void setCategory(CampaignCategory category) { this.category = category; }

    public String getAssistanceNeeded() { return assistanceNeeded; }
    public void setAssistanceNeeded(String assistanceNeeded) { this.assistanceNeeded = assistanceNeeded; }

    public BigDecimal getEstimatedCost() { return estimatedCost; }
    public void setEstimatedCost(BigDecimal estimatedCost) { this.estimatedCost = estimatedCost; }

    public String getDocumentsNote() { return documentsNote; }
    public void setDocumentsNote(String documentsNote) { this.documentsNote = documentsNote; }
}
