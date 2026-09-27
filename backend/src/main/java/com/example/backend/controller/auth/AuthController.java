package com.example.backend.controller.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.backend.dto.req.auth.*;
import com.example.backend.dto.res.ApiResponse;
import com.example.backend.service.interfaces.auth.IAuthService;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private final IAuthService authService;

    @PostMapping("/register")
    public ApiResponse<String> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ApiResponse.<String>builder()
                .code(HttpStatus.OK.value())
                .message("Đăng ký thành công. Vui lòng kiểm tra email để lấy mã OTP.")
                .data(null)
                .build();
    }

    @PostMapping("/verify-otp")
    public ApiResponse<String> verifyOtp(@RequestBody VerifyOtpRequest request) {
        authService.verifyOtp(request);
        return ApiResponse.<String>builder()
                .code(HttpStatus.OK.value())
                .message("Xác thực tài khoản thành công.")
                .data(null)
                .build();
    }


}