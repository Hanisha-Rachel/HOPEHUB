package com.hopehub.backend.controller;

import com.hopehub.backend.dto.ApiResponse;
import com.hopehub.backend.dto.NotificationDto;
import com.hopehub.backend.model.User;
import com.hopehub.backend.service.AuthService;
import com.hopehub.backend.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final AuthService authService;

    public NotificationController(NotificationService notificationService, AuthService authService) {
        this.notificationService = notificationService;
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<NotificationDto>>> getMyNotifications(
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = authService.getUserByEmail(userDetails.getUsername());
        List<NotificationDto> notifications = notificationService.getUserNotifications(user.getId());
        return ResponseEntity.ok(ApiResponse.success(notifications));
    }

    @PutMapping("/mark-read")
    public ResponseEntity<ApiResponse<String>> markAllRead(
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = authService.getUserByEmail(userDetails.getUsername());
        notificationService.markAllAsRead(user.getId());
        return ResponseEntity.ok(ApiResponse.success("All notifications marked as read.", "OK"));
    }
}
