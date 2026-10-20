package com.hopehub.backend.repository;

import com.hopehub.backend.model.OpportunityStatus;
import com.hopehub.backend.model.VolunteerOpportunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VolunteerOpportunityRepository extends JpaRepository<VolunteerOpportunity, Long> {

    List<VolunteerOpportunity> findByStatusOrderByStartDateAsc(OpportunityStatus status);

    List<VolunteerOpportunity> findByNgoIdOrderByCreatedAtDesc(Long ngoId);

    long countByStatus(OpportunityStatus status);
}
