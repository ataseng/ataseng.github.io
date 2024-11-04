import React from 'react'
import './bootcampsCard.css'
import BootcampsCardItem from './BootcampsCardItem';

const BootcampsCard = ({data}) => {

    
    return (
        <>
            <div className="bootcamps-container">
                {
                    data.map((item,key) => (
                        <BootcampsCardItem key={key} item={item}/>
                    ))
                }
            </div>
        </>
    )
}

export default BootcampsCard