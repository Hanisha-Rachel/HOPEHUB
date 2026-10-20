package com.hopehub.backend.repository;

import com.hopehub.backend.model.ResourceContribution;
import com.hopehub.backend.model.ResourceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceContributionRepository extends JpaRepository<ResourceContribution, Long> {

    List<ResourceContribution> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<ResourceContribution> findByStatusOrderByCreatedAtDesc(ResourceStatus status);

    long countByStatus(ResourceStatus status);
}
