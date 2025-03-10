import React from 'react';
import { Icon } from "@iconify/react";
import locationIcon from "@iconify-icons/mdi/map-marker";
import emailIcon from "@iconify-icons/mdi/email";
import phoneIcon from "@iconify-icons/mdi/phone";
import './Contact.css';

const Contact = () => {
    return (
        <section id='contact-section'>
            <div className="section-content contact-content">
                <h2 className='lined-title'>İLETİŞİM</h2>
                <div className="contact-form contact-inner-content">
                    <div className='contact-form-row'>
                        <input type="text" placeholder="İsim" name="name" className='input' />
                        <input type="text" placeholder="Soyisim" name="surname" className='input' />
                    </div>
                    <input type="email" placeholder="Email" name="email" className='input' />
                    <textarea placeholder="Mesajınız" name="message" className='input' />
                    <button type="submit">Gönder</button>
                </div>
                <div className="map contact-inner-content">
                    <iframe
                        title='location'
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.8148761392195!2d41.241007775748265!3d39.90077687152707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406e5ee0b01ab1ff%3A0x25b3641256a294f3!2sAtat%C3%BCrk%20%C3%9Cniversitesi%20M%C3%BChendislik%20Fak%C3%BCltesi!5e0!3m2!1str!2str!4v1730535741892!5m2!1str!2str"
                        width="100%"
                        height="300"
                        allowfullscreen=""
                        loading="lazy"
                    />
                </div>
                <div className="contact-info contact-inner-content">
                    <div className="info-item">
                        <Icon icon={locationIcon} className='icon-1' />
                        <p>
                            Atatürk Üniversitesi
                            <br />
                            Mühendislik Fakültesi
                            <br />
                            Yazılım Mühendisliği
                        </p>
                    </div>
                    <div className="info-item">
                        <Icon icon={emailIcon} className='icon-1' />
                        <p><a href="mailto:ataseng2023@gmail.com">ataseng2023@gmail.com</a></p>
                    </div>
                    <div className="info-item">
                        <Icon icon={phoneIcon} className='icon-1' />
                        <p>+90 442 231 .. ..</p>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default Contact;