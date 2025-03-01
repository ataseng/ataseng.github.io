import React from 'react';
import './Footer.css';
import { Icon } from '@iconify/react';
import atasengLogo from '../../assets/images/atasengLogo.png'; 
import universityLogo from '../../assets/images/universityLogo.png'; 
import universityLogoDark from '../../assets/images/universityLogo-darkTheme.png'; 

/**
 * Footer component that displays information and logos at the bottom of the page.
 * 
 * @param {Object} props - The props for the component.
 * @param {string} props.theme- The name of the theme; 'dark' or another theme name.
 * @returns {JSX.Element} - Returns the Footer component.
 */

const Footer = ({ theme }) => {

    const logoSrc = theme=== 'dark' ? universityLogoDark : universityLogo;

    return (
        <footer className={`footer ${theme=== 'dark' ? 'dark-mode' : ''}`}>
            <div className="footer-content">
                <div className="footer-logos">
                    
                    <img src={atasengLogo} alt="Ataseng Logo" className="footer-logo-ataseng" />
                    
                    <img src={logoSrc} alt="University Logo" className="footer-logo-university" />
                </div>
                <div className={`footer-icons ${theme=== 'dark' ? 'dark-mode' : ''}`}>
                    
                    <Icon icon="mdi:instagram" className="footer-icon" />
                    <Icon icon="mdi:github" className="footer-icon" />
                    <Icon icon="mdi:twitter" className="footer-icon" />
                    <Icon icon="mdi:youtube" className="footer-icon" />
                </div>
                {/* <div className={`footer-links ${theme=== 'dark' ? 'dark-mode' : ''}`}>
                    <a href="/">Projemiz</a>
                    <a href="/">Ekibimiz</a>
                    <a href="/">İletişim</a>
                    <a href="mailto:ataseng2023@gmail.com">ataseng2023@gmail.com</a>
                    <a href="/">Etkinlikler</a>
                    <a href="/">Kayıt Ol</a>
                    <a href="/">Hizmetlerimiz</a>
                </div> */}
            </div>
        </footer>
    );
};

export default Footer;
