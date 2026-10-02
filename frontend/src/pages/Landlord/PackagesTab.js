import React from 'react';
import { FiCheck, FiPackage, FiZap } from 'react-icons/fi';
import styles from './Tabs.module.scss';

export default function PackagesTab() {
    return (
        <div className={styles.tabContainer}>
            <div className={styles.panelBox}>
                <div className={styles.panelHeader}>
                    <h4><FiPackage /> Gói tin đang sử dụng</h4>
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                    Gói hiện tại: <strong>Gói VIP 1 (Nổi bật)</strong> — Lượt đăng còn lại: <strong>6 / 10 tin</strong> — Ngày hết hạn: <strong>18/04/2026</strong>
                </div>
            </div>

            <div className={styles.packageGrid}>
                <div className={styles.packageCard}>
                    <div className={styles.pkgHeader}>
                        <h3>Gói Thường</h3>
                    </div>
                    <div className={styles.pkgPrice}>0 đ / tháng</div>
                    <div className={styles.pkgPriority}>Hiển thị tiêu chuẩn</div>
                    <ul className={styles.pkgFeatures}>
                        <li><FiCheck color="#00a65a" /> Đăng tối đa 3 tin</li>
                        <li><FiCheck color="#00a65a" /> Thời hạn 7 ngày / tin</li>
                        <li><FiCheck color="#00a65a" /> Hỗ trợ cơ bản</li>
                    </ul>
                    <button className={styles.btnSecondary} style={{ width: '100%', justifyContent: 'center' }}>Gói Mặc Định</button>
                </div>

                <div className={`${styles.packageCard} ${styles.goldPkg}`}>
                    <div className={styles.pkgHeader}>
                        <h3>Gói VIP 1 (Nổi Bật)</h3>
                    </div>
                    <div className={styles.pkgPrice}>150.000 đ / tháng</div>
                    <div className={styles.pkgPriority}>Ưu tiên hiển thị top danh mục</div>
                    <ul className={styles.pkgFeatures}>
                        <li><FiCheck color="#00a65a" /> Đăng tối đa 10 tin</li>
                        <li><FiCheck color="#00a65a" /> Thời hạn 30 ngày / tin</li>
                        <li><FiCheck color="#00a65a" /> Gắn nhãn Nổi Bật</li>
                    </ul>
                    <button className={styles.btnPrimary} style={{ width: '100%', justifyContent: 'center' }}><FiZap /> Mua Ngay</button>
                </div>

                <div className={`${styles.packageCard} ${styles.purplePkg}`}>
                    <div className={styles.pkgHeader}>
                        <h3>Gói VIP Pro</h3>
                    </div>
                    <div className={styles.pkgPrice}>350.000 đ / tháng</div>
                    <div className={styles.pkgPriority}>Hiển thị Trang chủ & Đẩy tin tự động</div>
                    <ul className={styles.pkgFeatures}>
                        <li><FiCheck color="#00a65a" /> Không giới hạn tin đăng</li>
                        <li><FiCheck color="#00a65a" /> Đẩy tin top 1 lần / ngày</li>
                        <li><FiCheck color="#00a65a" /> Hỗ trợ CSKH ưu tiên 24/7</li>
                    </ul>
                    <button className={styles.btnSecondary} style={{ width: '100%', justifyContent: 'center' }}>Nâng Cấp VIP Pro</button>
                </div>
            </div>
        </div>
    );
}