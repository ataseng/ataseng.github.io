import './InfoCard.css';
import { credits_data } from '../Data/credits_data';
import logo from '../../../../assets/images/atasengLogo.png'

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
            {renderTeam("Proje Yöneticisi", credits_data.yönetici)}
            {renderTeam("Frontend Ekibi", credits_data.webEkibi)}
            {renderTeam("Tasarım Ekibi", credits_data.tasarımEkibi)}
            {renderTeam("API Ekibi", credits_data.apiEkibi)}
            {renderTeam("Logo Tasarımcısı", credits_data.logoTasarımcısı)}
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
