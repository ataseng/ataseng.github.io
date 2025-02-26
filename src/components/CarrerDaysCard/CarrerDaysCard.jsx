import React, { useState } from 'react';
import CarrerDaysItem from './CarrerDaysItem';
import Data from './Data/carredDays.json';
import EducationModal from '../EducationCard/EducationModal/EducationModal'; 
import './CarrerDaysCard.css';

const CarrerDaysCard = ({ filtered, select }) => {
    const [modalIsOpen, setmodalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const filteredData = Data.filter(item => {
        const searchFilter = item.title.toLowerCase().includes(filtered.toLowerCase()) || item.content.toLowerCase().includes(filtered.toLowerCase());
        const selectFilter = select === "all" || (select === "active" && item.isActive) || (select === "deactive" && !item.isActive);
        return searchFilter && selectFilter;
    });

    return (
        <>
            <div className="carrer-days-container">
                {
                    filteredData.length !== 0 ?  
                    filteredData.map((item, key) => (
                        <div className="carrer-days-card" key={key}>
                            <div className="carrer-days-card-wrap">
                                <CarrerDaysItem 
                                    item={item}
                                    setmodalIsOpen={setmodalIsOpen}
                                    setSelectedItem={setSelectedItem} 
                                />
                            </div>
                        </div>
                    )) 
                    : 
                    <div className="error-container">

                    <div className="error-search">
                        <h3>Aradığınız Eğitim Bulunamadı!</h3>
                        <p>Lütfen başlığa göre arama yapınız.</p>
                    </div>
                </div>
                } 
            </div>

      
            {modalIsOpen && (
                <EducationModal 
                    modalIsOpen={modalIsOpen} 
                    setmodalIsOpen={setmodalIsOpen} 
                    selectedItem={selectedItem} 
                />
            )}
        </>
    );
};

export default CarrerDaysCard;
