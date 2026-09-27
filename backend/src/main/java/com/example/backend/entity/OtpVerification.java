package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "otp_verifications")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class OtpVerification {

    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    private String email;
    private String otp;
    private LocalDateTime expiredAt;
}