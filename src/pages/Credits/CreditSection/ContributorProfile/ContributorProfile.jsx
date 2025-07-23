// src/components/ProducerProfile.js
import './ContributorProfile.css';

const ContributorProfile = ({ name, role, bio, imageUrl,reverse}) => {
    return (
        <div className={`contributor-info`}>
            <div className='content'>
                <img src={imageUrl} alt={name} className="contributor-image" />
                <div className='line'></div>
                <h3>{role}</h3>
                <p>{name}</p>
            </div>
            <div className={`bio ${reverse ? 'bio-reverse' : ''}`}>
                <p>{bio}</p>
            </div>
        </div>
    );
};

export default ContributorProfile;
