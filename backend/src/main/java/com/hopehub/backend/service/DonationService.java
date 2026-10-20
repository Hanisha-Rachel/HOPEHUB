package com.hopehub.backend.service;

import com.hopehub.backend.dto.DonationRequest;
import com.hopehub.backend.dto.DonationResponseDto;
import com.hopehub.backend.exception.BadRequestException;
import com.hopehub.backend.exception.ResourceNotFoundException;
import com.hopehub.backend.model.*;
import com.hopehub.backend.repository.CampaignRepository;
import com.hopehub.backend.repository.DonationRepository;
import com.hopehub.backend.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DonationService {

    public static final String DEMO_DISCLAIMER =
            "DEMO MODE — No real money has been transferred.";

    private final DonationRepository donationRepository;
    private final CampaignRepository campaignRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final AuditLogService auditLogService;

    public DonationService(
            DonationRepository donationRepository,
            CampaignRepository campaignRepository,
            UserRepository userRepository,
            NotificationService notificationService,
            AuditLogService auditLogService) {

        this.donationRepository = donationRepository;
        this.campaignRepository = campaignRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.auditLogService = auditLogService;
    }

    // Process a simulated donation and update the campaign.
    @Transactional
    public DonationResponseDto processDonation(
            DonationRequest request,
            String optionalAuthenticatedEmail) {

        // Validate the donation amount.
        if (request.getAmount() == null
                || request.getAmount().compareTo(BigDecimal.ONE) < 0) {
            throw new BadRequestException(
                    "Donation amount must be at least ₹1.00");
        }

        // Find the campaign.
        Campaign campaign = campaignRepository.findById(
                request.getCampaignId()
        ).orElseThrow(() ->
                new ResourceNotFoundException(
                        "Campaign not found with ID: "
                                + request.getCampaignId()
                )
        );

        // Allow donations only to active campaigns.
        if (campaign.getStatus() != CampaignStatus.ACTIVE) {
            throw new BadRequestException(
                    "Donations can only be made to active charity campaigns.");
        }

        // Link the donor to an account if the donor is authenticated.
        User donorUser = null;

        if (optionalAuthenticatedEmail != null
                && !optionalAuthenticatedEmail.isBlank()) {

            donorUser = userRepository
                    .findByEmail(optionalAuthenticatedEmail)
                    .orElse(null);
        }

        // Generate transaction and receipt references.
        String timestamp = LocalDateTime.now().format(
                DateTimeFormatter.ofPattern("yyyyMMddHHmmss")
        );

        String shortId = UUID.randomUUID()
                .toString()
                .substring(0, 6)
                .toUpperCase();

        String txnRef = "TXN-DEMO-" + timestamp + "-" + shortId;

        String ym = LocalDateTime.now().format(
                DateTimeFormatter.ofPattern("yyyyMM")
        );

        String receiptNo = "HH-RCPT-" + ym + "-" + shortId;

        // Create the donation record.
        Donation donation = new Donation();

        donation.setCampaign(campaign);
        donation.setDonor(donorUser);

        donation.setDonorName(
                request.getDonorName() != null
                        ? request.getDonorName().trim()
                        : "Kind Donor"
        );

        donation.setDonorEmail(
                request.getDonorEmail() != null
                        ? request.getDonorEmail().trim()
                        : ""
        );

        donation.setAmount(request.getAmount());

        donation.setPaymentMethod(
                request.getPaymentMethod() != null
                        ? request.getPaymentMethod()
                        : "UPI_SIMULATED"
        );

        donation.setTransactionReference(txnRef);
        donation.setAnonymous(request.isAnonymous());
        donation.setSimulated(true);
        donation.setStatus(DonationStatus.SUCCESSFUL);
        donation.setReceiptNumber(receiptNo);
        donation.setNotes(request.getNotes());

        // Save the donation first so that its ID is generated.
        Donation savedDonation = donationRepository.save(donation);

        // Update the campaign raised amount exactly once.
        BigDecimal currentRaised =
                campaign.getRaisedAmount() != null
                        ? campaign.getRaisedAmount()
                        : BigDecimal.ZERO;

        campaign.setRaisedAmount(
                currentRaised.add(request.getAmount())
        );

        // Update donor count exactly once.
        int currentDonorCount = campaign.getDonorCount();

        campaign.setDonorCount(currentDonorCount + 1);

        // Mark the campaign completed if the goal has been reached.
        if (campaign.getGoalAmount() != null
                && campaign.getRaisedAmount()
                        .compareTo(campaign.getGoalAmount()) >= 0) {

            campaign.setStatus(CampaignStatus.COMPLETED);
        }

        campaignRepository.save(campaign);

        // Notify the authenticated donor.
        if (donorUser != null) {
            notificationService.createNotification(
                    donorUser,
                    "Donation Receipt Generated",
                    "Your simulated contribution of ₹"
                            + request.getAmount()
                            + " to '"
                            + campaign.getTitle()
                            + "' was recorded. Receipt: "
                            + receiptNo,
                    NotificationType.SUCCESS,
                    "/donor-dashboard"
            );
        }

        // Notify the NGO associated with the campaign.
        if (campaign.getNgo() != null
                && campaign.getNgo().getUser() != null) {

            notificationService.createNotification(
                    campaign.getNgo().getUser(),
                    "New Contribution Received",
                    "A new simulated donation of ₹"
                            + request.getAmount()
                            + " was received for '"
                            + campaign.getTitle()
                            + "'.",
                    NotificationType.INFO,
                    "/ngo-dashboard"
            );
        }

        // Record the audit log.
        auditLogService.log(
                donorUser != null
                        ? donorUser.getEmail()
                        : request.getDonorEmail(),
                "SIMULATED_DONATION",
                "Donation",
                savedDonation.getId(),
                "Amount: ₹"
                        + request.getAmount()
                        + " for Campaign "
                        + campaign.getId()
                        + " ("
                        + DEMO_DISCLAIMER
                        + ")",
                null
        );

        // Return the saved donation as a response DTO.
        return mapToDto(savedDonation);
    }

    // Retrieve a donation receipt.
    @Transactional(readOnly = true)
    public DonationResponseDto getReceipt(String receiptNumber) {

        Donation donation = donationRepository
                .findByReceiptNumber(receiptNumber)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Receipt not found: " + receiptNumber
                        )
                );

        return mapToDto(donation);
    }

    // Retrieve donations belonging to the authenticated user.
    @Transactional(readOnly = true)
    public List<DonationResponseDto> getMyDonations(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found")
                );

        return donationRepository
                .findByDonorIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // Retrieve donations made to a particular campaign.
    @Transactional(readOnly = true)
    public List<DonationResponseDto> getCampaignDonations(
            Long campaignId) {

        return donationRepository
                .findByCampaignIdOrderByCreatedAtDesc(campaignId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // Convert a Donation entity into a response DTO.
    private DonationResponseDto mapToDto(Donation donation) {

        DonationResponseDto dto = new DonationResponseDto();

        dto.setId(donation.getId());

        dto.setCampaignId(
                donation.getCampaign() != null
                        ? donation.getCampaign().getId()
                        : null
        );

        dto.setCampaignTitle(
                donation.getCampaign() != null
                        ? donation.getCampaign().getTitle()
                        : "HopeHub Campaign"
        );

        dto.setDonorName(
                donation.isAnonymous()
                        ? "Kind Donor"
                        : donation.getDonorName()
        );

        dto.setDonorEmail(
                donation.isAnonymous()
                        ? "anonymous@hopehub.org"
                        : donation.getDonorEmail()
        );

        dto.setAmount(donation.getAmount());
        dto.setPaymentMethod(donation.getPaymentMethod());
        dto.setTransactionReference(
                donation.getTransactionReference()
        );
        dto.setReceiptNumber(donation.getReceiptNumber());
        dto.setStatus(donation.getStatus());
        dto.setSimulated(donation.isSimulated());
        dto.setDemoDisclaimer(DEMO_DISCLAIMER);
        dto.setNotes(donation.getNotes());
        dto.setCreatedAt(donation.getCreatedAt());

        return dto;
    }
}