package com.example.backend.service.impl.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.backend.dto.req.auth.RegisterRequest;
import com.example.backend.entity.User;
import com.example.backend.repository.auth.UserRepository;
import com.example.backend.service.interfaces.auth.IUserService;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User createUser(RegisterRequest request) {
        User newUser = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role("USER")
                .provider("EMAIL")
                .createdAt(LocalDateTime.now())
                .isVerified(false)
                .isActive(true)
                .build();

        return userRepository.save(newUser);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với email: " + email));
    }

    @Override
    public void enableUser(String email) {
        User user = getUserByEmail(email);
        user.setVerified(true);
        userRepository.save(user);
    }

    @Override
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}