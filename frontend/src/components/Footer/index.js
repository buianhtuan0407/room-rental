import React, { useState } from 'react';
import styles from './Footer.module.scss';

export default function Footer() {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            alert(`Đăng ký thành công với email: ${email}`);
            setEmail('');
        }
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                <div className={styles.topGrid}>

                    <div className={styles.brandCol}>
                        <div className={styles.logo}>
                            <div className={styles.logoIcon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                            </div>
                            <div className={styles.logoText}>
                                <span className={styles.brandName}>Tro Nhanh</span>
                                <span className={styles.tagline}>THUÊ TRỌ AN TÂM</span>
                            </div>
                        </div>

                        <p className={styles.description}>
                            Nền tảng tìm kiếm phòng trọ, nhà trọ, căn hộ hàng đầu Việt Nam. Nơi kết nối giữa người cho thuê và người thuê trọ một cách an toàn và nhanh chóng.
                        </p>

                        <div className={styles.contactList}>
                            <div className={styles.contactItem}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                                <span>Hotline: <strong>1900 6789</strong> (8h - 21h)</span>
                            </div>
                            <div className={styles.contactItem}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                <span>Email: <a href="mailto:cskh@tronhanh.vn">cskh@tronhanh.vn</a></span>
                            </div>
                            <div className={styles.contactItem}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                <span>Địa chỉ: Công viên Phần mềm Quang Trung, Q.12, TP.HCM</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.linksCol}>
                        <h3 className={styles.colTitle}>Danh Mục</h3>
                        <ul className={styles.linkList}>
                            <li><a href="/cho-thue-tro">Cho Thuê Trọ</a></li>
                            <li><a href="/o-ghep">Ở Ghép Nhanh</a></li>
                            <li><a href="/can-ho-mini">Căn Hộ Mini</a></li>
                            <li><a href="/can-ho-dich-vu">Căn Hộ Dịch Vụ</a></li>
                            <li><a href="/bang-gia">Bảng Giá Dịch Vụ</a></li>
                        </ul>
                    </div>

                    <div className={styles.linksCol}>
                        <h3 className={styles.colTitle}>Khu Vực Hot</h3>
                        <ul className={styles.linkList}>
                            <li><a href="/tro-tphcm">Phòng Trọ TP.HCM</a></li>
                            <li><a href="/tro-ha-noi">Phòng Trọ Hà Nội</a></li>
                            <li><a href="/tro-da-nang">Phòng Trọ Đà Nẵng</a></li>
                            <li><a href="/tro-can-tho">Phòng Trọ Cần Thơ</a></li>
                            <li><a href="/tro-binh-duong">Phòng Trọ Bình Dương</a></li>
                        </ul>
                    </div>

                    <div className={styles.newsletterCol}>
                        <h3 className={styles.colTitle}>Đăng Ký Nhận Tin</h3>
                        <p className={styles.newsletterDesc}>
                            Nhận thông báo phòng trọ giá tốt mới nhất và ưu đãi đặc quyền qua Email.
                        </p>

                        <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
                            <input
                                type="email"
                                placeholder="Nhập email của bạn..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit">Đăng Ký</button>
                        </form>

                        <div className={styles.socialGroup}>
                            <span>Kết Nối Với Chúng Tôi</span>
                            <div className={styles.socialIcons}>
                                <a href="#facebook" aria-label="Facebook">
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                </a>
                                <a href="#youtube" aria-label="YouTube">
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                </a>
                                <a href="#instagram" aria-label="Instagram">
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={styles.bottomBar}>
                    <p>© 2026 <strong>Tro Nhanh</strong>. Tất cả quyền được bảo lưu.</p>
                    <div className={styles.legalLinks}>
                        <a href="/dieu-khoan">Điều khoản dịch vụ</a>
                        <a href="/bao-mat">Chính sách bảo mật</a>
                        <a href="/quy-che">Quy chế hoạt động</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}