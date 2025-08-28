import React from 'react';
import './EventButton.css';
import EducationModal from '../../EducationCard/EducationModal/EducationModal';

const EventButton = ({ item,setmodalIsOpen,setSelectedItem }) => {
  
  const handleClick=() => {

    if(item.isActive){
      setSelectedItem(item)
      setmodalIsOpen(true)
    }

  }
  return (
    <>
      <button onClick={handleClick} className='education-btn'>
        {`${item.Status === "active" ? "Başvur" : "Sonuçları Gör"} `}
      </button>
    </>
  );
};

export default EventButton;
