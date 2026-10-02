import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import styles from './Login.module.scss';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            window.atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
};

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
            const res = await loginUser({ email, password });
            const data = res.data || res;
            const token = data.accessToken || data.token;

            if (token) {
                localStorage.setItem('accessToken', token);
                if (data.refreshToken) {
                    localStorage.setItem('refreshToken', data.refreshToken);
                }

                const decodedToken = parseJwt(token);

                const userInfo = data.user || {
                    id: decodedToken?.id,
                    username: decodedToken?.username || data.username || email.split('@')[0],
                    email: decodedToken?.sub || email,
                    role: decodedToken?.role || data.role || 'USER'
                };

                localStorage.setItem('user', JSON.stringify(userInfo));

                window.dispatchEvent(new Event('authChange'));

                const userRole = userInfo.role ? userInfo.role.toUpperCase() : 'USER';

                switch (userRole) {
                    case 'ADMIN':
                        navigate('/admin');
                        break;
                    case 'LANDLORD':
                        navigate('/landlord');
                        break;
                    default:
                        navigate('/');
                        break;
                }
            } else {
                setError('Đăng nhập thất bại: Không tìm thấy Token xác thực!');
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