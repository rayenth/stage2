package com.example.demo.controllers;

import com.example.demo.models.Claim;
import com.example.demo.repo.ClaimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ClaimController {

    @Autowired
    private ClaimRepository claimRepository;

    @GetMapping("/claims")
    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }
}