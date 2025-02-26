import React, { useState } from 'react'
import './bootcampsCard.css'
import BootcampsCardItem from './BootcampsCardItem';

const BootcampsCard = ({data,filtered,select}) => {

    const [selectedItem, setSelectedItem] = useState(null);

    const filteredData = data.filter(item => {
        const searchFilter = item.title.toLowerCase().includes(filtered.toLowerCase()) ||item.description.toLowerCase().includes(filtered.toLowerCase())
        const selectFilter =  select === 'all' || (select === 'active' && item.isActive) || (select==="deactive" && !item.isActive)

        return searchFilter && selectFilter
    })
    return (
        <>
            <div className={filteredData.length !== 0 ? "bootcamps-container" : "error-container"}>
             {
                filteredData.length !== 0 ?
                
                filteredData.map((item,key) => (
                        <BootcampsCardItem key={key} item={item}/>
                    ))
                :

                    <div className="error-search">
                        <h3>Aradığınız Eğitim Bulunamadı!</h3>
                        <p>Lütfen başlığa göre arama yapınız.</p>
                    </div>
        
                
             }
              
                
            </div>
        </>
    )
}

export default BootcampsCard