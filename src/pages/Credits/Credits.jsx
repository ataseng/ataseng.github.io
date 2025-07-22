// src/pages/Credits.js
import React from 'react';
import InfoCard from '../../components/CreditSection/Card/InfoCard';
import TeamSection from '../../components/CreditSection/TeamSection';
import teamData from '../../components/CreditSection/Data/CreditData.json';

const Credits = () => {
    const teams = [
        { title: 'Yönetici', members: teamData.yönetici },
        { title: 'Web Ekibi', members: teamData.webEkibi },
        { title: 'Tasarım Ekibi', members: teamData.tasarımEkibi },
        { title: 'API Ekibi', members: teamData.apiEkibi },
        { title: 'Mobil Ekibi', members: teamData.mobilEkibi },
        { title: 'Logo Tasarımcısı', members: teamData.logoTasarımcısı }
    ];


    let cumulativeIndex = 0;

    return (
        <>
            {teams.map((team, index) => {
                const currentIndex = cumulativeIndex;
                cumulativeIndex += team.members.length;
                const isReverse = index % 2 !== 0;
                return (
                    <TeamSection
                        key={index}
                        title={team.title}
                        members={team.members}
                        globalIndexStart={currentIndex}
                        reverse={isReverse}
                    />
                );

            })}
            <InfoCard />

        </>
    );
};

export default Credits;
