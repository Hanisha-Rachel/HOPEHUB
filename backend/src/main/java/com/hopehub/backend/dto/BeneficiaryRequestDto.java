package com.hopehub.backend.dto;

import com.hopehub.backend.model.CampaignCategory;
import com.hopehub.backend.model.RequestStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BeneficiaryRequestDto {

    private Long id;
    private Long userId;
    private String fullName;
    private String contactPhone;
    private String contactEmail;
    private CampaignCategory category;
    private String assistanceNeeded;
    private BigDecimal estimatedCost;
    private String documentsNote;
    private RequestStatus verificationStatus;
    private boolean isConfidential;
    private String adminNotes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public BeneficiaryRequestDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

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

    public RequestStatus getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(RequestStatus verificationStatus) { this.verificationStatus = verificationStatus; }

    public boolean isConfidential() { return isConfidential; }
    public void setConfidential(boolean confidential) { isConfidential = confidential; }

    public String getAdminNotes() { return adminNotes; }
    public void setAdminNotes(String adminNotes) { this.adminNotes = adminNotes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
