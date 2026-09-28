package com.example.backend.service.impl.auth;

import com.example.backend.dto.req.auth.LoginRequest;
import com.example.backend.dto.res.auth.TokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.backend.dto.req.auth.RegisterRequest;
import com.example.backend.dto.req.auth.VerifyOtpRequest;
import com.example.backend.entity.User;
import com.example.backend.repository.auth.UserRepository;
import com.example.backend.service.interfaces.auth.IAuthService;
import com.example.backend.service.interfaces.auth.IOtpService;
import com.example.backend.service.interfaces.auth.IUserService;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {

    private final UserRepository userRepository;
    private final IUserService userService;
    private final IOtpService otpService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Tên đăng nhập đã tồn tại!");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã được sử dụng!");
        }

        // Tạo user (isVerified = false)
        User user = userService.createUser(request);

        // Tạo và gửi mã OTP
        otpService.createAndSendOtp(user.getEmail());
    }

    @Override
    public void verifyOtp(VerifyOtpRequest request) {
        otpService.verifyOtp(request);
    }

    @Override
    public TokenResponse login(LoginRequest request) {
        User user = userService.getUserByEmail(request.getEmail());
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Mật khẩu không chính xác");
        }
        if (!user.isVerified()) {
            throw new RuntimeException("Tài khoản chưa được xác thực OTP");
        }
        String accessToken = jwtService.generateToken(user, "ACCESS");
        String refreshToken = jwtService.generateToken(user, "REFRESH");
        return TokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}