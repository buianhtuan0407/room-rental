import React, { useState, useRef } from 'react';
import { registerUser, verifyOtpData } from '../../services/authService';
import styles from './Register.module.scss';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaPaperPlane, FaShieldAlt, FaFacebook, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: ''
    });

    const [errors, setErrors] = useState({
        username: false,
        email: false,
        password: false,
        phone: false
    });

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const otpRefs = useRef([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'phone') {
            newValue = value.replace(/\D/g, '').slice(0, 11);
        }

        setFormData({ ...formData, [name]: newValue });

        let hasError = false;
        if (name === 'username') {
            hasError = newValue.length > 0 && newValue.length < 8;
        } else if (name === 'email') {
            hasError = newValue.length > 0 && !newValue.includes('@');
        } else if (name === 'phone') {
            hasError = newValue.length > 0 && newValue.length > 11;
        } else if (name === 'password') {
            hasError = newValue.length > 0 && newValue.length < 6;
        }

        setErrors({ ...errors, [name]: hasError });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        const usernameErr = formData.username.length < 8;
        const emailErr = !formData.email.includes('@');
        const phoneErr = formData.phone.length > 11 || formData.phone.length === 0;
        const passwordErr = formData.password.length < 6;

        setErrors({
            username: usernameErr,
            email: emailErr,
            phone: phoneErr,
            password: passwordErr
        });

        if (usernameErr || emailErr || phoneErr || passwordErr) {
            setMessage('Vui lòng kiểm tra lại các điều kiện trên form.');
            return;
        }

        setLoading(true);
        setMessage('');
        try {
            await registerUser(formData);
            setMessage('Đăng ký thành công! Vui lòng kiểm tra email để lấy mã OTP.');
            setStep(2);
        } catch (error) {
            setMessage('Đăng ký thất bại: ' + (error.response?.data?.message || 'Vui lòng thử lại.'));
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

    const handleVerifySubmit = async (e) => {
        e.preventDefault();
        const otpCode = otp.join('');
        if (otpCode.length < 6) {
            setMessage('Vui lòng nhập đầy đủ 6 số OTP.');
            return;
        }

        setLoading(true);
        setMessage('');
        try {
            await verifyOtpData({ email: formData.email, otp: otpCode });
            setMessage('Xác thực tài khoản thành công! Bạn có thể tiến hành đăng nhập.');
        } catch (error) {
            setMessage('Xác thực thất bại: ' + (error.response?.data?.message || 'Mã OTP không hợp lệ hoặc đã hết hạn.'));
        } finally {
            setLoading(false);
        }
    };

    const isSuccess = message.includes('thành công!');

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>
                    {step === 1 ? 'Đăng ký tài khoản' : 'Xác thực mã OTP'}
                </h2>

                {message && (
                    <p className={`${styles.message} ${isSuccess ? styles.success : styles.error}`}>
                        {message}
                    </p>
                )}

                {step === 1 ? (
                    <form onSubmit={handleRegisterSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label className={errors.username ? styles.errorLabel : ''}>
                                <FaUser /> Tên đăng nhập: {errors.username && <span className={styles.requiredStar}>*</span>}
                            </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Nhập tên đăng nhập"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={errors.email ? styles.errorLabel : ''}>
                                <FaEnvelope /> Email: {errors.email && <span className={styles.requiredStar}>*</span>}
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Nhập địa chỉ email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={errors.phone ? styles.errorLabel : ''}>
                                <FaPhone /> Số điện thoại: {errors.phone && <span className={styles.requiredStar}>*</span>}
                            </label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Nhập số điện thoại"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={errors.password ? styles.errorLabel : ''}>
                                <FaLock /> Mật khẩu: {errors.password && <span className={styles.requiredStar}>*</span>}
                            </label>
                            <div className={styles.passwordWrapper}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Nhập mật khẩu"
                                    value={formData.password}
                                    onChange={handleInputChange}
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

                        <button type="submit" disabled={loading} className={styles.button}>
                            <FaPaperPlane /> {loading ? 'Đang xử lý...' : 'Đăng ký'}
                        </button>

                        <div className={styles.divider}>
                            <span>Hoặc đăng ký với</span>
                        </div>

                        <div className={styles.socialButtons}>
                            <button type="button" className={`${styles.socialBtn} ${styles.facebook}`}>
                                <FaFacebook /> Facebook
                            </button>
                            <button type="button" className={`${styles.socialBtn} ${styles.google}`}>
                                <FaGoogle /> Google
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleVerifySubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <p>Mã OTP đã được gửi đến email: <b>{formData.email}</b></p>

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
                            <FaShieldAlt /> {loading ? 'Đang xác thực...' : 'Xác thực OTP'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}