package com.cts.croplisting_service.controller;

import com.cts.croplisting_service.dto.CropListingDTO;
import com.cts.croplisting_service.dto.OrderDTO;
import com.cts.croplisting_service.enums.CropListingStatus;
import com.cts.croplisting_service.service.CropMarketService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/market")
public class CropMarketController {

    @Autowired
    private CropMarketService cropMarketService;

    @GetMapping("/test-proxy")
    public void checkProxy() {
        System.out.println("The class is: " + cropMarketService.getClass().getName());
    }


    @PostMapping("/createlisting")
    public ResponseEntity<CropListingDTO> createListing(@Valid @RequestBody CropListingDTO listingDto) {
        return ResponseEntity.ok(cropMarketService.createListing(listingDto));
    }


    @PutMapping("/listings/validate/{id}")
    public ResponseEntity<CropListingDTO> validateListing(@PathVariable Long id) {
        return ResponseEntity.ok(cropMarketService.validateListing(id));
    }


    @GetMapping("/listings/status/{status}")
    public ResponseEntity<List<CropListingDTO>> getListingsByStatus(@PathVariable CropListingStatus status) {
        return ResponseEntity.ok(cropMarketService.getListingsByStatus(status));
    }


    @PostMapping("/placeorder")
    public ResponseEntity<OrderDTO> placeOrder(@Valid @RequestBody OrderDTO orderDto) {
        return ResponseEntity.ok(cropMarketService.placeOrder(orderDto));
    }


    @PutMapping("/orders/{id}/status")
    public ResponseEntity<OrderDTO> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(cropMarketService.updateOrderStatus(id, status));
    }


    @PreAuthorize("#id == authentication.principal.id or hasRole('ADMIN')")
    @GetMapping("/orders/trader/{traderId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByTrader(@PathVariable Long traderId) {
        return ResponseEntity.ok(cropMarketService.getOrdersByTrader(traderId));
    }


    @GetMapping("/listings")
    public ResponseEntity<List<CropListingDTO>> getAllListings() {
        return ResponseEntity.ok(cropMarketService.getAllListings());
    }


    @GetMapping("/orders")
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        return ResponseEntity.ok(cropMarketService.getAllOrders());
    }
}
