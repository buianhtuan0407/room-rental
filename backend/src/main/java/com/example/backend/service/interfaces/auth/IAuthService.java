package com.example.backend.service.interfaces.auth;

import com.example.backend.dto.req.auth.LoginRequest;
import com.example.backend.dto.req.auth.RegisterRequest;
import com.example.backend.dto.req.auth.VerifyOtpRequest;
import com.example.backend.dto.res.auth.TokenResponse;

public interface IAuthService {
    void register(RegisterRequest request);
    void verifyOtp(VerifyOtpRequest request);
    TokenResponse login(LoginRequest request);
}
