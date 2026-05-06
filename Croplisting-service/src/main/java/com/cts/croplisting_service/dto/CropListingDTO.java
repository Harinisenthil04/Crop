package com.cts.croplisting_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CropListingDTO {

    private Long listingId; // optional, filled when returning response

    @NotNull(message = "Farmer ID is mandatory")
    private Long farmerId;

    @NotBlank(message = "Crop type is mandatory")
    private String cropType;

    @NotNull(message = "Quantity is mandatory")
    private int quantity;

    @NotNull(message = "Price is mandatory")
    private double price;

    @NotBlank(message = "Location is mandatory")
    private String location;

    private String status; // optional, filled when returning response

}

