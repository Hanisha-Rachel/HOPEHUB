package com.hopehub.backend.repository;

import com.hopehub.backend.model.BeneficiaryRequest;
import com.hopehub.backend.model.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BeneficiaryRequestRepository extends JpaRepository<BeneficiaryRequest, Long> {

    List<BeneficiaryRequest> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<BeneficiaryRequest> findByVerificationStatusOrderByCreatedAtDesc(RequestStatus status);

    long countByUserId(Long userId);

    long countByVerificationStatus(RequestStatus status);
}
