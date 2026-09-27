package com.example.backend.repository.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.backend.entity.OtpVerification;

import java.util.Optional;

@Repository
public interface OtpVerificationRepository extends JpaRepository<OtpVerification, String> {
    Optional<OtpVerification> findByEmailAndOtp(String email, String otpCode);
    void deleteByEmail(String email);
}