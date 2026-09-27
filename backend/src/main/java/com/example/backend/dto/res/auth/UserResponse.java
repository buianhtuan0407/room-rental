package com.example.backend.dto.res.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String id;
    private String username;
    private String email;
    private String phone;
    private String role;

    @JsonProperty("isVerified")
    private boolean isVerified;

    @JsonProperty("isActive")
    private boolean isActive;
}