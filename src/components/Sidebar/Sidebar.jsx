/**
 * Sidebar component that displays a navigation menu with a theme toggle.
 *
 * @component
 * @example
 * return (
 *   <Sidebar />
 * )
 *
 * @returns {JSX.Element} A JSX element representing the Sidebar.
 */
import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Icon } from '@iconify/react';
import menuData from './menu.json';
import MenuItem from './MenuItem';
import HamburgerMenu from './HamburgerMenu';
import Footer from '../Footer/Footer';

const Sidebar = () => {
  const [themeName, setThemeName] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedThemeName = localStorage.getItem('themeName');
    if (storedThemeName) {
      setThemeName(storedThemeName);
    }
  }, []);

  useEffect(() => {
    if (themeName === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [themeName]);

  const toggleTheme = () => {
    const name = themeName === 'dark' ? '' : 'dark';
    localStorage.setItem('themeName', name);
    setThemeName(name);
  };

  const toggleMobileMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  return (
    <div>
      {/* Desktop Sidebar */}
      <div className={`sidebar ${themeName === 'dark' ? 'dark-mode' : ''}`}>
        <ul>
          {menuData.map((item, index) => (
            <li key={index}>
              <MenuItem item={item} onClick={menuOpen ? toggleMobileMenu : undefined} />
            </li>
          ))}
        </ul>
        <div className="icon moon-sun" onClick={toggleTheme}>
          <Icon icon={themeName === 'dark' ? 'ph:sun' : 'ph:moon'} />
        </div>
      </div>

      {/* Mobile Hamburger Menu Icon */}
      <div className={`hamburger-menu-icon ${menuOpen ? 'open' : ''} ${themeName === 'dark' ? 'dark-mode' : ''}`} onClick={toggleMobileMenu}>
        <Icon icon={menuOpen ? 'mdi:close' : 'mdi:menu'} />
      </div>

      <HamburgerMenu isOpen={menuOpen} toggleMenu={toggleMobileMenu} toggleTheme={toggleTheme} themeName={themeName} />
      <Footer themeName={themeName}/>
    </div>
  );
};

export default Sidebar;
