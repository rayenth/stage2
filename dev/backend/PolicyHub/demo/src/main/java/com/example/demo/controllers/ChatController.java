package com.example.demo.controllers;

import com.example.demo.services.LlmService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ChatController {

    private final LlmService llmService;

    // The controller gets an instance of the LlmService through dependency injection
    public ChatController(LlmService llmService) {
        this.llmService = llmService;
    }

    @PostMapping("/chat")
    // This endpoint should still be protected by your Spring Security configuration
    public String getLlmReply(@RequestBody String prompt) {
        System.out.println("Received prompt: " + prompt);

        // Pass the user's message to the service and return the response
        return llmService.getLlmResponse(prompt);
    }
}