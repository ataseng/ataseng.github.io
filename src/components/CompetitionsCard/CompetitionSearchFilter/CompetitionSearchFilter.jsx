import React from 'react';
import './CompetitionSearchFilter.css';

const CompetitionSearchFilter = ({ searchQuery, setSearchQuery }) => {
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Yarışma ara"
      className="search-input"
      value={searchQuery}
      onChange={handleSearch}
    />
  );
};

export default CompetitionSearchFilter;
