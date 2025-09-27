package com.example.demo.controllers;

import com.example.demo.models.Policy;
import com.example.demo.repo.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PolicyController {

    @Autowired
    private PolicyRepository policyRepository;

    @GetMapping("/policies")
    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }
}