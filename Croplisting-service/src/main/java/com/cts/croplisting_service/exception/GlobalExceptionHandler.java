package com.cts.croplisting_service.exception;

import com.cts.croplisting_service.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 1. Handle Specific Resource Not Found (e.g., Wrong Transaction ID)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException ex, WebRequest request) {
        ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                ex.getMessage(),
                request.getDescription(false)
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    // 2. Handle Database Integrity Errors (e.g., Duplicate Entries)
    @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrity(Exception ex) {
        ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                "Database Error: Ensure IDs exist and unique constraints are met.",
                ex.getLocalizedMessage()
        );
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    // 3. Handle General System Failures
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex, WebRequest request) {
        ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                "An unexpected error occurred.",
                ex.getMessage()
        );
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

//    @ExceptionHandler(UserConflictException.class)
//    public ResponseEntity<?> handleUserConflict(UserConflictException ex) {
//
//        Map<String, Object> body = new HashMap<>();
//        body.put("timestamp", LocalDateTime.now());
//        body.put("status", HttpStatus.CONFLICT.value());
//        body.put("message", ex.getMessage());
//
//        return new ResponseEntity<>(body, HttpStatus.CONFLICT);
//    }
//
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<?> handleGenericException(Exception ex) {
//
//        Map<String, Object> body = new HashMap<>();
//        body.put("timestamp", LocalDateTime.now());
//        body.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
//        body.put("message", "Something went wrong");
//
//        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//}
