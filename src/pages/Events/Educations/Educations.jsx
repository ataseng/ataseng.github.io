import { useEffect, useState } from 'react'
import EducationCard from '../../../components/EducationCard/EducationCard'
import SearchFilter from '../../../components/EducationCard/EducationSearchFilter/SearchFilter'
import EducationSelectFilter from '../../../components/EducationCard/EducationSelectFilter/EducationSelectFilter';
import "./Educations.css";


const Educations = () => {
  const [filtered, setFiltered] = useState("");
  const [select, setSelect] = useState("all");
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    // setLoading(true);
    fetch("https://ataseng.com/api/educations_get.php")
      .then(res => res.json())
      .then(data => {
        if (data.message === "success") {
          const content = data.content;
          setEducations(content);
        }
        else {
            console.error(data.message);
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
        <EducationCard select={select} filtered={filtered} educations={educations}/>
      </div>
    </div>
  )
}

export default Educations