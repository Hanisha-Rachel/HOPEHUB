package com.hopehub.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ngo_profiles")
public class NgoProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false, length = 200)
    private String organizationName;

    @Column(nullable = false, length = 100)
    private String registrationNumber;

    @Column(nullable = false, length = 180)
    private String contactEmail;

    @Column(length = 30)
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(length = 255)
    private String website;

    @Column(columnDefinition = "TEXT")
    private String missionStatement;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private NgoVerificationStatus verificationStatus = NgoVerificationStatus.PENDING;

    @Column(length = 500)
    private String documentsUrl;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();

    public NgoProfile() {}

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

    public String getOrganizationName() { return organizationName; }
    public void setOrganizationName(String organizationName) { this.organizationName = organizationName; }

    public String getRegistrationNumber() { return registrationNumber; }
    public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getMissionStatement() { return missionStatement; }
    public void setMissionStatement(String missionStatement) { this.missionStatement = missionStatement; }

    public NgoVerificationStatus getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(NgoVerificationStatus verificationStatus) { this.verificationStatus = verificationStatus; }

    public String getDocumentsUrl() { return documentsUrl; }
    public void setDocumentsUrl(String documentsUrl) { this.documentsUrl = documentsUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
