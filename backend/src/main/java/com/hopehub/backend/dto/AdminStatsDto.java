package com.hopehub.backend.dto;

import java.math.BigDecimal;
import java.util.Map;

public class AdminStatsDto {

    private long totalUsers;
    private long totalDonors;
    private long totalBeneficiaries;
    private long totalVolunteers;
    private long totalNgos;
    private long verifiedNgos;
    private long pendingNgos;
    private long totalCampaigns;
    private long activeCampaigns;
    private long pendingCampaigns;
    private BigDecimal totalFundsRaised;
    private long totalVolunteerHours;
    private long pendingBeneficiaryRequests;
    private boolean isDemonstration = true;
    private Map<String, Object> additionalMetrics;

    public AdminStatsDto() {}

    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }

    public long getTotalDonors() { return totalDonors; }
    public void setTotalDonors(long totalDonors) { this.totalDonors = totalDonors; }

    public long getTotalBeneficiaries() { return totalBeneficiaries; }
    public void setTotalBeneficiaries(long totalBeneficiaries) { this.totalBeneficiaries = totalBeneficiaries; }

    public long getTotalVolunteers() { return totalVolunteers; }
    public void setTotalVolunteers(long totalVolunteers) { this.totalVolunteers = totalVolunteers; }

    public long getTotalNgos() { return totalNgos; }
    public void setTotalNgos(long totalNgos) { this.totalNgos = totalNgos; }

    public long getVerifiedNgos() { return verifiedNgos; }
    public void setVerifiedNgos(long verifiedNgos) { this.verifiedNgos = verifiedNgos; }

    public long getPendingNgos() { return pendingNgos; }
    public void setPendingNgos(long pendingNgos) { this.pendingNgos = pendingNgos; }

    public long getTotalCampaigns() { return totalCampaigns; }
    public void setTotalCampaigns(long totalCampaigns) { this.totalCampaigns = totalCampaigns; }

    public long getActiveCampaigns() { return activeCampaigns; }
    public void setActiveCampaigns(long activeCampaigns) { this.activeCampaigns = activeCampaigns; }

    public long getPendingCampaigns() { return pendingCampaigns; }
    public void setPendingCampaigns(long pendingCampaigns) { this.pendingCampaigns = pendingCampaigns; }

    public BigDecimal getTotalFundsRaised() { return totalFundsRaised; }
    public void setTotalFundsRaised(BigDecimal totalFundsRaised) { this.totalFundsRaised = totalFundsRaised; }

    public long getTotalVolunteerHours() { return totalVolunteerHours; }
    public void setTotalVolunteerHours(long totalVolunteerHours) { this.totalVolunteerHours = totalVolunteerHours; }

    public long getPendingBeneficiaryRequests() { return pendingBeneficiaryRequests; }
    public void setPendingBeneficiaryRequests(long pendingBeneficiaryRequests) { this.pendingBeneficiaryRequests = pendingBeneficiaryRequests; }

    public boolean isDemonstration() { return isDemonstration; }
    public void setDemonstration(boolean demonstration) { isDemonstration = demonstration; }

    public Map<String, Object> getAdditionalMetrics() { return additionalMetrics; }
    public void setAdditionalMetrics(Map<String, Object> additionalMetrics) { this.additionalMetrics = additionalMetrics; }
}
