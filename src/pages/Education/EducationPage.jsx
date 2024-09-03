import React, { useState } from 'react'
import EducationCard from '../../components/EducationCard/EducationCard'
import SearchFilter from '../../components/EducationCard/EducationSearchFilter/SearchFilter'
import EducationSelectFilter from '../../components/EducationCard/EducationSearchFilter/EducationSelectFilter'


const EducationPage = () => {
  const [filtered, setFiltered] = useState("")
  const [select, setSelect] = useState("all")
  return (
    <>
        <EducationSelectFilter select={select} setSelect={setSelect}/>
        <SearchFilter setFiltered={setFiltered}/>
        <EducationCard select={select} filtered={filtered}/>
     
       
    </>
  )
}

export default EducationPage