import React from 'react';
import './Footer.css';
import { Icon } from '@iconify/react';
import atasengDark from '../../assets/images/ataseng_dark.png';
import atasengLight from '../../assets/images/ataseng_light.png';

import universityLogo from '../../assets/images/universityLogo.png'; 
import universityLogoDark from '../../assets/images/universityLogo-darkTheme.png';
import { Link } from 'react-router-dom';

/**
 * Footer component that displays information and logos at the bottom of the page.
 * 
 * @param {Object} props - The props for the component.
 * @param {string} props.theme- The name of the theme; 'dark' or another theme name.
 * @returns {JSX.Element} - Returns the Footer component.
 */

const Footer = ({ theme }) => {

    const logoSrc = theme === 'dark' ? universityLogoDark : universityLogo;
    const atasengSrc = theme === 'dark' ? atasengDark : atasengLight;

    return (
        <footer className={`footer ${theme=== 'dark' ? 'dark-mode' : ''}`}>
            <div className="footer-content">
                <div className="footer-logos">
                    <img src={atasengSrc} alt="Ataseng Logo" className="footer-logo" />
                    <img src={logoSrc} alt="University Logo" className="footer-logo" />
                </div>
                <div className={`footer-links ${theme=== 'dark' ? 'dark-mode' : ''}`}>
                    {/* <h3>Yardımcı Linkler</h3> */}
                    <Link to="/kosullar-ve-sartlar">Koşullar ve Şartlar</Link>
                    <Link to="/gizlilik-politikasi">Gizlilik Politikası</Link>
                    <Link to="/cerez-politikasi">Çerez Politikası</Link>
                    <a href="mailto:destek@ataseng.com">destek@ataseng.com</a>
                </div>
                <div className={`footer-icons ${theme=== 'dark' ? 'dark-mode' : ''}`}>
                    <a href="https://www.instagram.com/ataseng.club/" target='_blank' rel='noreferrer'>
                        <Icon icon="mdi:instagram" className="footer-icon instagram-icon" />
                    </a>
                    <a href="https://github.com/ataseng" target='_blank' rel='noreferrer'>
                        <Icon icon="mdi:github" className="footer-icon github-icon" />
                    </a>
                    <a href="#">
                        <Icon icon="mdi:twitter" className="footer-icon twitter-icon" />
                    </a>
                    <a href="#">
                        <Icon icon="mdi:youtube" className="footer-icon youtube-icon" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
