import React, { useEffect, useState } from 'react'
import EducationCard from '../../../components/EducationCard/EducationCard'
import SearchFilter from '../../../components/EducationCard/EducationSearchFilter/SearchFilter'
import EducationSelectFilter from '../../../components/EducationCard/EducationSelectFilter/EducationSelectFilter';
import "./Educations.css";


const Educations = () => {
  const [filtered, setFiltered] = useState("");
  const [select, setSelect] = useState("all");

  useEffect(() => {
    // setLoading(true);
    fetch("https://ataseng.com/api/educations_get.php")
      .then(res => res.json())
      .then(data => {
        if (data.message === "success") {
          const content = data.content;
          console.log(data);
        }
        else {
          console.log(data.message);
        }
        // setLoading(false);
      });

  }, []);
  return (
    <div className='educations-section'>
      <div className='educations-content'>
        <div className='educations-section-filter-area'>
          <EducationSelectFilter select={select} setSelect={setSelect} />
          <SearchFilter setFiltered={setFiltered} />
        </div>
        <EducationCard select={select} filtered={filtered} />
      </div>
    </div>
  )
}

export default Educations