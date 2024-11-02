import React from 'react';
import { Icon } from "@iconify/react"; 
import locationIcon from "@iconify-icons/mdi/map-marker";
import emailIcon from "@iconify-icons/mdi/email"; 
import phoneIcon from "@iconify-icons/mdi/phone"; 
import instagramIcon from "@iconify-icons/mdi/instagram"; 
import githubIcon from "@iconify-icons/mdi/github"; 
import youtubeIcon from "@iconify-icons/mdi/youtube"; 
import twitterIcon from "@iconify-icons/mdi/twitter"; 
import earth from "@iconify-icons/mdi/earth";
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">          
      <div className="line-container">
        <div className="line"></div>
        <h2>BİZİMLE İLETİŞİME GEÇİN</h2>
        <div className="line"></div>
      </div>
      
      <div className="contact-form-map">
        <div className="contact-form">
          <div className='contact-form-row'>
                <input type="text" placeholder="İsim" name="name" className='input'/>
                <input type="text" placeholder="Soyisim" name="surname" className='input' />
          </div>
          <input type="email" placeholder="Email" name="email"className='input' />
          <textarea placeholder="Mesajınız" name="message" className='input'/>
          <button type="submit">Gönder</button>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.8148761392195!2d41.241007775748265!3d39.90077687152707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406e5ee0b01ab1ff%3A0x25b3641256a294f3!2sAtat%C3%BCrk%20%C3%9Cniversitesi%20M%C3%BChendislik%20Fak%C3%BCltesi!5e0!3m2!1str!2str!4v1730535741892!5m2!1str!2str"
            width="100%" 
            height="300"              
            allowfullscreen="" 
            loading="lazy">
          </iframe>
        </div>
      </div>
      <div className="contact-info">
            <div className="info-item">
            <Icon icon={locationIcon} className='icon-1'/>
            <p>Adres<br />Atatürk Üniversitesi Mühendislik Fakültesi</p>
            </div>
            <div className="info-item">
            <Icon icon={emailIcon} className='icon-1'/>
            <p>Email<br />ataseng2023@gmail.com</p>
            </div>
            <div className="info-item">
            <Icon icon={phoneIcon} className='icon-1'/>
            <p>Telefon<br />+90 234 443</p>
            </div>
            <div className="info-item">
            <Icon icon={earth} className='icon-1'/>
            <p>Sosyal Medya</p>
            <a href=""><Icon icon={instagramIcon} className='icon-2'/></a>
            <a href=""><Icon icon={githubIcon} className='icon-2'/></a>
            <a href=""><Icon icon={twitterIcon} className='icon-2'/></a>
            <a href=""><Icon icon={youtubeIcon} className='icon-2'/></a>        
            </div>
      </div>
    </div>
  );
};

export default Contact;