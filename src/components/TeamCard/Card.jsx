import './Card.css';
import { Icon } from '@iconify/react';

/**
 * Card component represents an individual's profile with an image, logo, name, 
 * department, role, and social links.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.image - URL of the profile image.
 * @param {string} props.darkThemeLogo - URL of the logo to display in dark mode.
 * @param {string} props.lightThemeLogo - URL of the logo to display in light mode.
 * @param {string} props.name - Name of the individual.
 * @param {string} props.department - Department of the individual.
 * @param {string} props.role - Role of the individual in the team.
 * @param {Array} props.links - An array of social link objects with `href` and `icon`.
 *
 * @returns {JSX.Element} The rendered Card component.
 */

const Card = ({ image, darkThemeLogo , lightThemeLogo, name, department, role, links }) => {
    
    const isDarkMode = document.body.classList.contains('dark');
    const logoSrc = isDarkMode ? darkThemeLogo : lightThemeLogo;
        
  return(
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <img src={logoSrc} alt={name} className="card-logo"></img>
      <div className="card-content">
        <div>
            <p>{name}</p>
            <p>{department}</p>
            <p>{role}</p>
        </div>
        <div className="card-links">
          {links.map((link, index) => (
            <a key={index} href={link.href}>
              <Icon icon={link.icon} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
