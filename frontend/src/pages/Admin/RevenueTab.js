import React from 'react';
import { FiDownload, FiCalendar } from 'react-icons/fi';
import styles from './Tabs.module.scss';

export default function RevenueTab() {
    const transactions = [
        { id: 'GD-8812', user: 'Nguyễn Văn A', package: 'Gói VIP Vàng (30 ngày)', amount: '500.000đ', method: 'Chuyển khoản VNPay', time: '2026-09-30 10:15', status: 'success' },
        { id: 'GD-8811', user: 'Lê Văn C', package: 'Gói VIP Bạc (7 ngày)', amount: '140.000đ', method: 'Ví MoMo', time: '2026-09-30 09:30', status: 'success' },
        { id: 'GD-8810', user: 'Phạm Văn D', package: 'Đẩy tin tự động', amount: '50.000đ', method: 'Thẻ ATM nội địa', time: '2026-09-29 16:45', status: 'failed' },
    ];

    return (
        <div className={styles.tabContainer}>
            <div className={styles.statsRowMini}>
                <div className={styles.miniCard}>
                    <span>Tổng doanh thu năm</span>
                    <h3>425.000.000đ</h3>
                </div>
                <div className={styles.miniCard}>
                    <span>Doanh thu tháng này</span>
                    <h3>38.500.000đ</h3>
                </div>
                <div className={styles.miniCard}>
                    <span>Giao dịch thành công hôm nay</span>
                    <h3>18</h3>
                </div>
            </div>

            <div className={styles.filterBar}>
                <div className={styles.filterGroup}>
                    <div className={styles.datePicker}>
                        <FiCalendar />
                        <input type="date" />
                        <span>-</span>
                        <input type="date" />
                    </div>
                    <select>
                        <option value="">Tất cả phương thức</option>
                        <option value="vnpay">VNPay</option>
                        <option value="momo">Ví MoMo</option>
                        <option value="bank">Chuyển khoản Ngân hàng</option>
                    </select>
                </div>
                <button className={styles.btnSecondary}><FiDownload /> Xuất file CSV</button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.adminTable}>
                    <thead>
                    <tr>
                        <th>Mã giao dịch</th>
                        <th>Khách hàng</th>
                        <th>Gói dịch vụ</th>
                        <th>Số tiền</th>
                        <th>Kênh thanh toán</th>
                        <th>Thời gian</th>
                        <th>Trạng thái</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map(txn => (
                        <tr key={txn.id}>
                            <td><strong>{txn.id}</strong></td>
                            <td>{txn.user}</td>
                            <td>{txn.package}</td>
                            <td><strong style={{ color: '#00a65a' }}>{txn.amount}</strong></td>
                            <td>{txn.method}</td>
                            <td>{txn.time}</td>
                            <td>
                                {txn.status === 'success' ? (
                                    <span className={`${styles.badge} ${styles.badgeSuccess}`}>Thành công</span>
                                ) : (
                                    <span className={`${styles.badge} ${styles.badgeDanger}`}>Thất bại</span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}