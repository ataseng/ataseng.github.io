import React from 'react';
import './EventButton.css';
import EducationModal from '../EducationCard/EducationModal/EducationModal';

const EventButton = ({ text, setmodalIsOpen,setSelectedItem }) => {
  
  const handleClick=() => {

    // if(item.isActive){
    //   setSelectedItem(item)
    //   setmodalIsOpen(true)
    // }

  }
  return (
    <>
      <button onClick={handleClick} className='event-btn'>
        {text}
        {/* {`${item.Status === "active" ? "Başvur" : "Sonuçları Gör"} `} */}
      </button>
    </>
  );
};

export default EventButton;
