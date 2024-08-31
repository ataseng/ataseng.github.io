import React from 'react';
import './EducationModal.css';
import EducationFormButton from '../Button/EducationButton/EducationFormButton';

const EducationModal = ({ modalIsOpen, setmodalIsOpen, selectedItem }) => {
 
    return (
        <div className={`education-modal ${modalIsOpen ? 'active' : ''}`}>
            <div className="education-modal-container">
                <div className="education-modal-title">
                <p>{selectedItem ? selectedItem.title : 'Başlık Yok'}</p>
                </div>
          
                <div className="education-modal-input">
                      <input type="text" placeholder='İsim:' />
                      <input type="text" placeholder='Soyisim:' />
                      <input type="text" placeholder='Bizi nereden duydunuz? :' />
                      <input type="tel" placeholder='Telefon Numarası' />
                      <input type="email" placeholder='Email' />
                </div>
                <div className="education-modal-btn">
                    <EducationFormButton />
                </div>
               
                <div className="modal-close-btn">
                    <button onClick={() => setmodalIsOpen(false)}>x</button>
                </div>
                <div className="modal-warning">
                    <p><b>Uyarı :</b> <span>Eğer yarışmaya grup halinde başvuracak iseniz sadece 1 kişinin takım arkadaşlarının isimlerini de ekleyerek başvuru yapması yeterlidir.</span></p>
                </div>
            </div>
        </div>
    );
};

export default EducationModal;
