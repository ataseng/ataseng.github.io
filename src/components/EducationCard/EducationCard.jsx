import React, { useState } from 'react';
import './EducationCard.css';
import Data from './Data/EducationCardData.json';
import EducationCardItem from './EducationCardItem';
import EducationModal from './EducationModal/EducationModal';

const EducationCard = ({filtered}) => {
    const [modalIsOpen, setmodalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
 
    const filteredData = Data.filter(item => 
        item.title.toLowerCase().includes(filtered.toLowerCase())
    )
   
    return (
        <>
            <EducationModal 
                modalIsOpen={modalIsOpen} 
                setmodalIsOpen={setmodalIsOpen}
                selectedItem={selectedItem} 
            /> 
            <div className="education-container">
                {
                   filteredData.length !== 0 ?  
                   filteredData.map((item, key) => (
                      
                    <div className="education-card" key={key}>
                        <div className="education-card-wrap">
                            <EducationCardItem 
                                item={item}
                                setmodalIsOpen={setmodalIsOpen}
                                setSelectedItem={setSelectedItem} 
                            />
                        </div>
                    </div>
                )) 
                : 
                <>
                <div className="error-search">
                    <h3>Aradığınız Eğitim Bulunamadı!</h3>
                    <p>Lütfen başlığa göre arama yapınız.</p>
                </div>
                </>
                } 
            </div>
        </>
    );
};

export default EducationCard;
