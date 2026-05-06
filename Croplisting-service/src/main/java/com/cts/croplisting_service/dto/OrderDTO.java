package com.cts.croplisting_service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    private Long orderId; // optional, filled when returning response

    @NotNull(message = "Listing ID is mandatory")
    private Long listingId;

    @NotNull(message = "Trader ID is mandatory")
    private Long traderId;

    @NotNull(message = "Quantity is mandatory")
    @Positive
    private int quantity;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate orderDate;

    private String orderStatus; // optional, filled when returning response

}
