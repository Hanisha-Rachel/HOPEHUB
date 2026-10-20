package com.hopehub.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "beneficiary_requests")
public class BeneficiaryRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 150)
    private String fullName;

    @Column(nullable = false, length = 30)
    private String contactPhone;

    @Column(nullable = false, length = 180)
    private String contactEmail;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private CampaignCategory category;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String assistanceNeeded;

    @Column(precision = 12, scale = 2)
    private BigDecimal estimatedCost;

    @Column(columnDefinition = "TEXT")
    private String documentsNote;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private RequestStatus verificationStatus = RequestStatus.PENDING;

    @Column(nullable = false)
    private boolean isConfidential = true;

    @Column(columnDefinition = "TEXT")
    private String adminNotes;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();

    public BeneficiaryRequest() {}

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

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
