package com.example.demo.security; // Adjust your package name

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((authorize) -> authorize
                        // Permit all requests to this specific endpoint
                        .requestMatchers("/api/contracts").permitAll()
                        .requestMatchers("/api/members").permitAll()
                        .requestMatchers("/api/claims").permitAll()
                        .requestMatchers("/api/policies").permitAll()
                        .requestMatchers("/api/companies").permitAll()
                        .requestMatchers("/api/rules").permitAll()
                        // Require authentication for any other request
                        .anyRequest().authenticated()
                )
                .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity in a stateless API
                .httpBasic(Customizer.withDefaults()); // Or disable if not needed

        return http.build();
    }
}