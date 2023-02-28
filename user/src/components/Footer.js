import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [checkScroll, setCheckScroll] = useState(false);
    window.addEventListener('scroll', () => {
        const x = Math.floor(window.pageYOffset);
        if (x > 300) {
            setCheckScroll(true);
        } else {
            setCheckScroll(false);
        }
    });

    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-12 center">
                        <h1 className="footer-hearder">Người phát triển</h1>
                        <ul className="footer-list">
                            <li>
                                <span>Nguyễn Viết Phú</span>
                            </li>
                            <li>
                                <span>Nguyễn Văn Lịch</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 center">
                        <h1 className="footer-hearder">Theo dõi theo chúng tôi</h1>
                        <ul className="footer-list">
                            <li>
                                <Link href="#">
                                    <i class="fab fa-facebook"></i>
                                    Facebook
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <i class="fab fa-instagram"></i>
                                    Instagram
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <i class="fab fa-youtube"></i>
                                    Youtube
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <i class="fab fa-linkedin-in"></i>
                                    LinkedIn
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 center">
                        <h1 className="footer-hearder">Liên hệ</h1>
                        <ul className="footer-list">
                            <li>
                                <i class="fas fa-phone-alt"></i>
                                <span className="fw-bold ps-1">Điện thoại: </span>0123456789
                            </li>
                            <li>
                                <i class="fas fa-envelope"></i>
                                <span className="fw-bold ps-1">Email: </span>balostore.owner@gmail.com
                            </li>
                            <li>
                                <i class="fas fa-map-marker-alt"></i>
                                <span className="fw-bold ps-1">Địa chỉ: </span>
                                566/191 - Nguyễn Thái Sơn - Phường 5 - Gò Vấp - TP.HCM
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 center">
                        <h1 className="footer-hearder">Chăm sóc khách hàng</h1>
                        <ul className="footer-list">
                            <li>
                                <Link href="#">Trung tâm trợ giúp</Link>
                            </li>
                            <li>
                                <Link href="#">Hướng dẫn khách hàng</Link>
                            </li>
                            <li>
                                <Link href="#">Vận chuyển</Link>
                            </li>
                            <li>
                                <Link href="#">Chính Sách Bảo Hành</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer__contact" style={checkScroll ? {} : { display: 'none' }}>
                <div style={{ cursor: 'pointer' }} title="0123456789">
                    <li class="footer__contact-item">
                        <Link
                            target="_blank"
                            href="0123456789"
                            rel="noopener noreferrer"
                            class="footer__contact-link footer__icon-phone"
                        >
                            <i class="fas fa-phone"></i>
                        </Link>
                    </li>
                    <div class="icon__footer-fix"></div>
                </div>
                <li class="footer__contact-item" title="Zalo">
                    <Link href="#" rel="noopener noreferrer" class="footer__contact-link footer__icon-zl">
                        Zalo
                    </Link>
                </li>
                <li class="footer__contact-item" title="Youtube">
                    <Link href="#" rel="noopener noreferrer" class="footer__contact-link footer__icon-yt">
                        <i class="fab fa-youtube"></i>
                    </Link>
                </li>
                <li class="footer__contact-item" title="Facebook">
                    <Link href="#" rel="noopener noreferrer" class="footer__contact-link footer__icon-fb ">
                        <i class="fab fa-facebook"></i>
                    </Link>
                </li>
            </div>
            <div class="footer__messenger" title="Hãy liên hệ với chúng tôi">
                <a href="https://m.me/balostore.owner">
                    <i class="fab fa-facebook-messenger"></i>
                </a>
            </div>
        </div>
    );
};

export default Footer;
