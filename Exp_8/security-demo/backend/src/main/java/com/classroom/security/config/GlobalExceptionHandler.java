package com.classroom.security.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * ============================================================
 *  CHAPTER 3.2 — Error Synchronization (backend side)
 * ============================================================
 *  Returns consistent JSON errors so the frontend (Axios)
 *  can handle them uniformly in the response interceptor.
 *
 *  401 → Authentication failed (no/bad token)
 *  403 → Authorization failed (@PreAuthorize blocked access)
 * ============================================================
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 401 — Not authenticated
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> handleAuthException(AuthenticationException ex) {
        log.warn("Authentication failed: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
            "status", 401,
            "error", "Unauthorized",
            "message", "Authentication required. Please login.",
            "timestamp", LocalDateTime.now().toString()
        ));
    }

    // 403 — Authenticated but not authorized
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handleAccessDenied(AccessDeniedException ex) {
        log.warn("Access denied: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of(
            "status", 403,
            "error", "Forbidden",
            "message", "You don't have permission to access this resource.",
            "timestamp", LocalDateTime.now().toString()
        ));
    }

    // Generic fallback
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGeneral(Exception ex) {
        log.error("Unexpected error: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
            "status", 500,
            "error", "Internal Server Error",
            "message", ex.getMessage(),
            "timestamp", LocalDateTime.now().toString()
        ));
    }
}
