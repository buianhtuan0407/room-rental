import React, { useEffect, useState } from 'react';
import { FiSearch, FiLock, FiUnlock, FiPlus } from 'react-icons/fi';
import styles from './Tabs.module.scss';
import { getUsers, toggleUserStatus } from '../../services/userService';

export default function UsersTab() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await getUsers();
            if (res.code === 200 || res.data) {
                setUsers(res.data || []);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Không thể tải danh sách người dùng.');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = !currentStatus;
        const actionText = newStatus ? 'MỞ KHÓA' : 'KHÓA';

        if (!window.confirm(`Bạn có chắc chắn muốn ${actionText} tài khoản này?`)) {
            return;
        }

        try {
            await toggleUserStatus(id, newStatus);
            // Cập nhật lại UI ngay lập tức
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === id ? { ...user, active: newStatus } : user
                )
            );
        } catch (err) {
            alert(err.response?.data?.message || `Thao tác ${actionText} thất bại!`);
        }
    };

    const filteredUsers = users.filter(user => {
        const username = user.username ? user.username.toLowerCase() : '';
        const email = user.email ? user.email.toLowerCase() : '';
        const phone = user.phone ? user.phone : '';
        const search = searchTerm.toLowerCase();

        const matchesSearch = username.includes(search) || email.includes(search) || phone.includes(search);
        const matchesRole = selectedRole ? user.role === selectedRole : true;

        return matchesSearch && matchesRole;
    });

    const renderRoleName = (role) => {
        switch (role) {
            case 'ADMIN':
                return 'Quản trị viên';
            case 'LANDLORD':
                return 'Chủ trọ';
            case 'USER':
            case 'TENANT':
                return 'Người thuê';
            default:
                return role;
        }
    };

    return (
        <div className={styles.tabContainer}>
            <div className={styles.filterBar}>
                <div className={styles.searchGroup}>
                    <FiSearch />
                    <input
                        type="text"
                        placeholder="Tìm theo tên, email, số điện thoại..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={styles.filterGroup}>
                    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                        <option value="">Tất cả vai trò</option>
                        <option value="LANDLORD">Chủ trọ</option>
                        <option value="USER">Người thuê</option>
                        <option value="ADMIN">Quản trị viên</option>
                    </select>
                    <button className={styles.btnPrimary}>
                        <FiPlus /> Thêm người dùng
                    </button>
                </div>
            </div>

            {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

            <div className={styles.tableWrapper}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Đang tải dữ liệu người dùng...</div>
                ) : (
                    <table className={styles.adminTable}>
                        <thead>
                        <tr>
                            <th>Mã ND</th>
                            <th>Tên đăng nhập</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Vai trò</th>
                            <th>Trạng thái</th>
                            <th style={{ textAlign: 'center' }}>Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td><strong>{user.username}</strong></td>
                                    <td>{user.email}</td>
                                    <td>{user.phone || 'Chưa cập nhật'}</td>
                                    <td>{renderRoleName(user.role)}</td>
                                    <td>
                                        {user.active ? (
                                            <span className={`${styles.badge} ${styles.badgeSuccess}`}>Hoạt động</span>
                                        ) : (
                                            <span className={`${styles.badge} ${styles.badgeDanger}`}>Đã khóa</span>
                                        )}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        {user.active ? (
                                            <button
                                                className={styles.btnDangerSmall}
                                                onClick={() => handleToggleStatus(user.id, user.active)}
                                            >
                                                <FiLock /> Khóa
                                            </button>
                                        ) : (
                                            <button
                                                className={styles.btnSuccessSmall}
                                                onClick={() => handleToggleStatus(user.id, user.active)}
                                            >
                                                <FiUnlock /> Mở khóa
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                                    Không tìm thấy người dùng phù hợp.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}