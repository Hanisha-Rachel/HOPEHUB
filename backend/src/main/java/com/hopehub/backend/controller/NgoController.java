package com.hopehub.backend.controller;

import com.hopehub.backend.dto.ApiResponse;
import com.hopehub.backend.service.NgoService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ngos")
public class NgoController {

    private final NgoService ngoService;

    public NgoController(NgoService ngoService) {
        this.ngoService = ngoService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getVerifiedNgos() {
        List<Map<String, Object>> ngos = ngoService.getVerifiedNgos();
        return ResponseEntity.ok(ApiResponse.success(ngos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getNgoById(@PathVariable Long id) {
        Map<String, Object> ngo = ngoService.getNgoById(id);
        return ResponseEntity.ok(ApiResponse.success(ngo));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getMyNgoProfile(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Not authenticated"));
        }
        Map<String, Object> profile = ngoService.getMyNgoProfile(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(profile));
    }
}
