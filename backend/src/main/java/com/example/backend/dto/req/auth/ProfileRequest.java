package com.example.backend.dto.req.auth;

import lombok.Data;

@Data
public class ProfileRequest {
    private String username;
    private String phone;
}
