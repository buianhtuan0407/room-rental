import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FiHome,
    FiBookmark,
    FiUser,
    FiLogOut,
    FiPlusCircle,
    FiLogIn
} from 'react-icons/fi';
import styles from './Header.module.scss';

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

export default function Header() {
    const [activeTab, setActiveTab] = useState('all');
    const [savedCount, setSavedCount] = useState(2);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const loadUser = () => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('accessToken');
        let parsedUser = null;

        if (storedUser) {
            try {
                parsedUser = JSON.parse(storedUser);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }

        if (token) {
            const decoded = parseJwt(token);
            if (decoded) {
                parsedUser = {
                    ...parsedUser,
                    username: decoded.username || parsedUser?.username || decoded.sub,
                    email: decoded.sub || parsedUser?.email,
                    role: decoded.role || parsedUser?.role
                };
            }
        }

        setUser(parsedUser);
    };

    useEffect(() => {
        loadUser();

        window.addEventListener('authChange', loadUser);
        window.addEventListener('storage', loadUser);

        return () => {
            window.removeEventListener('authChange', loadUser);
            window.removeEventListener('storage', loadUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setUser(null);
        window.dispatchEvent(new Event('authChange'));
        navigate('/login');
    };

    const navItems = [
        { id: 'all', label: 'Tất Cả' },
        { id: 'rental', label: 'Cho Thuê Trọ' },
        { id: 'share', label: 'Ở Ghép' },
        { id: 'apartment', label: 'Căn Hộ' },
    ];

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo} onClick={() => navigate('/')}>
                    <div className={styles.logoIcon}>
                        <FiHome size={22} />
                    </div>
                    <div className={styles.logoText}>
                        <span className={styles.brandName}>Tro Nhanh</span>
                        <span className={styles.tagline}>THUÊ TRỌ AN TÂM</span>
                    </div>
                </div>

                <nav className={styles.nav}>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className={`${styles.navLink} ${
                                activeTab === item.id ? styles.active : ''
                            }`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className={styles.actions}>
                    <button className={styles.savedBtn} aria-label="Phòng đã lưu">
                        <FiBookmark size={20} />
                        {savedCount > 0 && (
                            <span className={styles.badge}>{savedCount}</span>
                        )}
                    </button>

                    {user ? (
                        <div className={styles.userProfile}>
                            <div className={styles.userInfo}>
                                <FiUser className={styles.userIcon} size={18} />
                                <span className={styles.userName}>
                                    {user.username || user.name || user.email}
                                </span>
                            </div>

                            <button onClick={handleLogout} className={styles.logoutBtn} title="Đăng xuất">
                                <FiLogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className={styles.loginBtn}>
                            <FiLogIn style={{ marginRight: '6px' }} /> Đăng nhập
                        </Link>
                    )}

                    <button className={styles.postBtn}>
                        <FiPlusCircle size={18} style={{ marginRight: '6px' }} />
                        <span>Đăng Tin Ngay</span>
                    </button>
                </div>
            </div>
        </header>
    );
}