import BootcampsCard from '../../../components/BootcampsCard/BootcampsCard';
import SearchFilter from '../../../components/EducationCard/EducationSearchFilter/SearchFilter';
import EducationSelectFilter from '../../../components/EducationCard/EducationSelectFilter/EducationSelectFilter'

import data from './Data.json'
import { useState } from 'react';

const Bootcamps = () => {
    const [filtered, setFiltered] = useState("")
    const [select, setSelect] = useState("all")
    return (
        <>
            <div className="sidebar-margin">
                <EducationSelectFilter select={select} setSelect={setSelect}/>
                <SearchFilter setFiltered={setFiltered}/>
                <BootcampsCard data = {data} select={select} filtered={filtered}/>
            </div>
        </>
    )
};

export default Bootcamps;