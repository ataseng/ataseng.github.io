// src/components/TeamSection.js
import React from 'react';
import ProducerProfile from '../../components/CreditSection/ProducerProfile/ProducerProfile';
import './TeamSection.css';

const TeamSection = ({ title, members, globalIndexStart, reverse}) => {
  return (
    <div className={`team-section ${reverse ? 'team-section-reverse' : ''} `}  >
               
      <div className="team-title">
          <div className='line-dashed'></div>
          <h3>{title}</h3>
      </div>       
       <div className="team-members">
      {members.map((member, index) => {
        
        const globalIndex = globalIndexStart + index;
        const isReverse = globalIndex % 2 !== 0;

        return (
          <ProducerProfile
            key={globalIndex}
            name={member.name}
            role={member.role}
            bio={member.bio}  
            imageUrl={member.imageUrl}
            reverse={isReverse}
            backgroundColor={member.backgroundColor}
          />
        );
      })}
      </div>

    </div>
  );
};

export default TeamSection;
