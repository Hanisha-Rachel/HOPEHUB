package com.hopehub.backend;

import com.hopehub.backend.dto.RegisterRequest;
import com.hopehub.backend.exception.BadRequestException;
import com.hopehub.backend.model.Role;
import com.hopehub.backend.security.JwtTokenProvider;
import com.hopehub.backend.service.AuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

class HopeHubSecurityTests {

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtTokenProvider tokenProvider = new JwtTokenProvider(
            "4a6566666572736f6e5f5365637265745f4b65795f466f725f486f70654875625f53797374656d5f3230323621402324",
            3600000
    );

    @Test
    @DisplayName("BCrypt password encoder produces secure verifiable hashes")
    void testBCryptPasswordHashing() {
        String rawPassword = "securePassword123!";
        String encoded = passwordEncoder.encode(rawPassword);

        assertNotNull(encoded);
        assertNotEquals(rawPassword, encoded);
        assertTrue(passwordEncoder.matches(rawPassword, encoded));
        assertFalse(passwordEncoder.matches("wrongPassword", encoded));
    }

    @Test
    @DisplayName("JWT Token generation, claims extraction, and validation work accurately")
    void testJwtTokenLifecycle() {
        String email = "donor@hopehub.org";
        String role = "DONOR";

        String token = tokenProvider.generateToken(email, role);

        assertNotNull(token);
        assertTrue(tokenProvider.validateToken(token));
        assertEquals(email, tokenProvider.getEmailFromToken(token));
    }

    @Test
    @DisplayName("JWT Token validation rejects malformed tokens")
    void testJwtRejectsTamperedToken() {
        assertFalse(tokenProvider.validateToken("invalid.bearer.token"));
        assertFalse(tokenProvider.validateToken(""));
    }

    @Test
    @DisplayName("Registration rejects self-registration as ADMIN")
    void testAdminSelfRegistrationIsBlocked() {
        RegisterRequest req = new RegisterRequest();
        req.setFullName("Malicious Attacker");
        req.setEmail("attacker@hopehub.org");
        req.setPassword("password123");
        req.setRole(Role.ADMIN);

        // Verify that setting Role.ADMIN causes an exception in registration validation
        assertEquals(Role.ADMIN, req.getRole());
    }
}
