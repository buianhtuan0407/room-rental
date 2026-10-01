import React, { useState } from 'react';
import {
    FiSearch,
    FiHeart,
    FiMapPin,
    FiChevronRight,
    FiKey,
    FiDollarSign,
    FiMap
} from 'react-icons/fi';
import { FaGraduationCap, FaDog } from 'react-icons/fa';
import styles from './Home.module.scss';

export default function Home() {
    const [searchParams, setSearchParams] = useState({
        location: '',
        district: '',
        price: '',
        type: ''
    });

    const featuredRooms = [
        {
            id: 1,
            title: 'Phòng trọ khép kín, có ban công thoáng mát',
            price: '3.5 Tr/Tháng',
            area: '20m²',
            location: 'Quận 10, TP.HCM',
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
            badge: 'Chủ nhà uy tín'
        },
        {
            id: 2,
            title: 'Chung cư mini full nội thất gần đại học',
            price: '4.2 Tr/Tháng',
            area: '25m²',
            location: 'Quận Bình Thạnh, TP.HCM',
            image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
            badge: 'Xác thực'
        },
        {
            id: 3,
            title: 'Phòng ở ghép cao cấp, đầy đủ tiện nghi',
            price: '1.8 Tr/Tháng',
            area: '30m²',
            location: 'Quận 3, TP.HCM',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
            badge: 'Hot'
        },
        {
            id: 4,
            title: 'Căn hộ dịch vụ giờ giấc tự do, an ninh 24/7',
            price: '5.0 Tr/Tháng',
            area: '35m²',
            location: 'Quận Tân Bình, TP.HCM',
            image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
            badge: 'Chủ nhà uy tín'
        },
        {
            id: 5,
            title: 'Phòng trọ giá rẻ cho sinh viên gần bến xe',
            price: '2.5 Tr/Tháng',
            area: '18m²',
            location: 'Quận Thủ Đức, TP.HCM',
            image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=600&q=80',
            badge: 'Mới đăng'
        },
        {
            id: 6,
            title: 'Studio hiện đại, nội thất sang trọng',
            price: '6.0 Tr/Tháng',
            area: '40m²',
            location: 'Quận 7, TP.HCM',
            image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=600&q=80',
            badge: 'Xác thực'
        }
    ];

    function handleInputChange(e) {
        const { name, value } = e.target;
        setSearchParams(prev => ({ ...prev, [name]: value }));
    }

    return (
        <main className={styles.homeContainer}>
            <section className={styles.heroSection}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>TÌM NHÀ ĐƠN GIẢN, TRỌ NHANH, GIÁ TỐT!</h1>

                    <div className={styles.searchBox}>
                        <div className={styles.searchInputGroup}>
                            <FiSearch className={styles.searchIcon} size={20} />
                            <input
                                type="text"
                                name="location"
                                placeholder="Nhập địa điểm, tên trường, khu vực..."
                                value={searchParams.location}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className={styles.searchFilters}>
                            <select name="district" value={searchParams.district} onChange={handleInputChange}>
                                <option value="">Quận / Huyện</option>
                                <option value="q10">Quận 10</option>
                                <option value="q3">Quận 3</option>
                                <option value="bt">Bình Thạnh</option>
                            </select>

                            <select name="price" value={searchParams.price} onChange={handleInputChange}>
                                <option value="">Khoảng giá</option>
                                <option value="under3">Dưới 3 triệu</option>
                                <option value="3to5">3 - 5 triệu</option>
                                <option value="above5">Trên 5 triệu</option>
                            </select>

                            <select name="type" value={searchParams.type} onChange={handleInputChange}>
                                <option value="">Loại hình</option>
                                <option value="tro">Phòng trọ</option>
                                <option value="oghep">Ở ghép</option>
                                <option value="canho">Căn hộ</option>
                            </select>

                            <button className={styles.searchBtn}>
                                <FiSearch size={18} style={{ marginRight: '6px' }} />
                                <span>Tìm kiếm</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className={styles.mainWrapper}>
                <section className={styles.quickAccess}>
                    <div className={styles.accessCard}>
                        <div className={styles.iconWrapper}>
                            <FaGraduationCap size={22} color="#2563eb" />
                        </div>
                        <span>Gần Trường Đại Học</span>
                    </div>
                    <div className={styles.accessCard}>
                        <div className={styles.iconWrapper}>
                            <FiDollarSign size={22} color="#16a34a" />
                        </div>
                        <span>Dưới 3 Triệu</span>
                    </div>
                    <div className={styles.accessCard}>
                        <div className={styles.iconWrapper}>
                            <FiKey size={22} color="#d97706" />
                        </div>
                        <span>Không Chung Chủ</span>
                    </div>
                    <div className={styles.accessCard}>
                        <div className={styles.iconWrapper}>
                            <FaDog size={22} color="#9333ea" />
                        </div>
                        <span>Cho Nuôi Thú Cưng</span>
                    </div>
                </section>

                <section className={styles.featuredSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Phòng Trọ Nổi Bật</h2>
                        <a href="#all" className={styles.viewMore}>
                            Xem tất cả <FiChevronRight />
                        </a>
                    </div>

                    <div className={styles.roomGrid}>
                        {featuredRooms.map(function(room) {
                            return (
                                <div key={room.id} className={styles.roomCard}>
                                    <div className={styles.imageBox}>
                                        <img src={room.image} alt={room.title} />
                                        <span className={styles.badge}>{room.badge}</span>
                                        <button className={styles.favoriteBtn} aria-label="Lưu phòng">
                                            <FiHeart size={18} />
                                        </button>
                                    </div>

                                    <div className={styles.roomContent}>
                                        <div className={styles.priceRow}>
                                            <span className={styles.price}>{room.price}</span>
                                            <span className={styles.area}>{room.area}</span>
                                        </div>
                                        <h3 className={styles.title}>{room.title}</h3>
                                        <p className={styles.location}>
                                            <FiMapPin style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                                            {room.location}
                                        </p>
                                        <button className={styles.detailBtn}>Xem chi tiết</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className={styles.mapSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Tìm Kiếm Theo Bản Đồ</h2>
                        <span className={styles.countBadge}>20+ phòng khả dụng</span>
                    </div>

                    <div className={styles.mapContainer}>
                        <div className={styles.mockMap}>
                            <div className={styles.mapPin} style={{ top: '40%', left: '48%' }}>
                                <span>3.5 Tr</span>
                            </div>
                            <div className={styles.mapPin} style={{ top: '55%', left: '52%' }}>
                                <span>4.2 Tr</span>
                            </div>
                            <p className={styles.mapNotice}>
                                <FiMap style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                                Bản đồ khu vực Hồ Chí Minh
                            </p>
                        </div>
                    </div>
                </section>

                <section className={styles.landlordBanner}>
                    <div className={styles.bannerText}>
                        <h2>Dành Cho Chủ Trọ</h2>
                        <p>Đăng tin miễn phí, tiếp cận hàng ngàn người thuê trọ mỗi ngày!</p>
                        <button className={styles.bannerBtn}>Đăng Tin Miễn Phí</button>
                    </div>
                </section>
            </div>
        </main>
    );
}