import React from 'react';
import styles from './Tabs.module.scss';

export default function ReportsTab() {
    const reports = [
        { id: 'BC-101', tenant: 'Lê Văn C', room: 'Phòng 102 - Q.3', content: 'Điều hòa bị hỏng không làm lạnh', priority: 'HIGH', date: '2026-03-14', status: 'PENDING' },
        { id: 'BC-102', tenant: 'Phạm Thị D', room: 'Phòng 301 - Q.10', content: 'Hệ thống Wifi tầng 3 chập chờn', priority: 'MEDIUM', date: '2026-03-10', status: 'RESOLVED' },
    ];

    return (
        <div className={styles.tabContainer}>
            <div className={styles.tableWrapper}>
                <table className={styles.adminTable}>
                    <thead>
                    <tr>
                        <th>Mã BC</th>
                        <th>Khách thuê</th>
                        <th>Vị trí phòng</th>
                        <th>Nội dung sự cố</th>
                        <th>Mức độ</th>
                        <th>Ngày gửi</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reports.map((item) => (
                        <tr key={item.id}>
                            <td><strong>{item.id}</strong></td>
                            <td>{item.tenant}</td>
                            <td>{item.room}</td>
                            <td>{item.content}</td>
                            <td>
                                {item.priority === 'HIGH' ? (
                                    <span className={`${styles.badge} ${styles.badgeDanger}`}>Khẩn cấp</span>
                                ) : (
                                    <span className={`${styles.badge} ${styles.badgeWarning}`}>Trung bình</span>
                                )}
                            </td>
                            <td>{item.date}</td>
                            <td>
                                {item.status === 'RESOLVED' ? (
                                    <span className={`${styles.badge} ${styles.badgeSuccess}`}>Đã xử lý</span>
                                ) : (
                                    <span className={`${styles.badge} ${styles.badgeWarning}`}>Chờ xử lý</span>
                                )}
                            </td>
                            <td>
                                {item.status === 'PENDING' && (
                                    <button className={styles.btnSuccessSmall}>Đánh dấu hoàn thành</button>
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