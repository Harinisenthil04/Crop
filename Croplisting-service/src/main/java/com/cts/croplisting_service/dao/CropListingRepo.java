package com.cts.croplisting_service.dao;

import com.cts.croplisting_service.entity.CropListing;
import com.cts.croplisting_service.enums.CropListingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropListingRepo extends JpaRepository<CropListing, Long> {

    // Find all crops listed by a specific farmer (Microservice style: using Long ID)
    List<CropListing> findByFarmerId(Long farmerId);

    // Filter listings by status (PENDING, VALIDATED, etc.)
    List<CropListing> findByStatus(CropListingStatus status);

    // Find listings in a specific location
    List<CropListing> findByLocationContainingIgnoreCase(String location);
}