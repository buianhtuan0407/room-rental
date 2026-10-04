import React from 'react';
import { FiHome, FiEye, FiDollarSign, FiMessageSquare, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import styles from './Tabs.module.scss';

export default function AnalyticsTab() {
    return (
        <div className={styles.tabContainer}>
            <div className={styles.statsGrid}>
                <div className={`${styles.statCard} ${styles.blue}`}>
                    <div className={styles.statIcon}><FiHome /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.label}>Bài đăng của tôi</span>
                        <span className={styles.value}>12 / 15</span>
                        <span className={styles.subtext}>Còn 3 lượt đăng trong gói</span>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.green}`}>
                    <div className={styles.statIcon}><FiEye /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.label}>Lượt xem bài tin (Tháng)</span>
                        <span className={styles.value}>1.450</span>
                        <span className={styles.subtext}>+12.5% so với tháng trước</span>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.gold}`}>
                    <div className={styles.statIcon}><FiDollarSign /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.label}>Doanh thu dự kiến</span>
                        <span className={styles.value}>48.500.000 đ</span>
                        <span className={styles.subtext}>Từ 8 phòng đã có khách</span>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.purple}`}>
                    <div className={styles.statIcon}><FiMessageSquare /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.label}>Khách liên hệ hỏi thuê</span>
                        <span className={styles.value}>28</span>
                        <span className={styles.subtext}>5 tin nhắn chưa đọc</span>
                    </div>
                </div>
            </div>

            <div className={styles.rowGrid}>
                <div className={styles.panelBox} style={{ flex: 2 }}>
                    <div className={styles.panelHeader}>
                        <h4><FiTrendingUp /> Biểu đồ lượt quan tâm 7 ngày qua</h4>
                    </div>
                    <div className={styles.mockChart}>
                        <div className={styles.barGroup}><div className={styles.bar} style={{ height: '40%' }}><span>40</span></div><label>T2</label></div>
                        <div className={styles.barGroup}><div className={styles.bar} style={{ height: '65%' }}><span>65</span></div><label>T3</label></div>
                        <div className={styles.barGroup}><div className={styles.bar} style={{ height: '85%' }}><span>85</span></div><label>T4</label></div>
                        <div className={styles.barGroup}><div className={styles.bar} style={{ height: '50%' }}><span>50</span></div><label>T5</label></div>
                        <div className={styles.barGroup}><div className={styles.bar} style={{ height: '95%' }}><span>95</span></div><label>T6</label></div>
                        <div className={styles.barGroup}><div className={styles.bar} style={{ height: '70%' }}><span>70</span></div><label>T7</label></div>
                        <div className={styles.barGroup}><div className={styles.bar} style={{ height: '30%' }}><span>30</span></div><label>CN</label></div>
                    </div>
                </div>

                <div className={styles.panelBox} style={{ flex: 1 }}>
                    <div className={styles.panelHeader}>
                        <h4><FiCheckCircle /> Trạng thái phòng trọ</h4>
                    </div>
                    <table className={styles.adminTable}>
                        <thead>
                        <tr>
                            <th>Trạng thái</th>
                            <th>Số lượng</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><span className={`${styles.badge} ${styles.badgeSuccess}`}>Đã cho thuê</span></td>
                            <td><strong>8 phòng</strong></td>
                        </tr>
                        <tr>
                            <td><span className={`${styles.badge} ${styles.badgeWarning}`}>Còn trống</span></td>
                            <td><strong>4 phòng</strong></td>
                        </tr>
                        <tr>
                            <td><span className={`${styles.badge} ${styles.badgeInfo}`}>Đang sửa chữa</span></td>
                            <td><strong>1 phòng</strong></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}