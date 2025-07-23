import InfoCard from './CreditsSection/InfoCard/InfoCard';
import CreditsSection from './CreditsSection/CreditsSection';
import { credits_data } from './CreditsSection/Data/credits_data';

const Credits = () => {
    const teams = [
        { title: 'Yönetici', contributors: credits_data.yönetici },
        { title: 'Web Ekibi', contributors: credits_data.webEkibi },
        { title: 'Tasarım Ekibi', contributors: credits_data.tasarımEkibi },
        { title: 'API Ekibi', contributors: credits_data.apiEkibi },
        { title: 'Mobil Ekibi', contributors: credits_data.mobilEkibi },
        { title: 'Logo Tasarımcısı', contributors: credits_data.logoTasarımcısı }
    ];

    return (
        <>
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
        </>
    );
};

export default Credits;
