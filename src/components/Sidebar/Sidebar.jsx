
import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Icon } from '@iconify/react';
import menuData from './menu.json';
import MenuItem from './MenuItem';
import HamburgerMenu from './HamburgerMenu';
import MainLayout from '../../layouts/MainLayout';
/**
 * Sidebar component that displays a navigation menu with a theme toggle.
 *
 * This component renders a sidebar with a list of menu items and an icon to toggle the theme.
 * It also handles the opening and closing of a mobile hamburger menu.
 *
 * @component
 * @example
 * return (
 *   <Sidebar />
 * )
 *
 * @returns {JSX.Element} A JSX element representing the Sidebar.
 */

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
    <MainLayout themeName={themeName}>
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
      
    </div>
    </MainLayout>
  );
};

export default Sidebar;
