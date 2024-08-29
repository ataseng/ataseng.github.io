import React from 'react'
import './EducationCard.css'
import EducatorImage from '../../assets/images/EducatorImage.jpg'
const EducationCard = () => {
  return (
    <>
        <div className="education-card">
            <div className="education-card-wrap">

                <div className="educator-image">
                    <img src={EducatorImage} alt="" />
                </div>
               
               <div className="education-card-info">
               <div className="education-card-title">
                        <h3>Frontend Eğitim</h3>
                    </div>
                    <div className="education-content">
                            <h4>Eğitim İçeriği : </h4>
                        <span>React, kullanıcı arayüzleri için güçlü bir JavaScript kütüphanesidir. Bileşenler oluşturun, durum yönetimi yapın ve dinamik uygulamalar geliştirin.</span>
                    </div>
                    <div className="education-date">
                            <h4>Eğitim Tarihi : </h4>
                        <span>12/03/2023</span>
                    </div>
                    <div className="education-location">
                        <h4>Eğitim Adresi</h4>
                        <span>Erzurum / Ataturk Üniversitesi Mühendislik Fakültesi / C Blok Kat: 2 / TrsE2 Sınıfı </span>
                    </div>
               </div>
        </div>
         
        </div>
    </>
  )
}

export default EducationCard