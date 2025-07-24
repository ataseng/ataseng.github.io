// src/components/TeamSection.js
import ContributorCard from './ContributorCard/ContributorCard';
import './CreditsSection.css';

const CreditsSection = ({ title, contributors }) => {
    return (
        <div className={`credits-section`}  >
            <div className="credits-content">
                <div className="credits-title">
                    <div className='line-dashed'></div>
                    <h3>{title}</h3>
                </div>
                <div className="credits-contributors">
                    {contributors.map((contributor, index) => {
                        return (
                            <ContributorCard
                                key={`contributor_${index}`}
                                name={contributor.name}
                                title = {contributor.title}
                                department = {contributor.department}
                                role={contributor.role}
                                imageUrl={contributor.imageUrl}
                                social = {contributor.social}
                                gender = {contributor.gender}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CreditsSection;
