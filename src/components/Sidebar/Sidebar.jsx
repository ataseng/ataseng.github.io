
import React, { useState } from 'react';
import './Sidebar.css';
import { Icon } from '@iconify/react';
import menuData from './menu.json';
import MenuItem from './MenuItem';
import HamburgerMenu from './HamburgerMenu';
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

const Sidebar = ({setTheme,theme}) => {

  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  return (
    <div>
      {/* Desktop Sidebar */}
      <div className={`sidebar ${theme === 'dark' ? 'dark-mode' : ''}`}>
        <ul>
          {menuData.map((item, index) => (
            <li key={index}>
              <MenuItem item={item} onClick={menuOpen ? toggleMobileMenu : undefined} />
            </li>
          ))}
        </ul>
        <div className="icon moon-sun" onClick={() => setTheme(theme==='dark' ? 'light' : 'dark')}>
          <Icon icon={theme === 'dark' ? 'ph:sun' : 'ph:moon'} />
        </div>
      </div>

      {/* Mobile Hamburger Menu Icon */}
      <div className={`hamburger-menu-icon ${menuOpen ? 'open' : ''} ${theme === 'dark' ? 'dark-mode' : ''}`} onClick={toggleMobileMenu}>
        <Icon icon={menuOpen ? 'mdi:close' : 'mdi:menu'} />
      </div>

      <HamburgerMenu isOpen={menuOpen} toggleMenu={toggleMobileMenu}  theme={theme} />  
          
    </div>

  );
};

export default Sidebar;
