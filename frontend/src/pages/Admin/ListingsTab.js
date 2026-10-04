import React, { useState } from 'react';
import { FiSearch, FiCheck, FiX, FiEye, FiFilter } from 'react-icons/fi';
import styles from './Tabs.module.scss';

export default function ListingsTab() {
    const [selectedPost, setSelectedPost] = useState(null);

    const posts = [
        { id: 'BD-1092', title: 'Căn hộ Studio đầy đủ nội thất Q10', author: 'Nguyễn Văn A', phone: '0901234567', price: '6.500.000đ/tháng', date: '2026-09-30', status: 'pending' },
        { id: 'BD-1091', title: 'Phòng trọ dịch vụ an ninh 24/7 Bình Thạnh', author: 'Trần Thị B', phone: '0912345678', price: '4.200.000đ/tháng', date: '2026-09-29', status: 'approved' },
        { id: 'BD-1090', title: 'Tìm bạn ở ghép gần đại học Bách Khoa', author: 'Lê Văn C', phone: '0987654321', price: '1.800.000đ/tháng', date: '2026-09-29', status: 'rejected' },
    ];

    return (
        <div className={styles.tabContainer}>
            <div className={styles.filterBar}>
                <div className={styles.searchGroup}>
                    <FiSearch />
                    <input type="text" placeholder="Tìm theo Mã bài, Tiêu đề, SĐT..." />
                </div>
                <div className={styles.filterGroup}>
                    <select>
                        <option value="">Tất cả trạng thái</option>
                        <option value="pending">Chờ duyệt</option>
                        <option value="approved">Đã duyệt</option>
                        <option value="rejected">Từ chối</option>
                    </select>
                    <select>
                        <option value="">Loại bất động sản</option>
                        <option value="apartment">Căn hộ / Chung cư</option>
                        <option value="room">Phòng trọ đơn</option>
                        <option value="shared">Ở ghép</option>
                    </select>
                    <button className={styles.btnSecondary}><FiFilter /> Lọc</button>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.adminTable}>
                    <thead>
                    <tr>
                        <th>Mã bài</th>
                        <th>Tiêu đề bài đăng</th>
                        <th>Người đăng</th>
                        <th>Giá thuê</th>
                        <th>Ngày đăng</th>
                        <th>Trạng thái</th>
                        <th style={{ textAlign: 'center' }}>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td><strong>{post.id}</strong></td>
                            <td>{post.title}</td>
                            <td>{post.author} ({post.phone})</td>
                            <td>{post.price}</td>
                            <td>{post.date}</td>
                            <td>
                                {post.status === 'pending' && <span className={`${styles.badge} ${styles.badgeWarning}`}>Chờ duyệt</span>}
                                {post.status === 'approved' && <span className={`${styles.badge} ${styles.badgeSuccess}`}>Đã duyệt</span>}
                                {post.status === 'rejected' && <span className={`${styles.badge} ${styles.badgeDanger}`}>Từ chối</span>}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <button className={styles.btnIcon} onClick={() => setSelectedPost(post)}>
                                    <FiEye /> Xem & Duyệt
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {selectedPost && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalBox}>
                        <div className={styles.modalHeader}>
                            <h4>Kiểm duyệt bài đăng: {selectedPost.id}</h4>
                            <button onClick={() => setSelectedPost(null)}><FiX /></button>
                        </div>
                        <div className={styles.modalBody}>
                            <p><strong>Tiêu đề:</strong> {selectedPost.title}</p>
                            <p><strong>Người đăng:</strong> {selectedPost.author} - {selectedPost.phone}</p>
                            <p><strong>Giá thuê:</strong> {selectedPost.price}</p>
                            <p><strong>Mô tả chi tiết:</strong> Phòng trọ đầy đủ tiện nghi, có máy lạnh, WC riêng, giờ giấc tự do, chỗ để xe rộng rãi...</p>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.btnDanger} onClick={() => setSelectedPost(null)}>
                                <FiX /> Từ chối
                            </button>
                            <button className={styles.btnSuccess} onClick={() => setSelectedPost(null)}>
                                <FiCheck /> Duyệt bài
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}