package com.cts.croplisting_service.client;

import com.cts.croplisting_service.dto.FarmerDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "FARMER-SERVICE") // The name registered in Eureka
public interface FarmerClient {

    @GetMapping("/api/farmers/{id}")
    FarmerDTO getFarmerDetails(@PathVariable("id") Long id);
}