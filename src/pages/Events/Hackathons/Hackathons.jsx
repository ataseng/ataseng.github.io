import HackathonsCard from "../../../components/HackathonsCard/HackathonsCard";
import EducationSelectFilter from '../../../components/EducationCard/EducationSelectFilter/EducationSelectFilter'
import  SearchFilter from '../../../components/EducationCard/EducationSearchFilter/SearchFilter'
import { useState } from "react";
import data from './Data.json'
const Hackathons = () => {
  const [filtered, setFiltered] = useState("")
  const [select, setSelect] = useState("all")
  return (
    <>
      <div className="sidebar-margin">
          <EducationSelectFilter select={select} setSelect={setSelect}/>
          <SearchFilter setFiltered={setFiltered}/>
          <HackathonsCard data = {data} select={select} filtered={filtered}/>
      </div>
    </>
  )
};

export default Hackathons;