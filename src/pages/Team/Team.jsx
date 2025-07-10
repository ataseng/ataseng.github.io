import './Team.css';
import { Icon } from '@iconify/react';
import teamFoto_1 from '../../assets/images/team_sections_1.jpg';
import teamFoto_2 from '../../assets/images/team_sections_2.jpg';
import JoinTeamForm from '../../components/Form/JoinTeamForm/JoinTeamForm';
import TeamCard from '../../components/TeamCard/TeamCard';
import { teamData } from "./teamData";

const Team = () => {
  return (
    <>
        <section>
            <div className="section-content team-content">
                <h2 className='lined-title'>Ekibimiz</h2>
                <div className="team-cards">
                    {teamData.map((card, index) => (
                        <TeamCard
                            key={index}
                            image={card.image}
                            name={card.name}
                            department={card.department}
                            role={card.role}
                            links={card.links}
                        />
                    ))}
                </div>
            </div>
            
            {/* <CardList /> */}
        </section>

        <section className='team-about'>
            <div className="section-content vertical-content">
                <h2 className='lined-title'>Ekibimiz Hakkında</h2>
                <div className='team-about-container'>
                    <div className='team-about-image'>                
                        <img src={teamFoto_1} alt="" />
                    </div>
                    
                    <div className='team-about-content'>
                    
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
            
        </section>
        <section className='team-our-conditions'>
            <div className='section-content vertical-content'> 
                <h2 className='lined-title'>Ekibimize Katılma Şartları</h2>
                <div className='team-about-container join-us-container'>
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
                    <div className='image-content'>                
                        <img src={teamFoto_2} alt="" />
                    </div> 
                </div>
                 
            </div>
            
        </section>

        <section id='join-team' className='team-join-our-team'>
            <div className="section-content vertical-content">
                <h2>Yönetim Ekibimize Katılmak İster Misiniz?</h2>
                <div className='join-team-content'>
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
                    <JoinTeamForm />
                </div>
            </div>
        </section>
      
    </>

  );
};

export default Team;