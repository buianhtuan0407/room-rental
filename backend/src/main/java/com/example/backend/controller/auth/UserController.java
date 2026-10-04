package com.example.backend.controller.auth;

import com.example.backend.dto.req.auth.ProfileRequest;
import com.example.backend.dto.res.ApiResponse;
import com.example.backend.dto.res.auth.UserResponse;
import com.example.backend.service.interfaces.auth.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;

    // 1. Lấy thông tin cá nhân người dùng đang đăng nhập
    @GetMapping("/profile")
    @PreAuthorize("hasAnyRole('ADMIN', 'LANDLORD', 'USER')")
    public ApiResponse<UserResponse> getMyProfile() {
        UserResponse userResponse = userService.getMyProfile();
        return ApiResponse.<UserResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Lấy thông tin cá nhân thành công.")
                .data(userResponse)
                .build();
    }

    // 2. Cập nhật thông tin cá nhân người dùng đang đăng nhập
    @PutMapping("/profile")
    @PreAuthorize("hasAnyRole('ADMIN', 'LANDLORD', 'USER')")
    public ApiResponse<UserResponse> updateMyProfile(@RequestBody ProfileRequest request) {
        UserResponse userResponse = userService.updateMyProfile(request);
        return ApiResponse.<UserResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Cập nhật thông tin cá nhân thành công.")
                .data(userResponse)
                .build();
    }

    // 3. Khóa hoặc kích hoạt lại tài khoản
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> toggleUserStatus(@PathVariable String id, @RequestParam boolean isActive) {
        userService.toggleUserStatus(id, isActive);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message(isActive ? "Kích hoạt tài khoản thành công." : "Khóa tài khoản thành công.")
                .build();
    }

    // 4. Lấy thông tin chi tiết người dùng theo ID
    @GetMapping("/{id}")
    public ApiResponse<UserResponse> getUserById(@PathVariable String id) {
        UserResponse userResponse = userService.getUserById(id);
        return ApiResponse.<UserResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Lấy thông tin người dùng thành công.")
                .data(userResponse)
                .build();
    }

    // 5. Lấy danh sách tất cả người dùng
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'LANDLORD', 'USER')")
    public ApiResponse<List<UserResponse>> getUsers() {
        List<UserResponse> users = userService.getUsers();
        return ApiResponse.<List<UserResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Lấy danh sách người dùng thành công.")
                .data(users)
                .build();
    }

    // 6. Lấy danh sách tài khoản bị khóa
    @GetMapping("/banned")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<UserResponse>> getBannedUsers() {
        List<UserResponse> bannedUsers = userService.getBannedUsers();
        return ApiResponse.<List<UserResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Lấy danh sách người dùng bị khóa thành công.")
                .data(bannedUsers)
                .build();
    }
}