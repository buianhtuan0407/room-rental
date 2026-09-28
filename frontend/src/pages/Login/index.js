import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import styles from './Login.module.scss';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await loginUser({ email, password });

            if (response && response.accessToken) {
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);
                navigate('/');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleLogin}>
                <h2>Đăng Nhập</h2>

                {error && <div className={styles.errorAlert}>{error}</div>}

                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email của bạn"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu"
                        required
                    />
                </div>

                {/* Quên mật khẩu nằm ở góc phải phía trên nút đăng nhập */}
                <div className={styles.forgotPasswordWrapper}>
                    <Link to="/forgot-password">Quên mật khẩu?</Link>
                </div>

                <button type="submit" disabled={loading} className={styles.submitBtn}>
                    {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
                </button>

                <div className={styles.divider}>
                    <span>Hoặc đăng nhập với</span>
                </div>

                <div className={styles.socialButtons}>
                    <button type="button" className={`${styles.socialBtn} ${styles.facebook}`}>
                        <FaFacebook /> Facebook
                    </button>
                    <button type="button" className={`${styles.socialBtn} ${styles.google}`}>
                        <FaGoogle /> Google
                    </button>
                </div>

                <div className={styles.extraLinks}>
                    <span>Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></span>
                </div>
            </form>
        </div>
    );
}