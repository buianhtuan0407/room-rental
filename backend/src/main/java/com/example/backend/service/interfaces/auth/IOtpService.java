package com.example.backend.service.interfaces.auth;

import com.example.backend.dto.req.auth.VerifyOtpRequest;

public interface IOtpService {
    void createAndSendOtp(String email);
    void verifyOtp(VerifyOtpRequest request);
}
