package com.example.backend.service.impl.auth;

import com.example.backend.dto.req.auth.ProfileRequest;
import com.example.backend.dto.req.auth.RegisterRequest;
import com.example.backend.dto.res.auth.UserResponse;
import com.example.backend.entity.User;
import com.example.backend.repository.auth.UserRepository;
import com.example.backend.service.interfaces.auth.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Helper map từ Entity sang UserResponse DTO
    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .isVerified(user.isVerified())
                .isActive(user.isActive())
                .build();
    }

    // Helper lấy email của tài khoản đang đăng nhập từ Spring Security Context
    private String getCurrentUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @Override
    public User createUser(RegisterRequest request) {
        String roleName = (request.getRole() != null && !request.getRole().isBlank())
                ? request.getRole().toUpperCase()
                : "USER";
        User newUser = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(roleName)
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

    // 1. Lấy thông tin cá nhân của người dùng đang đăng nhập
    @Override
    public UserResponse getMyProfile() {
        String email = getCurrentUserEmail();
        User user = getUserByEmail(email);
        return mapToUserResponse(user);
    }

    // 2. Cập nhật thông tin cá nhân của người dùng đang đăng nhập
    @Override
    public UserResponse updateMyProfile(ProfileRequest request) {
        String email = getCurrentUserEmail();
        User user = getUserByEmail(email);

        if (request.getPhone() != null && !request.getPhone().isBlank()) {
            user.setPhone(request.getPhone());
        }

        User updatedUser = userRepository.save(user);
        return mapToUserResponse(updatedUser);
    }

    // 3. Khóa hoặc kích hoạt lại tài khoản người dùng
    @Override
    public void toggleUserStatus(String id, boolean isActive) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + id));
        user.setActive(isActive);
        userRepository.save(user);
    }

    // 4. Lấy thông tin chi tiết người dùng theo ID
    @Override
    public UserResponse getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + id));
        return mapToUserResponse(user);
    }

    // 5. Lấy danh sách tất cả người dùng
    @Override
    public List<UserResponse> getUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }

    // 6. Lấy danh sách người dùng bị khóa (isActive = false)
    @Override
    public List<UserResponse> getBannedUsers() {
        return userRepository.findByIsActive(false)
                .stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }
}