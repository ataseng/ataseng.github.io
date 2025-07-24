import React, { useState } from 'react'
import { MdArrowDropDown } from "react-icons/md";
import './EducationSelectFilter.css'
const EducationSelectFilter = ({ select, setSelect }) => {
  const [openSelect, setOpenSelect] = useState(false)

  const openModal = () => {
    setOpenSelect(!openSelect)
  }

  return (
    <>
      <div onClick={openModal} className="selectFilter">
        <div className="select">
          <p>{(select === "active" && "Aktif Yarışmalar") || (select === "deactive" && "Pasif Yarışamalar") || (select === "all" && "Hepsi")}</p>
          <i><MdArrowDropDown /></i>
        </div>

      </div>
      <div className={`option ${openSelect === true ? "active" : ''}`}>
        <div className="option-menu">
          <ul>
            <li onClick={() => {
              openModal();
              setSelect("active")
            }}>Aktif Yarışmalar</li>
            <li onClick={() => {
              openModal()
              setSelect("deactive")
            }}>Pasif Yarışamalar</li>
            <li onClick={() => {
              openModal()
              setSelect("all")
            }}>Hepsi</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default EducationSelectFilter