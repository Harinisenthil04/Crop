package com.cts.croplisting_service.entity;

import com.cts.croplisting_service.enums.CropListingStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "crop_listing")
public class CropListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long listingId;

    @Column(nullable = false)
    private Long farmerId; // Replaced Farmer object with ID

    @Column(nullable = false)
    private String cropType;

    @Column(nullable = false)
    @Positive
    private int quantity;

    @Column(nullable = false)
    private double price;

    private String location;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private CropListingStatus status;

    @OneToMany(mappedBy = "cropListing", cascade = CascadeType.ALL)
    private List<Order> orders;
}