package com.hopehub.backend.repository;

import com.hopehub.backend.model.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {

    List<Donation> findByDonorIdOrderByCreatedAtDesc(Long donorId);

    List<Donation> findByCampaignIdOrderByCreatedAtDesc(Long campaignId);

    Optional<Donation> findByReceiptNumber(String receiptNumber);

    Optional<Donation> findByTransactionReference(String transactionReference);

    @Query("SELECT COALESCE(SUM(d.amount), 0) FROM Donation d WHERE d.donor.id = :donorId AND d.status = 'SUCCESSFUL'")
    BigDecimal calculateTotalDonatedByDonor(@Param("donorId") Long donorId);

    @Query("SELECT COUNT(DISTINCT d.campaign.id) FROM Donation d WHERE d.donor.id = :donorId AND d.status = 'SUCCESSFUL'")
    long countDistinctCampaignsSupportedByDonor(@Param("donorId") Long donorId);

    long countByDonorId(Long donorId);
}
