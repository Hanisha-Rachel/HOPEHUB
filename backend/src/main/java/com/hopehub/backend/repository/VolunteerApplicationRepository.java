package com.hopehub.backend.repository;

import com.hopehub.backend.model.ApplicationStatus;
import com.hopehub.backend.model.VolunteerApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VolunteerApplicationRepository extends JpaRepository<VolunteerApplication, Long> {

    List<VolunteerApplication> findByVolunteerIdOrderByCreatedAtDesc(Long volunteerId);

    List<VolunteerApplication> findByOpportunityIdOrderByCreatedAtDesc(Long opportunityId);

    Optional<VolunteerApplication> findByOpportunityIdAndVolunteerId(Long opportunityId, Long volunteerId);

    boolean existsByOpportunityIdAndVolunteerId(Long opportunityId, Long volunteerId);

    @Query("SELECT COALESCE(SUM(v.hoursContributed), 0) FROM VolunteerApplication v WHERE v.volunteer.id = :volunteerId AND (v.status = 'ACCEPTED' OR v.status = 'COMPLETED')")
    int calculateTotalHoursForVolunteer(@Param("volunteerId") Long volunteerId);

    long countByVolunteerId(Long volunteerId);

    long countByStatus(ApplicationStatus status);
}
