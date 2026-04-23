package com.livepoll.controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

 @PostMapping("/login")
 public String login(@RequestParam String username) {
   return "dummy-jwt-token-for-" + username;
 }
}
