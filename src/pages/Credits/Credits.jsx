import InfoCard from './CreditSection/InfoCard/InfoCard';
import CreditsSection from './CreditSection/CreditsSection';
import { credits_data } from './CreditSection/Data/credits_data';

const Credits = () => {
    const teams = [
        { title: 'Yönetici', members: credits_data.yönetici },
        { title: 'Web Ekibi', members: credits_data.webEkibi },
        { title: 'Tasarım Ekibi', members: credits_data.tasarımEkibi },
        { title: 'API Ekibi', members: credits_data.apiEkibi },
        { title: 'Mobil Ekibi', members: credits_data.mobilEkibi },
        { title: 'Logo Tasarımcısı', members: credits_data.logoTasarımcısı }
    ];

    return (
        <>
            {teams.map((team, index) => {
                return (
                    <CreditsSection
                        key={`credits_section${index}`}
                        title={team.title}
                        members={team.members}
                    />
                );

            })}
            <InfoCard />
        </>
    );
};

export default Credits;
