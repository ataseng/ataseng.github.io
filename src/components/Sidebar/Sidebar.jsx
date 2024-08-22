import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { ThemeContext } from '../../context/ThemeContext';

// İkon importları
import homeIcon from '@iconify-icons/tabler/home';
import employeesIcon from '@iconify-icons/clarity/employee-group-solid';
import trophyIcon from '@iconify-icons/mdi/trophy';
import phoneIcon from '@iconify-icons/iconoir/phone';
import aboutIcon from '@iconify-icons/mdi/about';
import teamIcon from '@iconify-icons/ri/team-fill';
import moonIcon from '@iconify-icons/ph/moon';
import sunIcon from '@iconify-icons/ph/sun';
import menuIcon from '@iconify-icons/mdi/menu';
import xIcon from '@iconify-icons/mdi/close';


const Sidebar = () => {
  const { themeName, toggleTheme } = useContext(ThemeContext);
  const [MenuOpen, setMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMenuOpen(!MenuOpen);
  };

  return (
    <div className='container'>
      {/* Desktop Sidebar */}
      <div className={`sidebar ${themeName === 'dark' ? 'dark-mode' : ''}`}>
        <Link to="/home" onClick={MenuOpen ? toggleMobileMenu : null}>
          <Icon icon={homeIcon} className='icon' />
          <span>Anasayfa</span>
        </Link>
        <div className="menu-item">
          <Link to="/activities" onClick={MenuOpen ? toggleMobileMenu : null}>
            <Icon icon={trophyIcon} className='icon' />
            <span>Etkinlikler</span>
          </Link>
          <div className="submenu">
            <Link to="/activities/competitions" onClick={MenuOpen ? toggleMobileMenu : null}>Yarışmalar</Link>
            <Link to="/activities/trainings" onClick={MenuOpen ? toggleMobileMenu : null}>Eğitimler</Link>
            <Link to="/activities/career-days" onClick={MenuOpen ? toggleMobileMenu : null}>Kariyer Günleri</Link>
            <Link to="/activities/bootcamps" onClick={MenuOpen ? toggleMobileMenu : null}>Bootcamps</Link>
            <Link to="/activities/hackathons" onClick={MenuOpen ? toggleMobileMenu : null}>Hackathons</Link>
          </div>
        </div>
        <Link to="/about" onClick={MenuOpen ? toggleMobileMenu : null}>
          <Icon icon={aboutIcon} className='icon' />
          <span>Hakkımızda</span>
        </Link>
        <Link to="/contact" onClick={MenuOpen ? toggleMobileMenu : null}>
          <Icon icon={phoneIcon} className='icon' />
          <span>İletişim</span>
        </Link>
        <Link to="/team" onClick={MenuOpen ? toggleMobileMenu : null}>
          <Icon icon={teamIcon} className='icon' />
          <span>Ekibimiz</span>
        </Link>
        <Link to="/account-group" onClick={MenuOpen ? toggleMobileMenu : null}>
          <Icon icon={employeesIcon} className='icon' />
          <span>Yapımcılar</span>
        </Link>
        <div className="icon moon-sun" onClick={toggleTheme}>
          <Icon icon={themeName === 'dark' ? sunIcon : moonIcon} />
        </div>
      </div>

      {/* Hamburger Menu Icon */}
      <div className={`hamburger-menu-icon ${MenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
        <Icon icon={MenuOpen ? xIcon : menuIcon} style={{ fontSize: '30px', color: themeName === 'dark' ? '#fff' : '#16222C' }} />
      </div>

      {/* Hamburger Menu */}
      <div className={`hamburger-menu ${MenuOpen ? 'open' : ''} ${themeName === 'dark' ? 'dark-mode' : ''}`}>
        <div className="menu-item">
          <Link to="/home" onClick={toggleMobileMenu}>
            <Icon icon={homeIcon} className='icon' />
            <span>Anasayfa</span>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/achievements" onClick={toggleMobileMenu}>
            <Icon icon={trophyIcon} className='icon' />
            <span>Etkinlikler</span>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/about" onClick={toggleMobileMenu}>
            <Icon icon={aboutIcon} className='icon' />
            <span>Hakkımızda</span>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/contact" onClick={toggleMobileMenu}>
            <Icon icon={phoneIcon} className='icon' />
            <span>İletişim</span>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/team" onClick={toggleMobileMenu}>
            <Icon icon={teamIcon} className='icon' />
            <span>Ekibimiz</span>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/account-group" onClick={toggleMobileMenu}>
            <Icon icon={employeesIcon} className='icon' />
            <span>Yapımcılar</span>
          </Link>
        </div>
        <div className="menu-item " onClick={toggleTheme}>
          <Icon className='icon moon-sun' icon={themeName === 'dark' ? sunIcon : moonIcon} style={{ fontSize: '30px', color: themeName === 'dark' ? '#fff' : '#16222C' }} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
