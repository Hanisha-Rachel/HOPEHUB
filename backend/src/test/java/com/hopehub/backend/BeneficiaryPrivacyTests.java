package com.hopehub.backend;

import com.hopehub.backend.dto.BeneficiaryRequestDto;
import com.hopehub.backend.exception.UnauthorizedException;
import com.hopehub.backend.model.*;
import com.hopehub.backend.repository.BeneficiaryRequestRepository;
import com.hopehub.backend.repository.UserRepository;
import com.hopehub.backend.service.AuditLogService;
import com.hopehub.backend.service.BeneficiaryRequestService;
import com.hopehub.backend.service.NotificationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BeneficiaryPrivacyTests {

    @Mock
    private BeneficiaryRequestRepository beneficiaryRequestRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private NotificationService notificationService;

    @Mock
    private AuditLogService auditLogService;

    private BeneficiaryRequestService beneficiaryRequestService;

    @BeforeEach
    void setUp() {
        beneficiaryRequestService = new BeneficiaryRequestService(
                beneficiaryRequestRepository,
                userRepository,
                notificationService,
                auditLogService
        );
    }

    @Test
    @DisplayName("Beneficiary can view their own confidential assistance request")
    void testOwnerCanViewOwnRequest() {
        User beneficiaryUser = new User();
        beneficiaryUser.setId(10L);
        beneficiaryUser.setEmail("beneficiary@hopehub.org");
        beneficiaryUser.setRole(Role.BENEFICIARY);

        BeneficiaryRequest request = new BeneficiaryRequest();
        request.setId(55L);
        request.setUser(beneficiaryUser);
        request.setFullName("Sunita Devi");
        request.setContactEmail("beneficiary@hopehub.org");
        request.setContactPhone("+91 98112 23344");
        request.setCategory(CampaignCategory.EDUCATION);
        request.setAssistanceNeeded("Tablet for daughter");
        request.setEstimatedCost(new BigDecimal("15000.00"));
        request.setConfidential(true);
        request.setVerificationStatus(RequestStatus.UNDER_REVIEW);

        when(beneficiaryRequestRepository.findById(55L)).thenReturn(Optional.of(request));

        BeneficiaryRequestDto dto = beneficiaryRequestService.getRequestById(55L, "beneficiary@hopehub.org", false);

        assertNotNull(dto);
        assertEquals(55L, dto.getId());
        assertEquals("Sunita Devi", dto.getFullName());
        assertTrue(dto.isConfidential());
    }

    @Test
    @DisplayName("Non-owner is blocked with UnauthorizedException when attempting to access private request")
    void testNonOwnerIsBlockedFromPrivateRequest() {
        User beneficiaryUser = new User();
        beneficiaryUser.setId(10L);
        beneficiaryUser.setEmail("beneficiary@hopehub.org");
        beneficiaryUser.setRole(Role.BENEFICIARY);

        BeneficiaryRequest request = new BeneficiaryRequest();
        request.setId(55L);
        request.setUser(beneficiaryUser);
        request.setConfidential(true);

        when(beneficiaryRequestRepository.findById(55L)).thenReturn(Optional.of(request));

        assertThrows(UnauthorizedException.class, () ->
                beneficiaryRequestService.getRequestById(55L, "unauthorized.user@example.com", false));
    }

    @Test
    @DisplayName("Admin can view confidential assistance request for moderation purposes")
    void testAdminCanViewPrivateRequest() {
        User beneficiaryUser = new User();
        beneficiaryUser.setId(10L);
        beneficiaryUser.setEmail("beneficiary@hopehub.org");
        beneficiaryUser.setRole(Role.BENEFICIARY);

        BeneficiaryRequest request = new BeneficiaryRequest();
        request.setId(55L);
        request.setUser(beneficiaryUser);
        request.setFullName("Sunita Devi");
        request.setContactEmail("beneficiary@hopehub.org");
        request.setContactPhone("+91 98112 23344");
        request.setCategory(CampaignCategory.EDUCATION);
        request.setAssistanceNeeded("Medical surgery funds");
        request.setConfidential(true);
        request.setVerificationStatus(RequestStatus.PENDING);

        when(beneficiaryRequestRepository.findById(55L)).thenReturn(Optional.of(request));

        BeneficiaryRequestDto dto = beneficiaryRequestService.getRequestById(55L, "admin@hopehub.org", true);

        assertNotNull(dto);
        assertEquals(55L, dto.getId());
    }
}
