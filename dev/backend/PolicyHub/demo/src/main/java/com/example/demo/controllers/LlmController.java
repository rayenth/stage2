package com.example.demo.controllers;

import com.example.demo.services.LlmService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api")
public class LlmController {


    LlmService LlmService;

    public LlmController(LlmService llmService) {
        LlmService = llmService;
    }


    public void LlmController(LlmService LlmService) {
        this.LlmService=LlmService;
    }

    @PostMapping("/chat")
    public ResponseEntity<?> SendPrompt(String prompt){
        return LlmService.SendPrompt(prompt);
    }




}



