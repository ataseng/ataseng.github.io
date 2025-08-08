import { useState } from "react";
import CarrerDaysCard from "../../../components/CarrerDaysCard/CarrerDaysCard";
import Filters from "../../../components/Filters/Filters";

const CareerDays = () => {
    const [filtered, setFiltered] = useState("")
    const [selected, setSelected] = useState("all");
    const selectMenu = {
        "active": "Aktif Kariyer Günleri",
        "passive" : "Pasif Kariyer Günleri",
        "all" : "Hepsi"
    };
    return (
        <div className="sidebar-margin">
            <Filters selectMenu={selectMenu} selected={selected} setSelected={setSelected} setFiltered={setFiltered} searchPlaceHolder='Kariyer Günü Ara...'/>
            <CarrerDaysCard select={selected} filtered={filtered}/>
        </div>
    )
};

export default CareerDays;