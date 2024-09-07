import React from 'react'
import './AboutSection.css'
import aboutSection from '../../assets/images/aboutSection.jpg'
import { MdStars } from "react-icons/md";
const AboutSection = () => {
  return (
    <>
      <div className="about-section">
       
           <div className="about-section-image">
           <img src={aboutSection} alt="img" />
           </div>
           <div className="about-section-content">
            <div className="about-section-title">
              <h2>Bizi Daha Yakından Tanıyın</h2>
            </div>
            <div className="about-section-description">
              <p>Atatürk Üniversitesi Yazılım Mühendisliği bünyesinde aktif bir kulüptür. <br /> Web programlama siber güvenlik, algoritma analizi,
                 networking ve tanıtım <br /> ekipleriyle ana yapısını oluşturan en aktif ve etkin kulüplerden biridir...</p>
            </div>
            <ul className="about-section-menu">
              <li><MdStars/><span>Etkinliklerimiz</span></li>
              <li><MdStars/><span>İletişim</span></li>
              <li><MdStars/><span>Ekibimiz</span></li>
              <li><MdStars/><span>Bize katılın</span></li>
              
            </ul>
            
           </div>
     
      
      </div>
    </>
  )
}

export default AboutSection