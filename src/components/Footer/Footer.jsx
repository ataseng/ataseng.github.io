import React from 'react';
import './Footer.css';
import { Icon } from '@iconify/react';
import atasengLogo from '../../assets/images/atasengLogo.png'; // Dosya yolunu düzelttim
import universityLogo from '../../assets/images/universityLogo.png'; // Dosya yolunu düzelttim
import universityLogoDark from '../../assets/images/universityLogo-darkTheme.png'; // Dosya yolunu düzelttim

/**
 * Footer bileşeni, sayfanın alt kısmında bulunan bilgi ve logo kısmını render eder.
 * 
 * @param {Object} props - Bileşenin aldığı özellikler.
 * @param {string} props.themeName - Tema adını belirtir; 'dark' veya başka bir tema adı.
 * @returns {JSX.Element} - Footer bileşenini döndürür.
 */
const Footer = ({ themeName }) => {
    // Tema adını kontrol ederek uygun logo kaynağını seçer
    const logoSrc = themeName === 'dark' ? universityLogoDark : universityLogo;

    return (
        <footer className={`footer ${themeName === 'dark' ? 'dark-mode' : ''}`}>
            <div className="footer-content">
                <div className="footer-logos">
                    {/* Ataseng logosunu render eder */}
                    <img src={atasengLogo} alt="Ataseng Logo" className="footer-logo-ataseng" />
                    {/* Üniversite logosunu render eder */}
                    <img src={logoSrc} alt="University Logo" className="footer-logo-university" />
                </div>
                <div className={`footer-icons ${themeName === 'dark' ? 'dark-mode' : ''}`}>
                    {/* Sosyal medya ikonlarını render eder */}
                    <Icon icon="mdi:instagram" className="footer-icon" />
                    <Icon icon="mdi:github" className="footer-icon" />
                    <Icon icon="mdi:twitter" className="footer-icon" />
                    <Icon icon="mdi:youtube" className="footer-icon" />
                </div>
                <div className={`footer-links ${themeName === 'dark' ? 'dark-mode' : ''}`}>
                    {/* Footer üzerindeki bağlantıları render eder */}
                    <a href="/">Projemiz</a>
                    <a href="/">Ekibimiz</a>
                    <a href="/">İletişim</a>
                    <a href="mailto:ataseng2023@gmail.com">ataseng2023@gmail.com</a>
                    <a href="/">Etkinlikler</a>
                    <a href="/">Kayıt Ol</a>
                    <a href="/">Hizmetlerimiz</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
