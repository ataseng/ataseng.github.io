// src/components/ProducerProfile.js
import React from 'react';

import './ProducerProfile.css';

const ProducerProfile = ({ name, role, bio, imageUrl,reverse}) => {
    return (
        <div className={`producer-profile ${reverse ? 'producer-profile-reverse' : ''}`}>

            <div className={`producer-info ${reverse ? 'reverse-info' : ''}`}>
                <div className='content'>
                    <img src={imageUrl} alt={name} className="producer-image" />
                    <div className='line'></div>
                    <h3>{role}</h3>
                    <p>{name}</p>
                </div>
                <div className={`bio ${reverse ? 'bio-reverse' : ''}`}>
                    <p>{bio}</p>
                </div>
            </div>
        </div>
    );
};

export default ProducerProfile;
