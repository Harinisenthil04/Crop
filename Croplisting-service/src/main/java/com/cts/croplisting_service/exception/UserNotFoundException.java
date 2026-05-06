package com.cts.croplisting_service.exception;

import org.springframework.http.HttpStatus;

public class UserNotFoundException extends RuntimeException {
    private final HttpStatus status;

    public UserNotFoundException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
