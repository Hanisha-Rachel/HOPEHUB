package com.hopehub.backend.repository;

import com.hopehub.backend.model.Campaign;
import com.hopehub.backend.model.CampaignCategory;
import com.hopehub.backend.model.CampaignStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long> {

    List<Campaign> findByStatus(CampaignStatus status);

    List<Campaign> findByStatusAndIsFeaturedTrue(CampaignStatus status);

    List<Campaign> findByStatusAndCategory(CampaignStatus status, CampaignCategory category);

    List<Campaign> findByNgoId(Long ngoId);

    @Query("SELECT c FROM Campaign c WHERE c.status = :status AND " +
           "(LOWER(c.title) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           " LOWER(c.description) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           " LOWER(c.location) LIKE LOWER(CONCAT('%', :q, '%')))")
    List<Campaign> searchActiveCampaigns(@Param("status") CampaignStatus status, @Param("q") String q);

    long countByStatus(CampaignStatus status);

    @Query("SELECT COALESCE(SUM(c.raisedAmount), 0) FROM Campaign c WHERE c.status = 'ACTIVE' OR c.status = 'COMPLETED'")
    BigDecimal calculateTotalFundsRaised();
}
