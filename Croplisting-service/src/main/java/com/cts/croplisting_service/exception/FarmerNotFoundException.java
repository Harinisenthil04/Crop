package com.cts.croplisting_service.exception;

public class FarmerNotFoundException extends RuntimeException {

    public FarmerNotFoundException(Long id) {
        super("Farmer with ID " + id + " not found");
    }

    public FarmerNotFoundException(String message) {
        super(message);
    }
}