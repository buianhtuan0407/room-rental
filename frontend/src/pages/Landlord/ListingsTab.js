import React, { useState } from 'react';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiEye, FiCheck, FiX } from 'react-icons/fi';
import styles from './Tabs.module.scss';

export default function ListingsTab() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [listings] = useState([
        { id: 'PT-101', title: 'Phòng trọ cao cấp Q.3 đầy đủ nội thất', price: '4.500.000 đ', area: '25m²', status: 'APPROVED', roomStatus: 'Còn trống', date: '2026-03-10' },
        { id: 'PT-102', title: 'Căn hộ Studio mới xây gần ĐH Bách Khoa', price: '6.000.000 đ', area: '35m²', status: 'PENDING', roomStatus: 'Còn trống', date: '2026-03-14' },
        { id: 'PT-103', title: 'Phòng ở ghép giá rẻ cho sinh viên Q.10', price: '2.200.000 đ', area: '20m²', status: 'APPROVED', roomStatus: 'Đã cho thuê', date: '2026-02-28' },
    ]);

    return (
        <div className={styles.tabContainer}>
            <div className={styles.filterBar}>
                <div className={styles.searchGroup}>
                    <FiSearch color="#888" />
                    <input
                        type="text"
                        placeholder="Tìm theo tiêu đề tin..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={styles.filterGroup}>
                    <select>
                        <option value="">-- Tất cả trạng thái tin --</option>
                        <option value="APPROVED">Đã duyệt</option>
                        <option value="PENDING">Chờ duyệt</option>
                    </select>
                    <button className={styles.btnPrimary} onClick={() => setShowModal(true)}>
                        <FiPlus /> Tạo tin đăng mới
                    </button>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.adminTable}>
                    <thead>
                    <tr>
                        <th>Mã tin</th>
                        <th>Tiêu đề bài đăng</th>
                        <th>Giá thuê / tháng</th>
                        <th>Diện tích</th>
                        <th>Trạng thái tin</th>
                        <th>Tình trạng phòng</th>
                        <th>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listings.filter(l => l.title.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                        <tr key={item.id}>
                            <td><strong>{item.id}</strong></td>
                            <td>{item.title}</td>
                            <td><strong style={{ color: '#00a65a' }}>{item.price}</strong></td>
                            <td>{item.area}</td>
                            <td>
                                {item.status === 'APPROVED' ? (
                                    <span className={`${styles.badge} ${styles.badgeSuccess}`}>Đã duyệt</span>
                                ) : (
                                    <span className={`${styles.badge} ${styles.badgeWarning}`}>Chờ duyệt</span>
                                )}
                            </td>
                            <td>
                                {item.roomStatus === 'Còn trống' ? (
                                    <span className={styles.tagGold}>Còn trống</span>
                                ) : (
                                    <span style={{ color: '#888' }}>Đã cho thuê</span>
                                )}
                            </td>
                            <td>
                                <button className={styles.btnIcon} title="Xem"><FiEye /></button>
                                <button className={styles.btnIcon} title="Sửa"><FiEdit /></button>
                                <button className={styles.btnDangerSmall} title="Xóa"><FiTrash2 /></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalBox}>
                        <div className={styles.modalHeader}>
                            <h4>Tạo bài đăng phòng mới</h4>
                            <button onClick={() => setShowModal(false)}><FiX /></button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.formGroup}>
                                <label>Tiêu đề bài đăng</label>
                                <input type="text" placeholder="Nhập tiêu đề tin..." />
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>Giá thuê (VNĐ)</label>
                                    <input type="number" placeholder="4500000" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Diện tích (m²)</label>
                                    <input type="number" placeholder="25" />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Địa chỉ chi tiết</label>
                                <input type="text" placeholder="Số nhà, tên đường, Phường/Xã, Quận/Huyện" />
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.btnSecondary} onClick={() => setShowModal(false)}>Hủy</button>
                            <button className={styles.btnPrimary} onClick={() => setShowModal(false)}><FiCheck /> Lưu & Đăng tin</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}