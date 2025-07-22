import React from 'react';
import './InfoCard.css';
import teamData from '../Data/CreditData.json';
import logo from '../../../assets/images/atasengLogo.png'
const InfoCard = () => {
    
    const renderTeam = (title, team) => (
        <>
            <div className='line-dashed'></div>
            <h2>{title}</h2>
            {team.map((member, index) => (
                <p key={index}>
                    {member.name} / <a href={member.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </p>

            ))}

        </>
    );

    return (
        <div className='info-card'>
            <div className='project-image-box'>
                <img src={logo} alt="Project Image" className="project-image" />
            </div>
            {renderTeam("Proje Yöneticisi", teamData.yönetici)}
            {renderTeam("Frontend Ekibi", teamData.webEkibi)}
            {renderTeam("Tasarım Ekibi", teamData.tasarımEkibi)}
            {renderTeam("API Ekibi", teamData.apiEkibi)}
            {renderTeam("Logo Tasarımcısı", teamData.logoTasarımcısı)}
            <div className='line-dashed'></div>
            <h2>Teşekkürler</h2>
            <p style={{textAlign: 'justify'}}>
                Bu projenin başarısında emeği geçen herkese en içten teşekkürlerimizi sunarız. Proje yöneticisinden tasarım ekibine,
                frontend geliştiricilerden tüm destek verenlere kadar herkesin katkılarıyla bu projeyi hayata geçirdik. Her birinizin
                özverili çalışması, yaratıcılığı ve profesyonelliği sayesinde bu noktaya gelebildik.
            </p>
        </div>
    );
};

export default InfoCard;
