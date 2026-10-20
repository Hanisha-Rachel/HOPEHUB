package com.hopehub.backend.dto;

import com.hopehub.backend.model.DonationStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class DonationResponseDto {

    private Long id;
    private Long campaignId;
    private String campaignTitle;
    private String donorName;
    private String donorEmail;
    private BigDecimal amount;
    private String paymentMethod;
    private String transactionReference;
    private String receiptNumber;
    private DonationStatus status;
    private boolean isSimulated = true;
    private String demoDisclaimer = "DEMO MODE — No real money has been transferred.";
    private String notes;
    private LocalDateTime createdAt;

    public DonationResponseDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCampaignId() { return campaignId; }
    public void setCampaignId(Long campaignId) { this.campaignId = campaignId; }

    public String getCampaignTitle() { return campaignTitle; }
    public void setCampaignTitle(String campaignTitle) { this.campaignTitle = campaignTitle; }

    public String getDonorName() { return donorName; }
    public void setDonorName(String donorName) { this.donorName = donorName; }

    public String getDonorEmail() { return donorEmail; }
    public void setDonorEmail(String donorEmail) { this.donorEmail = donorEmail; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getTransactionReference() { return transactionReference; }
    public void setTransactionReference(String transactionReference) { this.transactionReference = transactionReference; }

    public String getReceiptNumber() { return receiptNumber; }
    public void setReceiptNumber(String receiptNumber) { this.receiptNumber = receiptNumber; }

    public DonationStatus getStatus() { return status; }
    public void setStatus(DonationStatus status) { this.status = status; }

    public boolean isSimulated() { return isSimulated; }
    public void setSimulated(boolean simulated) { isSimulated = simulated; }

    public String getDemoDisclaimer() { return demoDisclaimer; }
    public void setDemoDisclaimer(String demoDisclaimer) { this.demoDisclaimer = demoDisclaimer; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
