import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
    FiBarChart2, FiUsers, FiFileText, FiDollarSign,
    FiAlertTriangle, FiShieldOff, FiTag, FiPackage,
    FiMenu, FiLogOut, FiHome
} from 'react-icons/fi';

import styles from './AdminLayout.module.scss';
import AnalyticsTab from "../../pages/Admin/AnalyticsTab";
import ListingsTab from "../../pages/Admin/ListingsTab";
import UsersTab from "../../pages/Admin/UsersTab";
import RevenueTab from "../../pages/Admin/RevenueTab";
import ReportsTab from "../../pages/Admin/ReportsTab";
import BlacklistTab from "../../pages/Admin/BlacklistTab";
import VouchersTab from "../../pages/Admin/VouchersTab";
import PackagesTab from "../../pages/Admin/PackagesTab";

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

export default function AdminLayout() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const activeTab = searchParams.get('tab') || 'analytics';

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const token = localStorage.getItem('accessToken');
    const decodedToken = token ? parseJwt(token) : null;

    const username = user?.username || decodedToken?.username || user?.email || decodedToken?.sub || 'Quản trị viên';

    const menuItems = [
        { id: 'analytics', label: 'Thống kê hệ thống', icon: <FiBarChart2 /> },
        { id: 'listings', label: 'Quản lý bài đăng', icon: <FiFileText /> },
        { id: 'users', label: 'Quản lý người dùng', icon: <FiUsers /> },
        { id: 'revenue', label: 'Quản lý doanh thu', icon: <FiDollarSign /> },
        { id: 'reports', label: 'Quản lý báo cáo', icon: <FiAlertTriangle /> },
        { id: 'blacklist', label: 'Danh sách đen', icon: <FiShieldOff /> },
        { id: 'vouchers', label: 'Quản lý Voucher', icon: <FiTag /> },
        { id: 'packages', label: 'Quản lý gói tin', icon: <FiPackage /> },
    ];

    const handleTabChange = (tabId) => {
        setSearchParams({ tab: tabId });
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('authChange'));
        navigate('/login');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'analytics': return <AnalyticsTab />;
            case 'listings': return <ListingsTab />;
            case 'users': return <UsersTab />;
            case 'revenue': return <RevenueTab />;
            case 'reports': return <ReportsTab />;
            case 'blacklist': return <BlacklistTab />;
            case 'vouchers': return <VouchersTab />;
            case 'packages': return <PackagesTab />;
            default: return <AnalyticsTab />;
        }
    };

    return (
        <div className={styles.adminContainer}>
            <aside className={styles.sidebar}>
                <div className={styles.logo} onClick={() => navigate('/')}>
                    <div className={styles.logoIcon}>
                        <FiHome size={22} />
                    </div>
                    <div className={styles.logoText}>
                        <span className={styles.brandName}>Tro Nhanh</span>
                        <span className={styles.tagline}>THUÊ TRỌ AN TÂM</span>
                    </div>
                </div>
                <nav className={styles.navMenu}>
                    <div className={styles.menuTitle}>DANH MỤC CHÍNH</div>
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    className={`${styles.menuItem} ${activeTab === item.id ? styles.active : ''}`}
                                    onClick={() => handleTabChange(item.id)}
                                >
                                    <span className={styles.icon}>{item.icon}</span>
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <div className={styles.mainWrapper}>
                <header className={styles.topHeader}>
                    <div className={styles.leftHeader}>
                        <button className={styles.toggleBtn}><FiMenu size={20}/></button>
                        <span className={styles.breadcrumb}>
                            Admin / {menuItems.find(m => m.id === activeTab)?.label}
                        </span>
                    </div>
                    <div className={styles.rightHeader}>
                        <span className={styles.adminName}>
                            Xin chào, {username}
                        </span>
                        <button className={styles.logoutBtn} onClick={handleLogout}>
                            <FiLogOut size={16} /> Đăng xuất
                        </button>
                    </div>
                </header>

                <main className={styles.mainContent}>
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}