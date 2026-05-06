package com.cts.croplisting_service.exception;

/**
 * Thrown when a request conflicts with the current state of the resource
 * or violates unique/business constraints. HTTP Mapping: 409 CONFLICT
 */
public class UserConflictException extends RuntimeException {
    public UserConflictException(String message) {
        super(message);
    }
    public UserConflictException(String message, Throwable cause) {
        super(message, cause);
    }
}
