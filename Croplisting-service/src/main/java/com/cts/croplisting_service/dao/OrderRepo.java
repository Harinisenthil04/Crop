package com.cts.croplisting_service.dao;

import com.cts.croplisting_service.entity.Order;
import com.cts.croplisting_service.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {

    // Find all orders placed by a specific Trader
    List<Order> findByTraderId(Long traderId);

    // Find all orders for a specific Crop Listing
    List<Order> findByCropListing_ListingId(Long listingId);

    // Filter orders by their current status (CONFIRMED, COMPLETED, etc.)
    List<Order> findByOrderStatus(OrderStatus orderStatus);
}