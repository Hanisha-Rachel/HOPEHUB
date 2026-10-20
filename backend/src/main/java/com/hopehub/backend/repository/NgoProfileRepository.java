package com.hopehub.backend.repository;

import com.hopehub.backend.model.NgoProfile;
import com.hopehub.backend.model.NgoVerificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NgoProfileRepository extends JpaRepository<NgoProfile, Long> {
    Optional<NgoProfile> findByUserId(Long userId);
    List<NgoProfile> findByVerificationStatus(NgoVerificationStatus status);
    boolean existsByRegistrationNumber(String registrationNumber);
    long countByVerificationStatus(NgoVerificationStatus status);
}
