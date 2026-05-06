package com.cts.croplisting_service.service;

import com.cts.croplisting_service.client.FarmerClient;
import com.cts.croplisting_service.dao.CropListingRepo;
import com.cts.croplisting_service.dao.OrderRepo;
import com.cts.croplisting_service.dto.CropListingDTO;
import com.cts.croplisting_service.dto.FarmerDTO;
import com.cts.croplisting_service.dto.OrderDTO;
import com.cts.croplisting_service.entity.CropListing;
import com.cts.croplisting_service.entity.Order;
import com.cts.croplisting_service.enums.CropListingStatus;
import com.cts.croplisting_service.enums.OrderStatus;
import com.cts.croplisting_service.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CropMarketService {

    @Autowired
    private CropListingRepo cropListingRepo;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private FarmerClient farmerClient; // For Microservice Communication

    // 1. Create a new crop listing
    public CropListingDTO createListing(CropListingDTO dto) {
        // Validation: Ensure Farmer exists in the Farmer Microservice
        try {
            farmerClient.getFarmerDetails(dto.getFarmerId());
        } catch (Exception e) {
            throw new ResourceNotFoundException("Farmer with ID " + dto.getFarmerId() + " not found in Farmer Service");
        }

        CropListing listing = new CropListing();
        listing.setFarmerId(dto.getFarmerId());
        listing.setCropType(dto.getCropType());
        listing.setQuantity(dto.getQuantity());
        listing.setPrice(dto.getPrice());
        listing.setLocation(dto.getLocation());
        listing.setStatus(CropListingStatus.PENDING);

        CropListing saved = cropListingRepo.save(listing);
        return toListingDTO(saved);
    }

    // 2. Validate a crop listing (Officer Action)
    public CropListingDTO validateListing(Long listingId) {
        CropListing listing = cropListingRepo.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with ID: " + listingId));
        listing.setStatus(CropListingStatus.VALIDATED);
        return toListingDTO(cropListingRepo.save(listing));
    }

    // 3. Place a new order
    public OrderDTO placeOrder(OrderDTO dto) {
        CropListing listing = cropListingRepo.findById(dto.getListingId())
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found"));

        if (listing.getQuantity() < dto.getQuantity()) {
            throw new RuntimeException("Not enough stock available for this listing");
        }

        // Logic for Inventory deduction can be added here or in Transaction Service

        Order order = new Order();
        order.setCropListing(listing);
        order.setTraderId(dto.getTraderId());
        order.setQuantity(dto.getQuantity());
        order.setOrderDate(dto.getOrderDate());
        order.setOrderStatus(OrderStatus.PENDING);

        Order saved = orderRepo.save(order);
        return toOrderDTO(saved);
    }

    // 4. Update order status
    public OrderDTO updateOrderStatus(Long orderId, String status) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));

        try {
            order.setOrderStatus(OrderStatus.valueOf(status.toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid Order Status provided");
        }

        return toOrderDTO(orderRepo.save(order));
    }

    // --- Query Methods ---

    public List<CropListingDTO> getListingsByStatus(CropListingStatus status) {
        return cropListingRepo.findByStatus(status)
                .stream().map(this::toListingDTO).collect(Collectors.toList());
    }

    public List<OrderDTO> getOrdersByTrader(Long traderId) {
        return orderRepo.findByTraderId(traderId)
                .stream().map(this::toOrderDTO).collect(Collectors.toList());
    }

    public List<CropListingDTO> getAllListings() {
        return cropListingRepo.findAll()
                .stream().map(this::toListingDTO).collect(Collectors.toList());
    }

    public List<OrderDTO> getAllOrders() {
        return orderRepo.findAll()
                .stream().map(this::toOrderDTO).collect(Collectors.toList());
    }

    // --- Mapping Helpers (Corrected for Microservice Logic) ---

    private CropListingDTO toListingDTO(CropListing listing) {
        CropListingDTO dto = new CropListingDTO();
        dto.setListingId(listing.getListingId());
        dto.setFarmerId(listing.getFarmerId()); // Using ID directly
        dto.setCropType(listing.getCropType());
        dto.setQuantity(listing.getQuantity());
        dto.setPrice(listing.getPrice());
        dto.setLocation(listing.getLocation());
        dto.setStatus(listing.getStatus().name());
        return dto;
    }

    private OrderDTO toOrderDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setOrderId(order.getOrderId());
        dto.setListingId(order.getCropListing().getListingId());
        dto.setTraderId(order.getTraderId());
        dto.setQuantity(order.getQuantity());
        dto.setOrderDate(order.getOrderDate());
        dto.setOrderStatus(order.getOrderStatus().name());
        return dto;
    }
}