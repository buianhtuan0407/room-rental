import React, { useState, useRef } from 'react';
import instance from '../../services/axios';
import styles from './ForgotPassword.module.scss';
import { FaEnvelope, FaPaperPlane, FaShieldAlt, FaArrowLeft, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const otpRefs = useRef([]);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleEmailChange = (e) => {
        const val = e.target.value;
        setEmail(val);
        const hasError = val.length > 0 && !val.includes('@');
        setEmailError(hasError);
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email.includes('@')) {
            setEmailError(true);
            setMessage('Vui lòng nhập địa chỉ email hợp lệ.');
            return;
        }

        setLoading(true);
        setMessage('');
        try {
            await instance.post('/auth/forgot-password', { email });
            setMessage('Mã OTP đã được gửi đến email của bạn.');
            setStep(2);
        } catch (error) {
            setMessage('Gửi OTP thất bại: ' + (error.response?.data?.message || 'Vui lòng thử lại.'));
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.value && index < 5) {
            otpRefs.current[index + 1].focus();
        }
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1].focus();
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        const otpCode = otp.join('');
        if (otpCode.length < 6) {
            setMessage('Vui lòng nhập đầy đủ 6 số OTP.');
            return;
        }

        setLoading(true);
        setMessage('');
        try {
            await instance.post('/auth/verify-otp', { email, otp: otpCode });
            setMessage('Xác thực OTP thành công! Vui lòng nhập mật khẩu mới.');
            setStep(3);
        } catch (error) {
            setMessage('Xác thực thất bại: ' + (error.response?.data?.message || 'Mã OTP không hợp lệ hoặc đã hết hạn.'));
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setNewPassword(val);
        setPasswordError(val.length > 0 && val.length < 6);
    };

    const handleConfirmChange = (e) => {
        const val = e.target.value;
        setConfirmPassword(val);
        setConfirmError(val.length > 0 && val !== newPassword);
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        if (newPassword.length < 6 || newPassword !== confirmPassword) {
            setMessage('Vui lòng kiểm tra lại điều kiện mật khẩu.');
            return;
        }

        setLoading(true);
        setMessage('');
        try {
            const otpCode = otp.join('');
            await instance.post('/auth/reset-password', { email, otp: otpCode, newPassword });
            setMessage('Đặt lại mật khẩu thành công! Bạn có thể đăng nhập.');
        } catch (error) {
            setMessage('Đặt lại mật khẩu thất bại: ' + (error.response?.data?.message || 'Vui lòng thử lại.'));
        } finally {
            setLoading(false);
        }
    };

    const isSuccess = message.includes('thành công') || message.includes('đã được gửi');

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>
                    {step === 1 && 'Quên Mật Khẩu'}
                    {step === 2 && 'Xác Thực Mã OTP'}
                    {step === 3 && 'Đặt Lại Mật Khẩu'}
                </h2>

                {message && (
                    <p className={`${styles.message} ${isSuccess ? styles.success : styles.error}`}>
                        {message}
                    </p>
                )}

                {step === 1 && (
                    <form onSubmit={handleEmailSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label className={emailError ? styles.errorLabel : ''}>
                                <FaEnvelope /> Nhập email đã đăng ký: {emailError && <span className={styles.requiredStar}>*</span>}
                            </label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>

                        <button type="submit" disabled={loading} className={styles.button}>
                            <FaPaperPlane /> {loading ? 'Đang gửi...' : 'Gửi Mã OTP'}
                        </button>

                        <div className={styles.backLink} onClick={() => window.location.href = '/register'}>
                            <FaArrowLeft /> Quay lại trang đăng ký
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleOtpSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <p>Mã OTP đã được gửi đến: <b>{email}</b></p>

                            <div className={styles.otpContainer}>
                                {otp.map((data, index) => (
                                    <input
                                        className={styles.otpBox}
                                        type="text"
                                        name="otp"
                                        maxLength="1"
                                        key={index}
                                        value={data}
                                        ref={(el) => (otpRefs.current[index] = el)}
                                        onChange={(e) => handleOtpChange(e.target, index)}
                                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                    />
                                ))}
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className={`${styles.button} ${styles.verifyBtn}`}>
                            <FaShieldAlt /> {loading ? 'Đang xác thực...' : 'Xác Thực OTP'}
                        </button>

                        <div className={styles.backLink} onClick={() => { setStep(1); setMessage(''); }}>
                            <FaArrowLeft /> Thay đổi email
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label className={passwordError ? styles.errorLabel : ''}>
                                <FaLock /> Mật khẩu mới: {passwordError && <span className={styles.requiredStar}>*</span>}
                            </label>
                            <div className={styles.passwordWrapper}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Tối thiểu 6 ký tự"
                                    value={newPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className={styles.eyeBtn}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={confirmError ? styles.errorLabel : ''}>
                                <FaLock /> Xác nhận mật khẩu: {confirmError && <span className={styles.requiredStar}>*</span>}
                            </label>
                            <div className={styles.passwordWrapper}>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Nhập lại mật khẩu mới"
                                    value={confirmPassword}
                                    onChange={handleConfirmChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className={styles.eyeBtn}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className={`${styles.button} ${styles.verifyBtn}`}>
                            <FaShieldAlt /> {loading ? 'Đang cập nhật...' : 'Hoàn Tất Đặt Lại Mật Khẩu'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}