import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Import icons
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
  const [darkMode, setDarkMode] = useState(false);
  const [MenuOpen, setMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMenuOpen(!MenuOpen);
  };

  return (
    <div className='container'>
      {/* Desktop Sidebar */}
      <div className={`sidebar ${darkMode ? 'dark-mode' : ''}`}>
        <Link to="/home" onClick={MenuOpen ? toggleMobileMenu : null}>
          <Icon icon={homeIcon} className='icon' />
          <span>Anasayfa</span>
        </Link>
        <div className="menu-item">
          <Link to="/achievements" onClick={MenuOpen ? toggleMobileMenu : null}>
            <Icon icon={trophyIcon} className='icon' />
            <span>Etkinlikler</span>
          </Link>
          <div className="submenu">
            <Link to="/achievements/competitions" onClick={MenuOpen ? toggleMobileMenu : null}>Yarışmalar</Link>
            <Link to="/achievements/trainings" onClick={MenuOpen ? toggleMobileMenu : null}>Eğitimler</Link>
            <Link to="/achievements/career-days" onClick={MenuOpen ? toggleMobileMenu : null}>Kariyer Günleri</Link>
            <Link to="/achievements/bootcamps" onClick={MenuOpen ? toggleMobileMenu : null}>Bootcamps</Link>
            <Link to="/achievements/hackathons" onClick={MenuOpen ? toggleMobileMenu : null}>Hackathons</Link>
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
        <div className="icon moon-sun" onClick={toggleDarkMode}>
          <Icon icon={darkMode ? moonIcon : sunIcon} />
        </div>
      </div>

      {/* Hamburger Menu Icon */}
      <div className={`hamburger-menu-icon ${MenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
        <Icon icon={MenuOpen ? xIcon : menuIcon} style={{ fontSize: '30px', color: darkMode ? '#fff' : '#16222C' }} />
      </div>

      {/* Hamburger Menu */}
      <div className={`hamburger-menu ${MenuOpen ? 'open' : ''} ${darkMode ? 'dark-mode' : ''}`}>
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
        <div className="menu-item" onClick={toggleDarkMode}>
          <Icon icon={darkMode ? sunIcon : moonIcon} style={{ fontSize: '30px', color: darkMode ? '#fff' : '#16222C' }} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
