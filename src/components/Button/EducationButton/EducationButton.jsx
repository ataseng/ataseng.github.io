import React from 'react';
import './EducationButton.css';

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
        {`${item.isActive === true ? "Başvur" : "Sonuçları Gör"} `}
      </button>
    </>
  );
};

export default EducationButton;
