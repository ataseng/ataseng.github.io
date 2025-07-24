import React from 'react';
import './EducationButton.css';
import EducationModal from '../../EducationCard/EducationModal/EducationModal';

const EducationButton = ({ item,setmodalIsOpen,setSelectedItem }) => {

  
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

export default EducationButton;
