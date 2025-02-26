import React from 'react';
import './homeDiscordSection.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import DarkClubLogo from '../../assets/images/atasengLogo_dark.png'
import LightClubLogo from '../../assets/images/atasengLogo_white.png'
const HomeDiscordSection = () => {
  return (
    <div className="sidebar-margin">
      <div className="discord-section">
        <div className="discord-section-leftSide">
          <div className="left-side-logo">
          <img src={localStorage.getItem("theme") === 'dark' ? LightClubLogo : DarkClubLogo} alt="" />

          </div>
          <div className="left-side-title">
            <h2>Discord Kanalımıza Katıldınız mı ?</h2>
          </div>
          <div className="left-side-description">
            <p>Yazılım topluluğumuzun Discord kanalına katılmaya davetlisiniz!
               Kanalımıza katılarak en güncel yazılım trendleri ve teknikleri hakkında bilgi sahibi olabilir, sorularınızı sorup diğer yazılımcılardan destek alabilir ve yeni iş fırsatlarından haberdar olabilirsiniz.
               Ayrıca, çeşitli projelerde iş birliği yapma ve ağınızı genişletme şansı elde edeceksiniz.
               Hep birlikte daha güçlü bir topluluk oluşturalım!</p>
          </div>
        </div>
        <div className="discord-section-rightSide">
          <div className="discord-icon">
              <Icon icon="skill-icons:discord" /> 
          </div>
          <div className="rightSide-title">
         <span><Icon icon="noto:rocket" /></span> <h2>Ataseng Discord Kanalı</h2> <span><Icon icon="noto:rocket" /></span> 
          </div>
          <div className="rightSide-description">
            <p>Yazılım topluluğumuzun Discord kanalında  birden fazla alanda uzman yazılımcılardan 7/24 yardım alın.
               En güncel yazılım trendleri hakkında bilgi sahibi olabilir, sorularınızı sorarak hızlıca yanıt alabilir
                ve projelerde iş birliği yaparak yeteneklerinizi geliştirebilirsiniz
              </p>
          </div>
          <div className="discord-invite-link">
            <span>Katılmak İçin : </span><a href="#">https://discord.gg/rNtWdar5Eu</a>
          </div>
          <div className="rightSide-ataseng-logo">
            <h2>ATASENG</h2>
          </div>
        </div>
        

        
      
        </div>
      </div>
 
  );
};

export default HomeDiscordSection;
