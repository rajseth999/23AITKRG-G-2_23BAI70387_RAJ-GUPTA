package com.experiment9.controller;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

// ─── Request DTOs ────────────────────────────────────────────────────────────

@Data
class LoginRequest {
    @NotBlank private String username;
    @NotBlank private String password;
}

@Data
class SignupRequest {
    @NotBlank @Size(min = 3, max = 20) private String username;
    @NotBlank @Size(max = 50) @Email   private String email;
    @NotBlank @Size(min = 6, max = 40) private String password;
    private Set<String> roles;
}

// ─── Response DTOs ───────────────────────────────────────────────────────────

@Data
class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private List<String> roles;

    public JwtResponse(String token, Long id, String username, String email, List<String> roles) {
        this.token    = token;
        this.id       = id;
        this.username = username;
        this.email    = email;
        this.roles    = roles;
    }
}

@Data
class MessageResponse {
    private String message;
    public MessageResponse(String message) { this.message = message; }
}
