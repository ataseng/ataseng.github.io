import './InfoCard.css';
import { credits_data } from '../Data/credits_data';
import logo from '../../../../assets/images/atasengLogo.png'

const InfoCard = () => {

    const isLessThan400 = window.innerWidth <= 400;

    const renderTeam = (title, team) => (
        <>
            <div className='line-dashed'></div>
            <h2>{title}</h2>
            {team.map((member, index) => (
                <p key={index}>
                    {member.name}
                </p>
            ))}
        </>
    );

    return (
        <div className='info-card'>
            {
                !isLessThan400 ?
                <>
                    <div className='project-image-box'>
                        <img src={logo} alt="Project-Credits" className="project-image" />
                    </div>
                    {renderTeam("Project Consultant", credits_data.project_consultant)}
                    {renderTeam("Frontend Team", credits_data.frontend_team)}
                    {renderTeam("Backend Team", credits_data.backend_team)}
                    {renderTeam("Design Team", credits_data.designers)}
                    {renderTeam("Logo Designer", credits_data.logoDesigner)}
                    <div className='line-dashed'></div>
                    <h2>Teşekkürler</h2>
                    <p style={{textAlign: 'justify'}}>
                        Bu projenin başarıya ulaşmasında katkı sağlayan tüm kişi ve ekiplere en içten teşekkürlerimizi sunarız. Projenin hayata geçirilmesi; proje yöneticisinden tasarım ekibine, frontend geliştiricilerden destek veren tüm paydaşlara kadar birçok kişinin özverili çalışması, yaratıcılığı ve profesyonelliği sayesinde mümkün kılınmıştır. Her bir katkı, projenin bugünkü başarısında önemli bir rol oynamıştır.
                    </p>
                </> : 
                <>
                    <h2>Teşekkürler</h2>
                    <p style={{textAlign: 'justify'}}>
                        Bu projenin başarıya ulaşmasında katkı sağlayan tüm kişi ve ekiplere en içten teşekkürlerimizi sunarız. Projenin hayata geçirilmesi; proje yöneticisinden tasarım ekibine, frontend geliştiricilerden destek veren tüm paydaşlara kadar birçok kişinin özverili çalışması, yaratıcılığı ve profesyonelliği sayesinde mümkün kılınmıştır. Her bir katkı, projenin bugünkü başarısında önemli bir rol oynamıştır.
                    </p>
                </>
            }
            
        </div>
    );
};

export default InfoCard;
