import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
    FiBarChart2,
    FiFileText,
    FiDollarSign,
    FiPackage,
    FiMessageSquare,
    FiAlertTriangle,
    FiMenu,
    FiLogOut
} from 'react-icons/fi';

import styles from './LandlordLayout.module.scss';
import AnalyticsTab from "../../pages/Landlord/AnalyticsTab";
import ListingsTab from "../../pages/Landlord/ListingsTab";
import PaymentsTab from "../../pages/Landlord/PaymentsTab";
import PackagesTab from "../../pages/Landlord/PackagesTab";
import ChatTab from "../../pages/Landlord/ChatTab";
import ReportsTab from "../../pages/Landlord/ReportsTab";

export default function LandlordLayout() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const activeTab = searchParams.get('tab') || 'analytics';

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const menuItems = [
        { id: 'analytics', label: 'Thống kê hệ thống', icon: <FiBarChart2 /> },
        { id: 'listings', label: 'Quản lý tin đăng', icon: <FiFileText /> },
        { id: 'payments', label: 'Quản lý thanh toán', icon: <FiDollarSign /> },
        { id: 'packages', label: 'Quản lý gói tin', icon: <FiPackage /> },
        { id: 'chat', label: 'Trò chuyện / Chat', icon: <FiMessageSquare /> },
        { id: 'reports', label: 'Báo cáo & Phản ánh', icon: <FiAlertTriangle /> },
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
            case 'payments': return <PaymentsTab />;
            case 'packages': return <PackagesTab />;
            case 'chat': return <ChatTab />;
            case 'reports': return <ReportsTab />;
            default: return <AnalyticsTab />;
        }
    };

    return (
        <div className={styles.adminContainer}>
            <aside className={styles.sidebar}>
                <div className={styles.brand}>KÊNH CHỦ TRỌ</div>
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
                            Chủ trọ / {menuItems.find(m => m.id === activeTab)?.label}
                        </span>
                    </div>
                    <div className={styles.rightHeader}>
                        <span className={styles.adminName}>
                            Xin chào, {user?.username || user?.name || user?.email || 'Chủ trọ'}
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