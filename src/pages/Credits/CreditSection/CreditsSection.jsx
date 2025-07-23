// src/components/TeamSection.js
import ContributorProfile from './ContributorProfile/ContributorProfile';
import './CreditsSection.css';

const CreditsSection = ({ title, members, globalIndexStart }) => {
    return (
        <div className={`credits-section`}  >
            <div className="credits-content">
                <div className="credits-title">
                    <div className='line-dashed'></div>
                    <h3>{title}</h3>
                </div>
                <div className="credits-members">
                    {members.map((member, index) => {

                        const globalIndex = globalIndexStart + index;

                        return (
                            <ContributorProfile
                                key={globalIndex}
                                name={member.name}
                                role={member.role}
                                bio={member.bio}
                                imageUrl={member.imageUrl}
                                backgroundColor={member.backgroundColor}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CreditsSection;
