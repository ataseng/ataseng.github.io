import InfoCard from './CreditsSection/InfoCard/InfoCard';
import CreditsSection from './CreditsSection/CreditsSection';
import { credits_data } from './CreditsSection/Data/credits_data';
import "./Credits.css";

const Credits = () => {
    const teams = [
        { title: 'Project Consultant', contributors: credits_data.project_consultant },
        { title: 'Frontend Team', contributors: credits_data.frontend_team },
        { title: 'Backend Team', contributors: credits_data.backend_team },
        // { title: 'Mobil Ekibi', contributors: credits_data.mobilEkibi },
        { title: 'DESIGN TEAM', contributors: credits_data.designers },
        { title: 'Logo DESIGNER', contributors: credits_data.logoDesigner }
    ];

    return (
        <div id='credits_page'>
            {teams.map((team, index) => {
                return (
                    <CreditsSection
                        key={`credits_section${index}`}
                        title={team.title}
                        contributors={team.contributors}
                    />
                );
            })}
            <InfoCard />
        </div>
    );
};

export default Credits;
