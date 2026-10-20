package com.hopehub.backend.service;

import com.hopehub.backend.dto.*;
import com.hopehub.backend.exception.BadRequestException;
import com.hopehub.backend.exception.ResourceNotFoundException;
import com.hopehub.backend.model.*;
import com.hopehub.backend.repository.DonationRepository;
import com.hopehub.backend.repository.NgoProfileRepository;
import com.hopehub.backend.repository.UserRepository;
import com.hopehub.backend.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final NgoProfileRepository ngoProfileRepository;
    private final DonationRepository donationRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final NotificationService notificationService;
    private final AuditLogService auditLogService;

    public AuthService(
            UserRepository userRepository,
            NgoProfileRepository ngoProfileRepository,
            DonationRepository donationRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider tokenProvider,
            AuthenticationManager authenticationManager,
            NotificationService notificationService,
            AuditLogService auditLogService) {
        this.userRepository = userRepository;
        this.ngoProfileRepository = ngoProfileRepository;
        this.donationRepository = donationRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
        this.notificationService = notificationService;
        this.auditLogService = auditLogService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Enforce security rule: Never allow self-registration as ADMIN
        if (request.getRole() == Role.ADMIN) {
            throw new BadRequestException("Self-registration as ADMIN is strictly prohibited. Administrator accounts must be provisioned via safe backend bootstrap.");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("An account with email " + request.getEmail() + " already exists.");
        }

        User user = new User();
        user.setFullName(request.getFullName().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setActive(true);

        User savedUser = userRepository.save(user);

        // If registered as NGO, create corresponding NgoProfile with PENDING verification
        if (request.getRole() == Role.NGO) {
            NgoProfile ngo = new NgoProfile();
            ngo.setUser(savedUser);
            ngo.setOrganizationName(request.getOrganizationName() != null ? request.getOrganizationName() : request.getFullName());
            ngo.setRegistrationNumber(request.getRegistrationNumber() != null ? request.getRegistrationNumber() : "PENDING-SUBMISSION");
            ngo.setContactEmail(savedUser.getEmail());
            ngo.setPhone(savedUser.getPhone());
            ngo.setAddress(savedUser.getAddress());
            ngo.setWebsite(request.getWebsite());
            ngo.setMissionStatement(request.getMissionStatement());
            ngo.setVerificationStatus(NgoVerificationStatus.PENDING);
            ngoProfileRepository.save(ngo);
        }

        // Welcome notification
        notificationService.createNotification(
                savedUser,
                "Welcome to HOPEHUB",
                "Your account has been successfully created. Explore verified charity campaigns and initiatives.",
                NotificationType.SUCCESS,
                "/explore"
        );

        auditLogService.log(savedUser.getEmail(), "REGISTER", "User", savedUser.getId(), "User registered with role " + savedUser.getRole(), null);

        // Generate JWT token
        String token = tokenProvider.generateToken(savedUser.getEmail(), savedUser.getRole().name());

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getFullName(),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.getPhone(),
                savedUser.getAvatarUrl()
        );
    }

    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail().trim().toLowerCase(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!user.isActive()) {
            throw new BadRequestException("This account has been deactivated. Please contact support.");
        }

        String token = tokenProvider.generateToken(user.getEmail(), user.getRole().name());

        auditLogService.log(user.getEmail(), "LOGIN", "User", user.getId(), "Successful login", null);

        return new AuthResponse(
                token,
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole(),
                user.getPhone(),
                user.getAvatarUrl()
        );
    }

    public UserProfileDto getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        UserProfileDto dto = new UserProfileDto();
        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setPhone(user.getPhone());
        dto.setAvatarUrl(user.getAvatarUrl());
        dto.setBio(user.getBio());
        dto.setAddress(user.getAddress());
        dto.setCreatedAt(user.getCreatedAt());

        Map<String, Object> stats = new HashMap<>();
        if (user.getRole() == Role.DONOR) {
            BigDecimal totalDonated = donationRepository.calculateTotalDonatedByDonor(user.getId());
            long supportedCount = donationRepository.countDistinctCampaignsSupportedByDonor(user.getId());
            stats.put("totalDonated", totalDonated != null ? totalDonated : BigDecimal.ZERO);
            stats.put("supportedCount", supportedCount);
        }
        dto.setStats(stats);

        return dto;
    }

    @Transactional
    public UserProfileDto updateProfile(String email, UserProfileDto updates) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        if (updates.getFullName() != null && !updates.getFullName().isBlank()) {
            user.setFullName(updates.getFullName().trim());
        }
        if (updates.getPhone() != null) {
            user.setPhone(updates.getPhone());
        }
        if (updates.getBio() != null) {
            user.setBio(updates.getBio());
        }
        if (updates.getAddress() != null) {
            user.setAddress(updates.getAddress());
        }
        if (updates.getAvatarUrl() != null) {
            user.setAvatarUrl(updates.getAvatarUrl());
        }

        userRepository.save(user);
        auditLogService.log(email, "UPDATE_PROFILE", "User", user.getId(), "Profile details updated", null);

        return getProfile(email);
    }

    @Transactional
    public void changePassword(String email, PasswordChangeRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPasswordHash())) {
            throw new BadRequestException("Current password does not match.");
        }

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        notificationService.createNotification(
                user,
                "Password Changed",
                "Your HOPEHUB account password was updated successfully.",
                NotificationType.INFO,
                "/profile"
        );

        auditLogService.log(email, "PASSWORD_CHANGE", "User", user.getId(), "Password changed successfully", null);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }
}
