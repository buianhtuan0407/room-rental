import React from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import styles from './Tabs.module.scss';

export default function VouchersTab() {
    const vouchers = [
        { code: 'XINCHAO2026', name: 'Ưu đãi chủ trọ mới', discount: 'Giảm 20%', usage: '45/100', status: 'active', expire: '31/12/2026' },
        { code: 'VIPGOLD50', name: 'Giảm 50k gói VIP Vàng', discount: 'Giảm 50.000đ', usage: '100/100', status: 'expired', expire: '15/09/2026' },
    ];

    return (
        <div className={styles.tabContainer}>
            <div className={styles.filterBar}>
                <button className={styles.btnPrimary}><FiPlus /> Tạo Voucher mới</button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.adminTable}>
                    <thead>
                    <tr>
                        <th>Mã Voucher</th>
                        <th>Tên chương trình</th>
                        <th>Mức giảm giá</th>
                        <th>Lượt đã dùng</th>
                        <th>Ngày hết hạn</th>
                        <th>Trạng thái</th>
                        <th style={{ textAlign: 'center' }}>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vouchers.map(v => (
                        <tr key={v.code}>
                            <td><strong className={styles.codeBadge}>{v.code}</strong></td>
                            <td>{v.name}</td>
                            <td>{v.discount}</td>
                            <td>{v.usage}</td>
                            <td>{v.expire}</td>
                            <td>
                                {v.status === 'active' ? (
                                    <span className={`${styles.badge} ${styles.badgeSuccess}`}>Đang áp dụng</span>
                                ) : (
                                    <span className={`${styles.badge} ${styles.badgeDanger}`}>Hết hạn</span>
                                )}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <button className={styles.btnSecondarySmall} style={{ marginRight: '5px' }}><FiEdit2 /></button>
                                <button className={styles.btnDangerSmall}><FiTrash2 /></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}