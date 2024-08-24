/**
 * HamburgerMenu component that displays a mobile-friendly menu with a theme toggle.
 *
 * @component
 * @param {Object} props - The props of the component.
 * @param {boolean} props.isOpen - Indicates whether the mobile menu is open or not.
 * @param {Function} props.toggleMenu - Function to toggle the mobile menu open/closed.
 * @param {Function} props.toggleTheme - Function to toggle between light and dark themes.
 * @param {string} props.themeName - The current theme name, either 'dark' or 'light'.
 *
 * @returns {JSX.Element} A JSX element representing the mobile hamburger menu.
 */
import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import menuData from './menu.json';

const HamburgerMenu = ({ isOpen, toggleMenu, toggleTheme, themeName }) => {
  return (
    <div className={`hamburger-menu ${isOpen ? 'open' : ''} ${themeName === 'dark' ? 'dark-mode' : ''}`}>
      <div className="icon moon-sun" onClick={toggleTheme}>
        <Icon icon={themeName === 'dark' ? 'ph:sun' : 'ph:moon'} />
      </div>
      <ul>
        {menuData.map((item, index) => (
          <li key={index} onClick={toggleMenu}>
            <Link to={item.link}>
              <Icon icon={item.icon} className="icon" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HamburgerMenu;
