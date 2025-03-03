import React from 'react'
import './AboutSection.css'
import aboutSection from '../../assets/images/aboutSection.jpg'
import { Icon } from '@iconify/react/dist/iconify.js';
const AboutSection = () => {
    return (
        <>
            <div id='about-section' className="about-section">
                <div className="about-section-content">
                    <div className="about-section-image">
                        <img src={aboutSection} alt="img" />
                    </div>
                    <div className="about-section-inner-content">
                        <div className="about-section-title">
                            <h2>Bizi Daha Yakından Tanıyın</h2>
                        </div>
                        <div className="about-section-description">
                            <p>Atatürk Üniversitesi Yazılım Mühendisliği bünyesinde aktif bir kulüptür. Web programlama siber güvenlik, algoritma analizi,
                                networking ve tanıtım ekipleriyle ana yapısını oluşturan en aktif ve etkin kulüplerden biridir...</p>
                        </div>
                        <ul className="about-section-menu">
                            <li><Icon icon="material-symbols:stars" /><span>Etkinliklerimiz</span></li>
                            <li><Icon icon="material-symbols:stars" /><span>İletişim</span></li>
                            <li><Icon icon="material-symbols:stars" /><span>Ekibimiz</span></li>
                            <li><Icon icon="material-symbols:stars" /><span>Bize katılın</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutSection