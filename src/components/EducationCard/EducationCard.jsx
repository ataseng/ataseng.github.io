import React from 'react'
import './EducationCard.css'
import Data from './Data/EducationCardData.json'
import EducationCardItem from './EducationCardItem'


const EducationCard = () => {
    return (
        <>
       
            <div className="education-container">
        
                {
                    Data.map((item,key) => (
                    <div className="education-card">
                        <div className="education-card-wrap">
                            <EducationCardItem item={item} key={key}/>
                        </div>
                    </div>
                    ))
                }
               
                
               </div>
            
        </>
    )
}

export default EducationCard