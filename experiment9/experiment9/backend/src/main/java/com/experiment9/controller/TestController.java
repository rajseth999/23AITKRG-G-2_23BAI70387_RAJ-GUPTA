package com.experiment9.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/public/hello")
    public String publicAccess() {
        return "Public Content - No authentication required.";
    }

    @GetMapping("/user/profile")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String userAccess() {
        return "User Content - Requires ROLE_USER, ROLE_MODERATOR, or ROLE_ADMIN.";
    }

    @GetMapping("/mod/dashboard")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public String moderatorAccess() {
        return "Moderator Dashboard - Requires ROLE_MODERATOR or ROLE_ADMIN.";
    }

    @GetMapping("/admin/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Admin Dashboard - Requires ROLE_ADMIN only.";
    }
}
