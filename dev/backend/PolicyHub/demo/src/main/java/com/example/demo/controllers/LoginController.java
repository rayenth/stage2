package com.example.demo.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class LoginController {

    @GetMapping("/api/login")
    public ResponseEntity<?>  login() {
        return ResponseEntity.ok(Map.of("message", "your are authenticated" ));
    }

    @GetMapping("/home")
    public ResponseEntity<?> homePage() {
        return ResponseEntity.ok(Map.of("message","you are at home page"));

    }


}
