"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";


interface MenuItem {
    id: string;
    title: string;
    icon: string;
    desc: string;
    price: string;
    initLikes: number;
}


const MenuCard = ({ item }: { item: MenuItem }) => {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(item.initLikes);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        if (liked) {
            setLiked(false);
            setLikesCount(likesCount - 1);
        } else {
            setLiked(true);
            setLikesCount(likesCount + 1);
        }
    };

    return (
        <div className="col">
            <div className="card h-100 border-0 shadow-sm menu-card" id={`menu-${item.id}`}>
                <div className="card-body text-center d-flex flex-column p-4">
                    <div className="icon-wrapper mx-auto mb-3">
                        <i className={`bx ${item.icon}`}></i>
                    </div>
                    <h5 className="card-title fw-bold mb-2">{item.title}</h5>
                    <p className="card-text text-muted small flex-grow-1">{item.desc}</p>
                    <div className="menu-footer d-flex justify-content-between align-items-center border-top pt-3 mt-3">
                        <span className="price fw-bold">{item.price}</span>
                        <button
                            className={`btn-like ${liked ? 'liked' : ''}`}
                            onClick={handleLike}
                        >
                            <i className={`bx ${liked ? 'bxs-heart' : 'bx-heart'}`}></i>
                            <span className="like-count">{likesCount}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Home() {
    const [activeSection, setActiveSection] = useState("home");
    const [showPopup, setShowPopup] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    const menuData: MenuItem[] = [
        { id: "kelapa", title: "Kopi Kelapa Gula Aren", icon: "bx-drink", desc: "Espresso segar berpadu dengan air kelapa muda asli dan sedikit gula aren.", price: "Rp 22.000", initLikes: 1 },
        { id: "susu-aren", title: "Kopi Susu Gula Aren", icon: "bxs-coffee-bean", desc: "Perpaduan klasik kopi robusta, susu segar, dan gula aren.", price: "Rp 20.000", initLikes: 3 },
        { id: "americano", title: "Americano", icon: "bx-coffee-togo", desc: "Espresso murni dengan air panas.", price: "Rp 18.000", initLikes: 1 },
        { id: "cappuccino", title: "Cappuccino", icon: "bxs-coffee", desc: "Espresso dengan foam susu lembut dan taburan cocoa powder yang rich.", price: "Rp 24.000", initLikes: 1 },
        { id: "tubruk", title: "Kopi Tubruk", icon: "bx-coffee-togo", desc: "Kopi hitam tradisional yang diseduh langsung dengan bubuk kopi, kental dan nikmat.", price: "Rp 15.000", initLikes: 0 },
        { id: "vietnam-drip", title: "Vietnam Drip", icon: "bxs-coffee", desc: "Kopi robusta pekat diseduh perlahan ala Vietnam, creamy dan legit.", price: "Rp 20.000", initLikes: 0 },
        { id: "rempah", title: "Kopi Rempah Nusantara", icon: "bxs-coffee-bean", desc: "Kopi hitam diseduh dengan racikan rempah khas Nusantara: jahe, kayu manis, dan cengkeh.", price: "Rp 21.000", initLikes: 0 },
        { id: "cokelat", title: "Cokelat Susu", icon: "bxs-flame", desc: "Cokelat premium dengan susu segar, manis dan creamy, favorit yang non-kopi.", price: "Rp 21.000", initLikes: 0 },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + 120;
            const sections = ["home", "menu", "faq", "contact"];

            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const top = el.offsetTop;
                    const bottom = top + el.offsetHeight;

                    if (scrollPos >= top && scrollPos < bottom) {
                        setActiveSection(section);
                    }
                }
            }

            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = () => {
        if (window.innerWidth < 992) {
            const navbar = document.getElementById('navMenu');
            if (navbar && navbar.classList.contains('show')) {
                navbar.classList.remove('show');
            }
        }
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowPopup(true);
        e.currentTarget.reset();
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>

            <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
                <div className="container">
                    <a className="navbar-brand logo d-flex align-items-center gap-2" href="#home">
                        <i className="bx bxs-coffee"></i> Kopi Nusantara
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navMenu">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} href="#home" onClick={handleNavClick}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeSection === 'menu' ? 'active' : ''}`} href="#menu" onClick={handleNavClick}>Menu</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`} href="#faq" onClick={handleNavClick}>FAQ</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} href="#contact" onClick={handleNavClick}>Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            <section id="home" className="banner-section">
                <div className="container">
                    <div className="row align-items-center g-4 flex-column-reverse flex-lg-row">
                        <div className="col-lg-6 text-center text-lg-start">
                            <p className="subtitle text-uppercase fw-bold mb-3">Sejak 2025 • Diracik di Rumah, Disajikan dengan Hati</p>
                            <h1 className="banner-title fw-bold lh-sm mb-3">Secangkir Kehangatan Khas Nusantara</h1>
                            <p className="banner-text mb-4">Kopi Nusantara menghadirkan biji kopi pilihan dari pelosok Indonesia, diseduh langsung setiap hari.</p>
                            <a href="#menu" className="btn btn-custom">Lihat Menu</a>
                        </div>
                        <div className="col-lg-6 text-center">

                            <Image
                                src="/kopi.png"
                                alt="Ilustrasi Kopi Khas Nusantara"
                                className="img-fluid banner-img"
                                width={500}
                                height={300}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section id="menu" className="py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">Menu Kopi Favorit</h2>
                        <p className="text-muted">Pilihan menu yang paling sering dipesan pelanggan:</p>
                    </div>

                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                        {menuData.map((item) => (
                            <MenuCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </section>


            <section id="faq" className="faq">
                <div className="section-title">
                    <h2>Frequently Asked Questions</h2>
                    <p>Customer Service Kopi Nusantara</p>
                </div>

                <div className="container">
                    <div className="accordion" id="faqAccordion">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed faq-question" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                    1. Jenis kopi yang digunakan?
                                </button>
                            </h2>
                            <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    Kami menggunakan biji kopi Robusta, Arabica, serta beberapa biji kopi pilihan dari berbagai daerah di Indonesia.
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed faq-question" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                    2. Apakah ada wifi?
                                </button>
                            </h2>
                            <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    Di setiap Cafe Nusantara, kami selalu menyediakan wifi gratis yang bisa digunakan oleh setiap pengunjung.
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed faq-question" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                    3. Di mana lokasi cafe?
                                </button>
                            </h2>
                            <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    Untuk saat ini Cafe Nusantara baru tersedia di Jl. Letjen S. Parman, Tomang, Kec Grogol Petamburan, Jakarta Barat.
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed faq-question" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                                    4. Jam buka cafe?
                                </button>
                            </h2>
                            <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    Cafe buka dari pukul 09:00 - 21:00 setiap hari.
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed faq-question" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
                                    5. Apakah kafe melayani pesanan untuk acara pribadi (private event), ulang tahun, atau rapat?
                                </button>
                            </h2>
                            <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    Bisa banget, untuk info lebih lanjut bisa menghubungi nomor ini +62 85121037623.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section id="contact" className="contact">
                <div className="section-title">
                    <h2>Contact Us</h2>
                    <p>Hubungi kami untuk informasi lebih lanjut</p>
                </div>

                <div className="contact-container">
                    <div className="contact-info">
                        <h3>Kopi Nusantara</h3>
                        <p>Punya pertanyaan, saran, atau ingin melakukan reservasi? Jangan ragu untuk menghubungi kami.</p>

                        <div className="contact-detail">
                            <i className="bx bx-map"></i>
                            <div>
                                <h4>Lokasi</h4>
                                <p>Jl. Letjen S. Parman, Tomang, Jakarta Barat</p>
                            </div>
                        </div>

                        <div className="contact-detail">
                            <i className="bx bx-phone"></i>
                            <div>
                                <h4>Telepon</h4>
                                <p>+62 85121037623</p>
                            </div>
                        </div>

                        <div className="contact-detail">
                            <i className="bx bx-envelope"></i>
                            <div>
                                <h4>Email</h4>
                                <p>dimaspradana@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleFormSubmit}>
                        <input type="text" placeholder="Nama" required />
                        <input type="email" placeholder="Email" required />
                        <textarea placeholder="Tulis pesan..." required></textarea>
                        <button type="submit" className="btn">Kirim Pesan</button>
                    </form>
                </div>
            </section>


            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-content">
                        <a href="#home" className="logo">
                            <i className="bx bxs-coffee"></i> Kopi Nusantara
                        </a>
                        <p>Menghadirkan cita rasa kopi pilihan dari berbagai daerah di Indonesia.</p>
                    </div>

                    <div className="footer-content">
                        <h3>Quick Links</h3>
                        <a href="#home">Home</a>
                        <a href="#menu">Menu</a>
                        <a href="#faq">FAQ</a>
                        <a href="#contact">Contact</a>
                    </div>

                    <div className="footer-content">
                        <h3>Follow Us</h3>
                        <div className="social-icons">
                            <a href="#"><i className="bx bxl-instagram"></i></a>
                            <a href="#"><i className="bx bxl-facebook"></i></a>
                            <a href="#"><i className="bx bxl-whatsapp"></i></a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 Kopi Nusantara. All Rights Reserved.</p>
                </div>
            </footer>


            <div className={`success-overlay ${showPopup ? 'show' : ''}`}>
                <div className="success-popup">
                    <div className="success-icon">
                        <i className="bx bx-check"></i>
                    </div>
                    <h3>Pesan Berhasil Dikirim!</h3>
                    <p>Terima kasih sudah menghubungi Kopi Nusantara. Pesan kamu sudah kami terima.</p>
                    <button type="button" className="btn" onClick={() => setShowPopup(false)}>Oke</button>
                </div>
            </div>


            <a href="https://wa.me/628345236778" target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Chat WhatsApp">
                <i className="bx bxl-whatsapp"></i>
            </a>


            <button
                className={`back-to-top ${showBackToTop ? 'show' : ''}`}
                aria-label="Kembali ke atas"
                onClick={scrollToTop}
            >
                <i className="bx bx-up-arrow-alt"></i>
            </button>
        </>
    );
}