import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import styles from './Tabs.module.scss';

export default function BlacklistTab() {
    const blacklist = [
        { id: 1, type: 'Số điện thoại', value: '0988888888', reason: 'Spam 50 bài đăng ảo/ngày', dateAdded: '2026-08-15', operator: 'Admin Hệ Thống' },
        { id: 2, type: 'Email', value: 'scammer@gmail.com', reason: 'Lừa đảo cọc tiền phòng', dateAdded: '2026-09-20', operator: 'Quản trị viên 01' },
        { id: 3, type: 'Từ khóa cấm', value: 'cho vay tín dụng', reason: 'Từ khóa vi phạm chính sách', dateAdded: '2026-01-01', operator: 'Admin Hệ Thống' },
    ];

    return (
        <div className={styles.tabContainer}>
            <div className={styles.filterBar}>
                <button className={styles.btnDanger}><FiPlus /> Thêm vào danh sách đen</button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.adminTable}>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Loại chặn</th>
                        <th>Giá trị bị chặn</th>
                        <th>Lý do chặn</th>
                        <th>Ngày thêm</th>
                        <th>Người thực hiện</th>
                        <th style={{ textAlign: 'center' }}>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {blacklist.map((item, idx) => (
                        <tr key={item.id}>
                            <td>{idx + 1}</td>
                            <td><strong>{item.type}</strong></td>
                            <td><span className={styles.blackTag}>{item.value}</span></td>
                            <td>{item.reason}</td>
                            <td>{item.dateAdded}</td>
                            <td>{item.operator}</td>
                            <td style={{ textAlign: 'center' }}>
                                <button className={styles.btnSecondarySmall}>
                                    <FiTrash2 /> Bỏ chặn
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