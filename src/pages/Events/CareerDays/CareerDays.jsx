import { useState } from "react";
import CarrerDaysCard from "../../../components/CarrerDaysCard/CarrerDaysCard";
import SearchFilter from "../../../components/EducationCard/EducationSearchFilter/SearchFilter";
import EducationSelectFilter from "../../../components/EducationCard/EducationSelectFilter/EducationSelectFilter";

const CareerDays = () => {
    const [filtered, setFiltered] = useState("")
    const [select, setSelect] = useState("all")
    return (
        <div className="sidebar-margin">
            
           <EducationSelectFilter select={select} setSelect={setSelect}/>
            <SearchFilter setFiltered={setFiltered}/>
            <CarrerDaysCard select={select} filtered={filtered}/>
        </div>
    )
};

export default CareerDays;