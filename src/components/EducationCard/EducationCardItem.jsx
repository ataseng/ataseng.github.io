import React from 'react';
import './EducationCardItem.css';
import EducationButton from '../Button/EducationButton/EducationButton';

const imagePaths = {
    'EducatorImage.jpg': require('../../assets/images/EducatorImage.jpg')
};

const EducationCardItem = ({ item, setmodalIsOpen, setSelectedItem }) => {
    const imgSrc = imagePaths[item.image] || '';

    

    return (
        <>
            <div className="educator-image">
                <img src={imgSrc} alt="" />
            </div>

            <div className="education-card-info">
                <div className="education-card-title">
                    <h3>{item.title}</h3>
                </div>
                <div className="education-content">
                    <h4>Eğitim İçeriği :</h4>
                    <span>{item.content}</span>
                </div>
                <div className="education-date">
                    <h4>Eğitim Tarihi :</h4>
                    <span>{item.date}</span>
                </div>
                <div className="education-location">
                    <h4>Eğitim Adresi :</h4>
                    <span>{item.location}</span>
                </div>
            </div>

            <div className="education-last-date">
                <h4>Son Başvuru :</h4>
                <span>{item.last}</span>
            </div>

            <div className="education-button">
                <EducationButton 
                    item={item}
                    setmodalIsOpen={setmodalIsOpen}
                    setSelectedItem={setSelectedItem}
                />
            </div>
        </>
    );
};

export default EducationCardItem;
