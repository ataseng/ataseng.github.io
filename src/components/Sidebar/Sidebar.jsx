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
import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { Icon } from '@iconify/react';
import { ThemeContext } from '../../context/ThemeContext';
import menuData from './menu.json';
import MenuItem from './MenuItem';
import HamburgerMenu from './HamburgerMenu';

const Sidebar = () => {
  const { themeName, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  return (
    <div className='container'>
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

      <div className={`hamburger-menu-icon ${menuOpen ? 'open' : ''} ${themeName === 'dark' ? 'dark-mode' : ''}`} onClick={toggleMobileMenu}>
        <Icon icon={menuOpen ? 'mdi:close' : 'mdi:menu'} />
      </div>

      <HamburgerMenu isOpen={menuOpen} toggleMenu={toggleMobileMenu} toggleTheme={toggleTheme} themeName={themeName} />

    </div>
  );
};

export default Sidebar;
