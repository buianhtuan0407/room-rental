package com.example.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.backend.entity.User;
import com.example.backend.repository.auth.UserRepository;

import java.time.LocalDateTime;

@Configuration
@RequiredArgsConstructor
public class DataConfig {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Bean
    CommandLineRunner initData() {
        return args -> {
            if (!userRepository.existsByUsername(adminUsername)) {
                User admin = User.builder()
                        .username(adminUsername)
                        .email(adminEmail)
                        .password(passwordEncoder.encode(adminPassword))
                        .role("ADMIN")
                        .createdAt(LocalDateTime.now())
                        .isVerified(true)
                        .isActive(true)
                        .provider("EMAIL")
                        .build();

                userRepository.save(admin);
            }
        };
    }
}