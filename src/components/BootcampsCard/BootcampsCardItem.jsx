import React from 'react'
import './bootcampsCardItem.css'
import image from '../../assets/images/bootcamps-Image.jpg'
import { Icon } from '@iconify/react'
const BootcampsCardItem = ({ item }) => {
  console.log(item.label);

  return (
    <>
      <div className="bootcamps-card">

        <div className="bootcamps-card-image">
          <img src={image} alt="" />
        </div>

        <div className="bootcamps-card-label">
          <ul>
            {
              item.label.map((item, key) => (
                <li key={key}>{item}</li>
              ))
            }
          </ul>
        </div>

        <div className="bootcamps-card-title">
          <h3>{item.title}</h3>
        </div>

        <div className="bootcamps-card-description">
          <p>{item.description}</p>
        </div>

        <div className="bootcamps-card-info">
          <div className="bootcamps-card-info-location">
            <Icon className='bootcamps-card-info-icon' icon="mingcute:location-line" />
            <span>{item.location}</span>
          </div>
          <div className="bootcamps-card-info-date">
            <Icon className='bootcamps-card-info-icon' icon="uil:calender" />
            <span>{item.date}</span>
          </div>
          <div className="bootcamps-card-info-time">
            <Icon className='bootcamps-card-info-icon' icon="tdesign:time" />
            <span>{item.time}</span>
          </div>
        </div>
            <div className="bootcamps-card-button">
              <p>
                {item.isActive == true ? 'Başvur' : 'Sonuçları Gör' }
              </p>
            </div>
      </div>
    </>
  )
}

export default BootcampsCardItem