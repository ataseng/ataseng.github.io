import React, { useState } from 'react';
import './EducationCard.css';
import Data from './Data/EducationCardData.json';
import EducationCardItem from './EducationCardItem';
import EducationModal from './EducationModal';

const EducationCard = () => {
    const [modalIsOpen, setmodalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
 
    
    return (
        <>
            <EducationModal 
                modalIsOpen={modalIsOpen} 
                setmodalIsOpen={setmodalIsOpen}
                selectedItem={selectedItem} 
            /> 
            <div className="education-container">
                {
                    Data.map((item, key) => (
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
                }
            </div>
        </>
    );
};

export default EducationCard;
