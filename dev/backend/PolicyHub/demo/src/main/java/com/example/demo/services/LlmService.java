
package com.example.demo.services;


import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class LlmService {

    public LlmService() {

    }


    public ResponseEntity<?> SendPrompt(String prompt) {
        
return ResponseEntity.ok().body(prompt);
    }
}