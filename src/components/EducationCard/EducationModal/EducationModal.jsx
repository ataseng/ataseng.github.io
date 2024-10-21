import React, { useState } from 'react';
import './EducationModal.css';
import EducationFormButton from '../../Button/EducationButton/EducationFormButton';

const EducationModal = ({ modalIsOpen, setmodalIsOpen, selectedItem }) => {
    const [formData, setFormData] = useState({
        FirstName:"",
        LastName:"",
        Social:"",
        Phone:"",
        Email:""
    })
   
    
    const [formSubmit, setFormSubmit] = useState(null)

    const handleChange = (e) => {
        const {name,value} = e.target
            setFormData(prevState => ({
            ...prevState,
            [name]:value
        }))      
    }

    const handleSubmit = (e) => {
        
        e.preventDefault()
        if(formData){
            setFormSubmit(formData)
            setFormData({
                FirstName:"",
                LastName:"",
                Social:"",
                Phone:"",
                Email:""
            })
          
        }
        
    }

    const handleClickOutside =(e) => {
        
        if(e.target.className === 'education-modal active')
        {
            setmodalIsOpen(false
            )
        }
    }

    
    return (
        <div onClick={handleClickOutside} className={`education-modal ${modalIsOpen ? 'active' : ''}`}>
            <div className="education-modal-container">
                <div className="education-modal-title">
                <p>{selectedItem ? selectedItem.title : 'Başlık Yok'}</p>
                </div>
          
                <form onSubmit={handleSubmit}>
                <div className="education-modal-input">
                      <input value={formData.FirstName} onChange={handleChange} name='FirstName' type="text" placeholder='İsim:' />
                      <input value={formData.LastName} onChange={handleChange} name='LastName' type="text" placeholder='Soyisim:' />
                      <input value={formData.Social} onChange={handleChange} name='Social' type="text" placeholder='Bizi nereden duydunuz? :' />
                      <input value={formData.Phone} onChange={handleChange} name='Phone' type="tel" placeholder='Telefon Numarası' />
                      <input value={formData.Email} onChange={handleChange} name='Email' type="email" placeholder='Email' />
                </div>
                <div className="education-modal-btn">
                    <EducationFormButton />
                </div>
                </form>
               
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
