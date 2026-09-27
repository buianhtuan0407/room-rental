package com.example.backend.service.interfaces.auth;

import com.example.backend.dto.req.auth.RegisterRequest;
import com.example.backend.dto.res.auth.UserResponse;
import com.example.backend.entity.User;

import java.util.List;

public interface IUserService {
    User createUser(RegisterRequest request);
    User getUserByEmail(String email);
    void enableUser(String email);
    void deleteUser(String id);
}
