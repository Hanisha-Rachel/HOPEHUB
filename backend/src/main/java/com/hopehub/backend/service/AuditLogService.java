package com.hopehub.backend.service;

import com.hopehub.backend.model.AuditLog;
import com.hopehub.backend.repository.AuditLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public void log(String userEmail, String action, String entityType, Long entityId, String details, String ipAddress) {
        try {
            AuditLog auditLog = new AuditLog(userEmail, action, entityType, entityId, details, ipAddress);
            auditLogRepository.save(auditLog);
        } catch (Exception e) {
            // Non-blocking fallback for audit logging
            System.err.println("[AUDIT ERROR] Failed to record audit log: " + e.getMessage());
        }
    }

    public List<AuditLog> getRecentLogs() {
        return auditLogRepository.findTop50ByOrderByCreatedAtDesc();
    }
}
