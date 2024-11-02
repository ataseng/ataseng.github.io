import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './CompetitionSelectFilter.css';

const CompetitionSelectFilter = ({ select, setSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { value: "all", label: "Hepsi" },
    { value: "active", label: "Aktif Yarışmalar" },
    { value: "deactive", label: "Pasif Yarışmalar" }
  ];

  const handleSelectChange = (value) => {
    setSelect(value);
    setIsOpen(false); 
  };

  return (
    <div className="dropdown-container">
      <div className="select-selected" onClick={() => setIsOpen(!isOpen)}>
        {options.find(option => option.value === select)?.label || "Seçenek Seçin"}
        <Icon icon="gridicons:dropdown" className="dropdown-icon" />
      </div>
      {isOpen && (
        <div className="select-items">
          {options.map(option => (
            <div
              key={option.value}
              onClick={() => handleSelectChange(option.value)}
              className="select-item"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompetitionSelectFilter;
