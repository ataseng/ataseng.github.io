// src/components/ProducerProfile.js
import { Link } from 'react-router-dom';
import './ContributorCard.css';
import { Icon } from '@iconify/react';
import maleAvatar from "../../../../assets/images/avatars/maleAvatar.png";
import femaleAvatar from "../../../../assets/images/avatars/femaleAvatar.png";

const ContributorCard = ({ name, title, department, role, imageUrl, social, gender }) => {
    return (
        <div className={`contributor-card`}>
            {
                imageUrl !== "" ? 
                <img src={imageUrl} alt={name} className="contributor-image" />
                : gender === "male" ? 
                <img src={maleAvatar} alt={name} className="contributor-image" />
                :
                <img src={femaleAvatar} alt={name} className="contributor-image" />
            }
            <div className='line'></div>
            <h3>{role}</h3>
            <p>{name}</p>
            <h3>{department}</h3>
            <h3>{title}</h3>
            <div className='contributor-social'>
                {
                    social?.map((sc, index) => (
                        <Link key={`contributor_social${index}`} to={sc.href}>
                            <Icon
                                icon={sc.icon}
                                className={sc.className}
                            />
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default ContributorCard;
