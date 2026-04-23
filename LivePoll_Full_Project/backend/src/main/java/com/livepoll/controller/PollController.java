package com.livepoll.controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/polls")
public class PollController {

 @GetMapping
 public String getPolls() {
   return "Accessible to USER";
 }

 @PostMapping
 public String createPoll() {
   return "Accessible to ADMIN";
 }
}
