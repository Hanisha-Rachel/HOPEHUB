package com.hopehub.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class DonationRequest {

    @NotNull(message = "Campaign ID is required")
    private Long campaignId;

    @NotBlank(message = "Donor name is required")
    private String donorName;

    @NotBlank(message = "Donor email is required")
    @Email(message = "Valid email is required")
    private String donorEmail;

    @NotNull(message = "Donation amount is required")
    @DecimalMin(value = "1.00", message = "Donation amount must be at least ₹1")
    private BigDecimal amount;

    private String paymentMethod = "UPI_SIMULATED";

    private boolean isAnonymous = false;

    private String notes;

    public DonationRequest() {}

    public Long getCampaignId() { return campaignId; }
    public void setCampaignId(Long campaignId) { this.campaignId = campaignId; }

    public String getDonorName() { return donorName; }
    public void setDonorName(String donorName) { this.donorName = donorName; }

    public String getDonorEmail() { return donorEmail; }
    public void setDonorEmail(String donorEmail) { this.donorEmail = donorEmail; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public boolean isAnonymous() { return isAnonymous; }
    public void setAnonymous(boolean anonymous) { isAnonymous = anonymous; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
