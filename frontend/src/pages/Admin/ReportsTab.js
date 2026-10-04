import React from 'react';
import { FiCheck, FiTrash2 } from 'react-icons/fi';
import styles from './Tabs.module.scss';

export default function ReportsTab() {
    const reports = [
        { id: 'BC-401', reporter: 'Nguyễn Thị E', target: 'Bài đăng #BD-1090', reason: 'Thông tin ảo & Sai giá thực tế', date: '2026-09-30', status: 'pending' },
        { id: 'BC-400', reporter: 'Trần Văn F', target: 'Người dùng #ND-03', reason: 'Lừa đảo tiền đặt cọc giữ phòng', date: '2026-09-28', status: 'resolved' },
    ];

    return (
        <div className={styles.tabContainer}>
            <div className={styles.filterBar}>
                <div className={styles.filterGroup}>
                    <select>
                        <option value="">Tất cả loại vi phạm</option>
                        <option value="fake">Thông tin giả / Sai giá</option>
                        <option value="fraud">Lừa đảo tiền cọc</option>
                        <option value="spam">Nội dung rác (Spam)</option>
                    </select>
                    <select>
                        <option value="">Trạng thái xử lý</option>
                        <option value="pending">Chưa xử lý</option>
                        <option value="resolved">Đã xử lý</option>
                    </select>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.adminTable}>
                    <thead>
                    <tr>
                        <th>Mã báo cáo</th>
                        <th>Người báo cáo</th>
                        <th>Đối tượng vi phạm</th>
                        <th>Lý do vi phạm</th>
                        <th>Ngày báo cáo</th>
                        <th>Trạng thái</th>
                        <th style={{ textAlign: 'center' }}>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reports.map(rp => (
                        <tr key={rp.id}>
                            <td><strong>{rp.id}</strong></td>
                            <td>{rp.reporter}</td>
                            <td><span style={{ color: '#3c8dbc', fontWeight: 'bold' }}>{rp.target}</span></td>
                            <td>{rp.reason}</td>
                            <td>{rp.date}</td>
                            <td>
                                {rp.status === 'pending' ? (
                                    <span className={`${styles.badge} ${styles.badgeDanger}`}>Chưa xử lý</span>
                                ) : (
                                    <span className={`${styles.badge} ${styles.badgeSuccess}`}>Đã xử lý</span>
                                )}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <button className={styles.btnDangerSmall} style={{ marginRight: '5px' }}>
                                    <FiTrash2 /> Ẩn / Khóa
                                </button>
                                <button className={styles.btnSecondarySmall}>
                                    <FiCheck /> Bỏ qua
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}