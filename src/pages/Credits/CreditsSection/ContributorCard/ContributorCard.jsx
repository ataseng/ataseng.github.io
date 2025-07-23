// src/components/ProducerProfile.js
import './ContributorCard.css';

const ContributorCard = ({ name, title, role, imageUrl, linkedin, github, hackerrank, stackoverflow}) => {
    return (
        <div className={`contributor-card`}>
            <img src={imageUrl} alt={name} className="contributor-image" />
            <div className='line'></div>
            <h3>{role}</h3>
            <p>{name}</p>
            <h3>{title}</h3>
        </div>
    );
};

export default ContributorCard;
