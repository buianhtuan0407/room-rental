import React from 'react';
import { FiDollarSign, FiCreditCard, FiDownload } from 'react-icons/fi';
import styles from './Tabs.module.scss';

export default function PaymentsTab() {
    const transactions = [
        { id: 'PAY-8821', type: 'Thanh toán Gói VIP 1 (30 ngày)', amount: '300.000 đ', method: 'VNPay', date: '2026-03-12 14:30', status: 'SUCCESS' },
        { id: 'PAY-7712', type: 'Gia hạn đăng tin bài #PT-101', amount: '150.000 đ', method: 'Momo', date: '2026-02-28 09:15', status: 'SUCCESS' },
        { id: 'PAY-6651', type: 'Nạp tiền tài khoản hệ thống', amount: '500.000 đ', method: 'Chuyển khoản NH', date: '2026-02-15 16:45', status: 'SUCCESS' },
    ];

    return (
        <div className={styles.tabContainer}>
            <div className={styles.statsGrid}>
                <div className={`${styles.statCard} ${styles.blue}`}>
                    <div className={styles.statIcon}><FiCreditCard /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.label}>Số dư tài khoản</span>
                        <span className={styles.value}>1.250.000 đ</span>
                        <span className={styles.subtext}>Tài khoản chính</span>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.gold}`}>
                    <div className={styles.statIcon}><FiDollarSign /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.label}>Chi tiêu tháng này</span>
                        <span className={styles.value}>450.000 đ</span>
                        <span className={styles.subtext}>Đã mua 2 gói dịch vụ</span>
                    </div>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.adminTable}>
                    <thead>
                    <tr>
                        <th>Mã giao dịch</th>
                        <th>Nội dung thanh toán</th>
                        <th>Số tiền</th>
                        <th>Phương thức</th>
                        <th>Thời gian</th>
                        <th>Trạng thái</th>
                        <th>Hóa đơn</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((item) => (
                        <tr key={item.id}>
                            <td><strong>{item.id}</strong></td>
                            <td>{item.type}</td>
                            <td><strong style={{ color: '#00a65a' }}>{item.amount}</strong></td>
                            <td>{item.method}</td>
                            <td>{item.date}</td>
                            <td><span className={`${styles.badge} ${styles.badgeSuccess}`}>Thành công</span></td>
                            <td>
                                <button className={styles.btnIcon} title="Tải hóa đơn"><FiDownload /></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}