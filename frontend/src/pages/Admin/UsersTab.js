import React from 'react';
import { FiSearch, FiLock, FiUnlock, FiPlus } from 'react-icons/fi';
import styles from './Tabs.module.scss';

export default function UsersTab() {
    const users = [
        { id: 'ND-01', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', phone: '0901234567', role: 'Chủ trọ', posts: 12, status: 'active' },
        { id: 'ND-02', name: 'Trần Thị B', email: 'tranthib@gmail.com', phone: '0912345678', role: 'Người thuê', posts: 0, status: 'active' },
        { id: 'ND-03', name: 'Tài Khoản Spam', email: 'spam_account@gmail.com', phone: '0988888888', role: 'Chủ trọ', posts: 2, status: 'locked' },
    ];

    return (
        <div className={styles.tabContainer}>
            <div className={styles.filterBar}>
                <div className={styles.searchGroup}>
                    <FiSearch />
                    <input type="text" placeholder="Tìm theo tên, email, số điện thoại..." />
                </div>
                <div className={styles.filterGroup}>
                    <select>
                        <option value="">Tất cả vai trò</option>
                        <option value="landlord">Chủ trọ</option>
                        <option value="tenant">Người thuê</option>
                    </select>
                    <button className={styles.btnPrimary}><FiPlus /> Thêm người dùng</button>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.adminTable}>
                    <thead>
                    <tr>
                        <th>Mã ND</th>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Vai trò</th>
                        <th>Bài đăng</th>
                        <th>Trạng thái</th>
                        <th style={{ textAlign: 'center' }}>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td><strong>{user.name}</strong></td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td>{user.posts}</td>
                            <td>
                                {user.status === 'active' ? (
                                    <span className={`${styles.badge} ${styles.badgeSuccess}`}>Hoạt động</span>
                                ) : (
                                    <span className={`${styles.badge} ${styles.badgeDanger}`}>Đã khóa</span>
                                )}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                {user.status === 'active' ? (
                                    <button className={styles.btnDangerSmall}><FiLock /> Khóa</button>
                                ) : (
                                    <button className={styles.btnSuccessSmall}><FiUnlock /> Mở khóa</button>
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