package com.hopehub.backend.dto;

import com.hopehub.backend.model.Role;
import java.time.LocalDateTime;
import java.util.Map;

public class UserProfileDto {

    private Long id;
    private String fullName;
    private String email;
    private Role role;
    private String phone;
    private String avatarUrl;
    private String bio;
    private String address;
    private LocalDateTime createdAt;
    private Map<String, Object> stats;

    public UserProfileDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Map<String, Object> getStats() { return stats; }
    public void setStats(Map<String, Object> stats) { this.stats = stats; }
}
