import React, { useState } from 'react'
import EducationCard from '../../components/EducationCard/EducationCard'
import SearchFilter from '../../components/EducationCard/EducationSearchFilter/SearchFilter'


const EducationPage = () => {
  const [filtered, setFiltered] = useState("")
  return (
    <>
     
        <SearchFilter setFiltered={setFiltered}/>
        <EducationCard filtered={filtered}/>
     
       
    </>
  )
}

export default EducationPage