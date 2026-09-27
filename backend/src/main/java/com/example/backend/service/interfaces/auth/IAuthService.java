package com.example.backend.service.interfaces.auth;

import com.example.backend.dto.req.auth.RegisterRequest;
import com.example.backend.dto.req.auth.VerifyOtpRequest;

public interface IAuthService {
    void register(RegisterRequest request);
    void verifyOtp(VerifyOtpRequest request);
}
