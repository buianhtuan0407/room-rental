import React from 'react';
import {
    FiUsers, FiFileText, FiDollarSign, FiAlertTriangle,
    FiTrendingUp, FiPhoneCall, FiMapPin, FiPieChart, FiEye, FiActivity
} from 'react-icons/fi';
import styles from './Tabs.module.scss';

export default function AnalyticsTab() {
    const topDistricts = [
        { name: 'Q. Bình Thạnh', count: 245, percent: '85%' },
        { name: 'TP. Thủ Đức', count: 198, percent: '70%' },
        { name: 'Quận 10', count: 156, percent: '55%' },
        { name: 'Quận Tân Bình', count: 120, percent: '42%' },
        { name: 'Quận 7', count: 95, percent: '32%' },
    ];

    const priceRanges = [
        { range: 'Dưới 3 triệu', percent: 35, color: '#00a65a' },
        { range: '3 - 5 triệu', percent: 45, color: '#3c8dbc' },
        { range: '5 - 8 triệu', percent: 15, color: '#f39c12' },
        { range: 'Trên 8 triệu', percent: 5, color: '#dd4b39' },
    ];

    const topListings = [
        { id: 'BD-1092', title: 'Căn hộ Studio full nội thất Q10', views: 1420, contacts: 88, package: 'VIP Vàng' },
        { id: 'BD-1088', title: 'Phòng trọ ban công rộng Bình Thạnh', views: 1150, contacts: 64, package: 'VIP Bạc' },
        { id: 'BD-1075', title: 'Ký túc xá cao cấp gần ĐH Bách Khoa', views: 980, contacts: 52, package: 'VIP Vàng' },
    ];

    return (
        <div className={styles.tabContainer}>
            <div className={styles.statsGrid}>
                <div className={`${styles.statCard} ${styles.gold}`}>
                    <div className={styles.statIcon}><FiDollarSign size={26} /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.label}>Doanh thu tháng này</span>
                        <span className={styles.value}>38.500.000 đ</span>
                        <span className={styles.subtext}>+15.2% so với tháng trước</span>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.green}`}>
                    <div className={styles.statIcon}><FiFileText size={26} /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.label}>Bài đăng hoạt động</span>
                        <span className={styles.value}>856 / 901</span>
                        <span className={styles.subtext}>45 bài chờ duyệt</span>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.blue}`}>
                    <div className={styles.statIcon}><FiPhoneCall size={26} /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.label}>Lượt click gọi/liên hệ</span>
                        <span className={styles.value}>3.420</span>
                        <span className={styles.subtext}>Trung bình 4 lượt/bài đăng</span>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.purple}`}>
                    <div className={styles.statIcon}><FiUsers size={26} /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.label}>Tài khoản người dùng</span>
                        <span className={styles.value}>1.248</span>
                        <span className={styles.subtext}>312 Chủ trọ • 936 Người thuê</span>
                    </div>
                </div>
            </div>

            <div className={styles.rowGrid}>
                <div className={styles.panelBox} style={{ flex: 2 }}>
                    <div className={styles.panelHeader}>
                        <h4><FiTrendingUp /> Doanh thu theo gói tin (7 ngày gần nhất)</h4>
                    </div>
                    <div className={styles.mockChart}>
                        <div className={styles.barGroup}><div className={styles.bar} style={{ height: '65%' }}><span>6.5tr</span></div><label>T2</label></div>
                        <div className={styles.barGroup}><div className={styles.bar} style={{ height: '42%' }}><span>4.2tr</span></div><label>T3</label></div>
                        <div className={styles.barGroup}><div className={styles.bar} style={{ height: '80%' }}><span>8.1tr</span></div><label>T4</label></div>
                        <div className={styles.barGroup}><div className={styles.bar} style={{ height: '52%' }}><span>5.3tr</span></div><label>T5</label></div>
                        <div className={styles.barGroup}><div className={styles.bar} style={{ height: '95%' }}><span>9.8tr</span></div><label>T6</label></div>
                        <div className={styles.barGroup}><div className={styles.bar} style={{ height: '70%' }}><span>7.0tr</span></div><label>T7</label></div>
                        <div className={styles.barGroup}><div className={styles.bar} style={{ height: '35%' }}><span>3.1tr</span></div><label>CN</label></div>
                    </div>
                </div>

                <div className={styles.panelBox} style={{ flex: 1 }}>
                    <div className={styles.panelHeader}>
                        <h4><FiPieChart /> Phân khúc giá thuê phòng</h4>
                    </div>
                    <div className={styles.priceDistribution}>
                        {priceRanges.map((item, idx) => (
                            <div key={idx} className={styles.priceItem}>
                                <div className={styles.priceMeta}>
                                    <span>{item.range}</span>
                                    <strong>{item.percent}%</strong>
                                </div>
                                <div className={styles.progressTrack}>
                                    <div className={styles.progressBar} style={{ width: `${item.percent}%`, backgroundColor: item.color }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.rowGrid}>
                <div className={styles.panelBox} style={{ flex: 1 }}>
                    <div className={styles.panelHeader}>
                        <h4><FiMapPin /> Top khu vực nhiều bài đăng nhất</h4>
                    </div>
                    <ul className={styles.districtList}>
                        {topDistricts.map((d, i) => (
                            <li key={i}>
                                <span className={styles.districtName}>{i + 1}. {d.name}</span>
                                <div className={styles.districtBarContainer}>
                                    <div className={styles.districtBar} style={{ width: d.percent }}></div>
                                </div>
                                <span className={styles.districtCount}>{d.count} bài</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.panelBox} style={{ flex: 1.2 }}>
                    <div className={styles.panelHeader}>
                        <h4><FiEye /> Top bài đăng tương tác cao nhất</h4>
                    </div>
                    <table className={styles.miniTable}>
                        <thead>
                        <tr>
                            <th>Mã bài</th>
                            <th>Tiêu đề</th>
                            <th>Gói</th>
                            <th>Lượt xem</th>
                            <th>Liên hệ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {topListings.map(post => (
                            <tr key={post.id}>
                                <td><strong>{post.id}</strong></td>
                                <td>{post.title}</td>
                                <td><span className={styles.tagGold}>{post.package}</span></td>
                                <td>{post.views}</td>
                                <td><strong style={{ color: '#00a65a' }}>{post.contacts}</strong></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className={styles.panelBox} style={{ flex: 0.8 }}>
                    <div className={styles.panelHeader}>
                        <h4><FiActivity /> Nhật ký hệ thống</h4>
                    </div>
                    <ul className={styles.logList}>
                        <li><strong>Chủ trọ #102</strong> đã mua gói VIP Vàng (30 ngày)</li>
                        <li><strong>Nguyễn Văn A</strong> vừa đăng bài phòng trọ #4821</li>
                        <li><strong>Admin</strong> đã duyệt 5 tin đăng mới</li>
                        <li><strong>Báo cáo:</strong> Phòng #1090 bị báo cọc ảo</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}