
import './Footer.css';
import { Icon } from '@iconify/react';
import atasengLogo from '../../assets/images/atasengLogo.png'; 
import universityLogo from '../../assets/images/universityLogo.png'; 
import universityLogoDark from '../../assets/images/universityLogo-darkTheme.png'; 

const Footer = ({ themeName }) => {
    const logoSrc = themeName === 'dark' ? universityLogoDark : universityLogo;

    return (
        <footer className={`footer ${themeName === 'dark' ? 'dark-mode' : ''}`}>
            <div className="footer-content">
                <div className="footer-logos">
                    <img src={atasengLogo} alt="Ataseng Logo" className="footer-logo-ataseng" />
                    <img src={logoSrc} alt="University Logo" className="footer-logo-university" />
                </div>
                <div className={`footer-icons ${themeName === 'dark' ? 'dark-mode' : ''}`}>
                    <Icon icon="mdi:instagram" className="footer-icon" />
                    <Icon icon="mdi:github" className="footer-icon" />
                    <Icon icon="mdi:twitter" className="footer-icon" />
                    <Icon icon="mdi:youtube" className="footer-icon" />
                </div>
                <div className={`footer-links ${themeName === 'dark' ? 'dark-mode' : ''}`}>
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
