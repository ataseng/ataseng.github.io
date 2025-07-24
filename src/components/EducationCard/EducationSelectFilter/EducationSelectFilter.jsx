import React, { useState } from 'react'
import { MdArrowDropDown } from "react-icons/md";
import './EducationSelectFilter.css'
const EducationSelectFilter = ({ select, setSelect }) => {
  const [openSelect, setOpenSelect] = useState(false)

  return (
    <>
      <div onClick={() => setOpenSelect(!openSelect)} className="selectFilter">
        <div className="select">
          <p>{(select === "active" && "Aktif Eğitimler") || (select === "passive" && "Pasif Eğitimler") || (select === "all" && "Hepsi")}</p>
          <i><MdArrowDropDown /></i>
        </div>
        <div className={`option ${openSelect === true ? "active" : ''}`}>
        <div className="option-menu">
          <ul>
            <li onClick={() => {
              setOpenSelect(!openSelect);
              setSelect("active")
            }}>Aktif Yarışmalar</li>
            <li onClick={() => {
              setOpenSelect(!openSelect);
              setSelect("passive")
            }}>Pasif Yarışmalar</li>
            <li onClick={() => {
              setOpenSelect(!openSelect);
              setSelect("all")
            }}>Hepsi</li>
          </ul>
        </div>
      </div>
      </div>
      
    </>
  )
}

export default EducationSelectFilter