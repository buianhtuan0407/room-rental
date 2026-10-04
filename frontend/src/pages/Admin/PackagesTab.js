import React from 'react';
import { FiPackage, FiEdit, FiCheck } from 'react-icons/fi';
import styles from './Tabs.module.scss';

export default function PackagesTab() {
    const packages = [
        { id: 'P1', name: 'Gói Thường', price: 'Miễn phí', priority: 'Độ ưu tiên: Thường', features: ['Đăng bài hiển thị tiêu chuẩn', 'Đẩy tin thủ công'] },
        { id: 'P2', name: 'Gói VIP Bạc', price: '20.000đ / ngày', priority: 'Độ ưu tiên: Cấp 2', features: ['Huy hiệu Bạc nổi bật', 'Tự động đẩy tin 1 lần/ngày'] },
        { id: 'P3', name: 'Gói VIP Vàng', price: '50.000đ / ngày', priority: 'Độ ưu tiên: Cao nhất', features: ['Ghim đầu trang tìm kiếm', 'Huy hiệu VIP Vàng đặc biệt', 'Tự động đẩy tin 3 lần/ngày'] },
    ];

    return (
        <div className={styles.tabContainer}>
            <div className={styles.packageGrid}>
                {packages.map(pkg => (
                    <div key={pkg.id} className={styles.packageCard}>
                        <div className={styles.pkgHeader}>
                            <FiPackage size={24} />
                            <h3>{pkg.name}</h3>
                        </div>
                        <div className={styles.pkgPrice}>{pkg.price}</div>
                        <div className={styles.pkgPriority}>{pkg.priority}</div>
                        <ul className={styles.pkgFeatures}>
                            {pkg.features.map((feat, idx) => (
                                <li key={idx}><FiCheck color="#00a65a" /> {feat}</li>
                            ))}
                        </ul>
                        <button className={styles.btnSecondaryFull}><FiEdit /> Cấu hình gói này</button>
                    </div>
                ))}
            </div>
        </div>
    );
}