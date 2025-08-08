import BootcampsCard from '../../../components/BootcampsCard/BootcampsCard';
import Filters from '../../../components/Filters/Filters';

import data from './Data.json'
import { useState } from 'react';

const Bootcamps = () => {
    const [filtered, setFiltered] = useState("")
    const [selected, setSelected] = useState("all");
    const selectMenu = {
        "active": "Aktif Eğitim Kampları",
        "passive" : "Pasif Eğitim Kampları",
        "all": "Hepsi"
    };

    return (
        <div className='events-subpage'>
            <div className='events-subpage-content'>
                <Filters selectMenu={selectMenu} selected={selected} setSelected={setSelected} setFiltered={setFiltered} searchPlaceHolder='Bootcamp Ara...'/>
                <BootcampsCard data = {data} select={selected} filtered={filtered}/>
            </div>
        </div>
    )
};

export default Bootcamps;