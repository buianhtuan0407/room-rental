package com.example.backend.service.impl.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.backend.dto.req.auth.VerifyOtpRequest;
import com.example.backend.entity.OtpVerification;
import com.example.backend.entity.User;
import com.example.backend.repository.auth.OtpVerificationRepository;
import com.example.backend.service.impl.auth.EmailService;
import com.example.backend.service.interfaces.auth.IOtpService;
import com.example.backend.service.interfaces.auth.IUserService;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpService implements IOtpService {

    private final OtpVerificationRepository otpRepository;
    private final IUserService userService;
    private final EmailService emailService;
    @Qualifier("taskScheduler")
    private final TaskScheduler taskScheduler;

    private static final int OTP_EXPIRY_MINUTES = 5;

    @Override
    @Transactional
    public void createAndSendOtp(String email) {
        String otp = generateNumericOtp();
        otpRepository.deleteByEmail(email);
        saveOtpEntry(email, otp);
        emailService.sendOtp(email, otp);

        taskScheduler.schedule(() -> {
            cleanupUnverifiedUser(email);
        }, java.sql.Timestamp.valueOf(LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES)).toInstant());
    }

    @Override
    @Transactional
    public void verifyOtp(VerifyOtpRequest request) {
        OtpVerification otpVerification = getValidOtp(request.getEmail(), request.getOtp());

        if (otpVerification.getExpiredAt().isBefore(LocalDateTime.now())) {
            otpRepository.delete(otpVerification);
            throw new RuntimeException("Mã OTP đã hết hạn");
        }

        userService.enableUser(request.getEmail());
        otpRepository.delete(otpVerification);
    }

    private String generateNumericOtp() {
        return String.format("%06d", new Random().nextInt(999999));
    }

    private void saveOtpEntry(String email, String otp) {
        otpRepository.deleteByEmail(email);
        OtpVerification otpVerification = OtpVerification.builder()
                .email(email)
                .otp(otp)
                .expiredAt(LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES))
                .build();
        otpRepository.save(otpVerification);
    }

    private OtpVerification getValidOtp(String email, String otp) {
        return otpRepository.findByEmailAndOtp(email, otp)
                .orElseThrow(() -> new RuntimeException("Mã OTP không chính xác"));
    }

    private void cleanupUnverifiedUser(String email) {
        try {
            User user = userService.getUserByEmail(email);
            if (!user.isVerified()) {
                userService.deleteUser(user.getId());
                otpRepository.deleteByEmail(email);
            }
        } catch (Exception ignored) {
        }
    }
}