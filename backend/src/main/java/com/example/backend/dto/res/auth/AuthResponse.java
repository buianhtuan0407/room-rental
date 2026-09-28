package com.example.backend.dto.res.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private TokenResponse tokens;
    private UserResponse userInfo;
}
