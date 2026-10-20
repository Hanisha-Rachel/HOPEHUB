package com.hopehub.backend;

import com.hopehub.backend.dto.DonationRequest;
import com.hopehub.backend.dto.DonationResponseDto;
import com.hopehub.backend.exception.BadRequestException;
import com.hopehub.backend.model.*;
import com.hopehub.backend.repository.CampaignRepository;
import com.hopehub.backend.repository.DonationRepository;
import com.hopehub.backend.repository.UserRepository;
import com.hopehub.backend.service.AuditLogService;
import com.hopehub.backend.service.DonationService;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DonationServiceTests {

    @Mock
    private DonationRepository donationRepository;

    @Mock
    private CampaignRepository campaignRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private NotificationService notificationService;

    @Mock
    private AuditLogService auditLogService;

    private DonationService donationService;

    @BeforeEach
    void setUp() {
        donationService = new DonationService(
                donationRepository,
                campaignRepository,
                userRepository,
                notificationService,
                auditLogService
        );
    }

    @Test
    @DisplayName("Simulated donation enforces demo mode disclaimer and generates unique receipt")
    void testProcessSimulatedDonationSuccess() {
        Campaign campaign = new Campaign();
        campaign.setId(1L);
        campaign.setTitle("Project Vidya");
        campaign.setStatus(CampaignStatus.ACTIVE);
        campaign.setGoalAmount(new BigDecimal("500000.00"));
        campaign.setRaisedAmount(new BigDecimal("10000.00"));
        campaign.setDonorCount(10);

        when(campaignRepository.findById(1L)).thenReturn(Optional.of(campaign));
        when(donationRepository.save(any(Donation.class))).thenAnswer(invocation -> {
            Donation d = invocation.getArgument(0);
            d.setId(99L);
            return d;
        });

        DonationRequest request = new DonationRequest();
        request.setCampaignId(1L);
        request.setDonorName("Kind Donor");
        request.setDonorEmail("donor@example.com");
        request.setAmount(new BigDecimal("2500.00"));
        request.setPaymentMethod("UPI_SIMULATED");

        DonationResponseDto response = donationService.processDonation(request, null);

        assertNotNull(response);
        assertEquals(new BigDecimal("2500.00"), response.getAmount());
        assertTrue(response.isSimulated());
        assertEquals("DEMO MODE — No real money has been transferred.", response.getDemoDisclaimer());
        assertNotNull(response.getReceiptNumber());
        assertTrue(response.getReceiptNumber().startsWith("HH-RCPT-"));
        assertEquals(DonationStatus.SUCCESSFUL, response.getStatus());
    }

    @Test
    @DisplayName("Donation rejects amounts less than 1 rupee")
    void testProcessDonationRejectsInvalidAmount() {
        DonationRequest request = new DonationRequest();
        request.setCampaignId(1L);
        request.setDonorName("Donor");
        request.setDonorEmail("donor@example.com");
        request.setAmount(new BigDecimal("0.50"));

        assertThrows(BadRequestException.class, () -> donationService.processDonation(request, null));
    }
}
