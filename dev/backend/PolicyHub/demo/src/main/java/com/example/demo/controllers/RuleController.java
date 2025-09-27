package com.example.demo.controllers;

import com.example.demo.models.Rule;
import com.example.demo.repo.RuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class RuleController {

    @Autowired
    private RuleRepository ruleRepository;

    @GetMapping("/rules")
    public List<Rule> getAllRules() {
        return ruleRepository.findAll();
    }
}