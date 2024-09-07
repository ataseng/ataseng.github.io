/**
 * MenuItem component that represents an individual menu item, including optional submenus.
 *
 * @component
 * @param {Object} props - The props of the component.
 * @param {Object} props.item - The menu item object containing link, icon, name, and optional submenu.
 * @param {Function} [props.onClick] - Optional onClick function to handle menu clicks.
 *
 * @returns {JSX.Element} A JSX element representing the menu item.
 */ 
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const MenuItem = ({ item, onClick }) => (
  <div className="menu-item">
    <Link to={item.link} onClick={onClick}>
      <Icon icon={item.icon} className="icon" />
      <span>{item.name}</span>
    </Link>
    {item.submenu && (
      <div className="submenu">
        {item.submenu.map((subItem, index) => (
          <Link key={index} to={subItem.link} onClick={onClick}>
            {subItem.name}
          </Link>
        ))}
      </div>
    )}
  </div>
);

export default MenuItem;
