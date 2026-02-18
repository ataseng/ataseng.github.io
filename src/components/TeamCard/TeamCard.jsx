import './TeamCard.css';
import { Icon } from '@iconify/react';
import maleAvatar from '../../assets/images/avatars/maleAvatar_180x220.png';
import femaleAvatar from '../../assets/images/avatars/femaleAvatar.png';

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
 * @param {Array} props.social - An array of social link objects with `href` and `icon`.
 *
 * @returns {JSX.Element} The rendered Card component.
 */

const TeamCard = ({ image, fullname, department, position, gender, social = [], extraClass = "" }) => {
    return (
        <div className={`team-card ${extraClass.length > 0 ? extraClass : ""}`}>
            {
                image ? 
                <img src={image} alt={fullname} className="team-card-image" /> :
                gender === "M" ? 
                    <img src={maleAvatar} alt="" className="team-card-image" /> : 
                    <img src={femaleAvatar} alt="" className="team-card-image" />
            }
            
            <div className="team-card-content">
                <div className='team-card-text-content'>
                    <p>{fullname}</p>
                    <p>{department}</p>
                    <p className='team-card-role'>{position}</p>
                </div>

                <div className="team-card-links">
                    {social?.map((sc, index) => (
                        sc.url && sc.url !== "" &&
                        <a key={index} href={sc.url}>
                            <Icon
                                icon={sc.type ==="website" ? `mdi:earth` : `mdi:${sc.type}`}
                                className={`${sc.type}-icon`}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
