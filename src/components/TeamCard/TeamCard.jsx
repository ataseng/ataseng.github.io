import './TeamCard.css';
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

const TeamCard = ({ image, name, department, role, links }) => {
    return (
        <div className="team-card">
            <img src={image} alt={name} className="team-card-image" />
            <div className="team-card-content">
                <div className='team-card-text-content'>
                    <p>{name}</p>
                    <p>{department}</p>
                    <p className='team-card-role'>{role}</p>
                </div>

                <div className="team-card-links">
                    {links.map((link, index) => (
                        link.href !== "#" &&
                        <a key={index} href={link.href}>
                            <Icon
                                icon={link.icon}
                                className={link.className}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
