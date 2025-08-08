import HackathonsCard from "../../../components/HackathonsCard/HackathonsCard";
import { useState } from "react";
import data from './Data.json'
import Filters from "../../../components/Filters/Filters";
const Hackathons = () => {
  const [filtered, setFiltered] = useState("");
  const [selected, setSelected] = useState("all");
  const selectMenu = {
    "active" : "Aktif Yazılım Yarışmaları",
    "passive" : "Pasif Yazılım Yarışmaları",
    "all" : "Hepsi"
  }
  return (
    <>
      <div className="sidebar-margin">
          <Filters selectMenu={selectMenu} selected={selected} setSelected={setSelected} setFiltered={setFiltered} searchPlaceHolder='Kariyer Günü Ara...'/>
          <HackathonsCard data = {data} select={selected} filtered={filtered}/>
      </div>
    </>
  )
};

export default Hackathons;