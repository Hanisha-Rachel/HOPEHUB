package com.hopehub.backend.dto;

import com.hopehub.backend.model.ItemType;
import com.hopehub.backend.model.ResourceStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ResourceContributionDto {

    private Long id;
    private Long userId;

    @NotBlank(message = "Donor name is required")
    private String donorName;

    @NotBlank(message = "Donor email is required")
    @Email(message = "Valid email is required")
    private String donorEmail;

    @NotBlank(message = "Phone number is required")
    private String donorPhone;

    @NotNull(message = "Item type is required")
    private ItemType itemType;

    @NotBlank(message = "Item description is required")
    private String itemDescription;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity = 1;

    private String unit = "units";

    @NotBlank(message = "Pickup address is required")
    private String pickupAddress;

    @NotNull(message = "Preferred pickup date is required")
    private LocalDate preferredDate;

    private ResourceStatus status = ResourceStatus.OFFERED;
    private String notes;
    private LocalDateTime createdAt;

    public ResourceContributionDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getDonorName() { return donorName; }
    public void setDonorName(String donorName) { this.donorName = donorName; }

    public String getDonorEmail() { return donorEmail; }
    public void setDonorEmail(String donorEmail) { this.donorEmail = donorEmail; }

    public String getDonorPhone() { return donorPhone; }
    public void setDonorPhone(String donorPhone) { this.donorPhone = donorPhone; }

    public ItemType getItemType() { return itemType; }
    public void setItemType(ItemType itemType) { this.itemType = itemType; }

    public String getItemDescription() { return itemDescription; }
    public void setItemDescription(String itemDescription) { this.itemDescription = itemDescription; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getPickupAddress() { return pickupAddress; }
    public void setPickupAddress(String pickupAddress) { this.pickupAddress = pickupAddress; }

    public LocalDate getPreferredDate() { return preferredDate; }
    public void setPreferredDate(LocalDate preferredDate) { this.preferredDate = preferredDate; }

    public ResourceStatus getStatus() { return status; }
    public void setStatus(ResourceStatus status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
