import React from 'react'
import EducationButton from '../Button/EducationButton/EducationButton';
import './carrerDaysItem.css'

const imagePaths = {
  'EducatorImage.jpg': require('../../assets/images/EducatorImage.jpg')
};

const CarrerDaysItem = ({ item, setmodalIsOpen, setSelectedItem }) => {

const imgSrc = imagePaths[item.image] || '';

    
  return (
    
<>
            <div className="educator-image">
                <img src={imgSrc} alt="" />
            </div>

            <div className="carrer-days-card-info">
                <div className="carrer-days-card-title">
                    <h3>{item.title}</h3>
                </div>
                <div className="carrer-days-content">
                    <h4>Konferans İçeriği :</h4>
                    <span>{item.content}</span>
                </div>
                <div className="carrer-days-date">
                    <h4>Konferans Tarihi :</h4>
                    <span>{item.date}</span>
                </div>
                <div className="carrer-days-location">
                    <h4>Konferans Adresi :</h4>
                    <span>{item.location}</span>
                </div>
            </div>

            <div className="carrer-days-last-date">
                <h4>Son Başvuru :</h4>
                <span>{item.last}</span>
            </div>

            <div className="carrer-days-button">
                <EducationButton 
                    item={item}
                    setmodalIsOpen={setmodalIsOpen}
                    setSelectedItem={setSelectedItem}
                />
            </div>
        </>
  )
}

export default CarrerDaysItem