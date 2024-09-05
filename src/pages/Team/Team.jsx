
import './Team.css';
import CardList from '../../components/TeamCard/CardList'; 
import { Icon } from '@iconify/react';
import teamFoto_1 from '../../assets/images/team_sections_1.jpg';
import teamFoto_2 from '../../assets/images/team_sections_2.jpg';
import logoLightTheme from '../../assets/images/atasengLogo_dark.png';
import logoDarkTheme from '../../assets/images/atasengLogo_white.png';
import JoinTeamForm from '../../components/Form/JoinTeamForm/JoinTeamForm';

const Team = () => {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const logoSrc = isDarkMode === 'dark-mode' ? logoDarkTheme : logoLightTheme;
  return (
    <div className="team-page ">
        <div className='team'>
            <div className="header-with-lines">
                <span className="line"></span>
                <h1>Ekibimiz</h1>
                <span className="line"></span>
        </div>

            <CardList />
        </div>

        <div className='about'>
            <h2>Ekibimiz Hakkında</h2>
            <div className='about-container'>
                <div className='about-foto'>                
                    <img src={teamFoto_1} alt="" />
                </div>
                
                <div className='about-contents'>
                
                <p>Başkan, ekibin lideri olarak tüm operasyonları yönetir ve 
                organizasyonun genel vizyonunu ve misyonunu belirler.
                Stratejik hedeflerin gerçekleştirilmesi için gerekli adımları 
                atar ve dış ilişkileri etkili bir şekilde yönetir. Başkanın en 
                yakın destekçisi olan Başkan Yardımcısı, başkanın yokluğunda 
                onun görevlerini üstlenir ve stratejik kararların alınmasında 
                önemli bir rol oynar. Projelerin koordinasyonunu sağlar ve 
                başkanın belirlediği hedeflerin uygulanmasını takip eder.
                </p>
                <p>
                Ekibin düzenli çalışmasını sağlayan diğer önemli üyelerden 
                biri olan Yazman, toplantı tutanaklarını tutar ve resmi 
                yazışmaları yürütür. Ayrıca, evrak işlerinin düzenlenmesinden 
                ve arşivlenmesinden sorumludur. Finansal işlemleri denetleyen 
                Sayman, gelir ve giderlerin düzenli takibini yapar, bütçeyi 
                oluşturur ve mali raporları hazırlar.
                </p>
                <p>
                Yönetim Kurulu Üyeleri, organizasyonun genel stratejisini 
                belirler ve önemli politika kararlarını alır. Her bir üye, 
                belirli alanlarda uzmanlaşarak organizasyonun çeşitli 
                fonksiyonlarını denetler ve stratejik hedeflere ulaşılmasına 
                katkı sağlar. Yönetim Kurulu'nun etkili bir şekilde çalışması, 
                organizasyonun başarısında kritik bir rol oynar ve başkanın 
                liderliğinde, tüm üyeler koordineli bir şekilde çalışarak 
                organizasyonun gelişimini ve büyümesini sağlarlar.</p>
                </div>
            </div>
        </div>
        <div className='joinTeamConditions '>
            
            <div className='joinTeamConditions-contents'> 
                    <h2>Ekibimize Katılma Şartları</h2>                   
                    <ul>
                        <li><Icon icon="mdi:star-circle" />Takım Çalışması: Ekip içinde uyumlu çalışabilme yeteneği ve işbirliği yapma isteği.</li>
                        <li><Icon icon="mdi:star-circle" />Sorumluluk Sahibi Olma: Verilen görevleri zamanında ve eksiksiz yerine getirme sorumluluğu.</li>
                        <li><Icon icon="mdi:star-circle" />Misyon ve Vizyon: Kulübümüzün misyon ve vizyonunu benimsemiş olmak.</li>
                        <li><Icon icon="mdi:star-circle"  />Aktif Katılım: Kulüp etkinliklerine ve projelere düzenli ve aktif bir şekilde katılım gösterebilmek.</li>
                        <li><Icon icon="mdi:star-circle" />Liderlik Yeteneği: Projelerde ve etkinliklerde liderlik yapabilme becerisi.</li>
                        <li><Icon icon="mdi:star-circle" />İletişim Becerileri: Etkin ve açık iletişim kurabilme yeteneği.</li>
                        <li><Icon icon="mdi:star-circle" />Deneyim ve Bilgi: İlgili alanlarda deneyim veya bilgi sahibi olmak.</li>
                        <li><Icon icon="mdi:star-circle" />Motivasyon ve Azim: Kulübün hedeflerine ulaşması için motive ve azimli olmak.</li>
                        <li><Icon icon="mdi:star-circle" />Yenilikçilik: Yeniliklere açık ve yaratıcı çözümler üretebilmek.</li>
                        <li><Icon icon="mdi:star-circle" />Esneklik: Değişen koşullara ve yeni görevlere hızlıca adapte olabilmek.</li>
                    </ul>
            </div>
            <div className='joinTeamConditions-foto'>                
                <img src={teamFoto_2} alt="" />
            </div>
        </div>

        <div className='joinTeam '>
            <h2>Yönetim Ekibimize Katılmak İster Misiniz?</h2>
            <div className='joinTeam-contents'>
                <img src={logoSrc} alt="" />
                <p>
                Ekibimizin bir parçası olarak, dinamik ve yenilikçi 
                bir ortamda çalışma fırsatını yakalayabilirsiniz. 
                Ekip üyelerimiz, takım çalışmasına yatkın, sorumluluk 
                sahibi ve kulübümüzün misyon ve vizyonunu benimsemiş 
                bireylerden oluşur. Projelerde liderlik yapma, etkinlikler 
                düzenleme ve kişisel gelişiminize katkıda bulunma şansı 
                elde edersiniz. Motive, yaratıcı ve işbirliğine açık 
                biriyseniz, ekibimize katılmak için başvurunuzu bekliyoruz! 
                Ekibimizin bir parçası olarak, hem kendinizi geliştirme 
                fırsatı bulacak hem de kulübümüzün büyümesine katkıda 
                bulunacaksınız.
                </p>
            </div>
            <JoinTeamForm />
        </div>
      
    </div>
  );
};

export default Team;
