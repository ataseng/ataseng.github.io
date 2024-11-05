import React, { useState } from 'react'
import './bootcampsCardItem.css'
import image from '../../assets/images/bootcamps-Image.jpg'
import { Icon } from '@iconify/react'
import Modal from 'react-modal';
const BootcampsCardItem = ({ item }) => {
  const [modalIsOpen, setmodalIsOpen] = useState(false)

  const [data, setData] = useState({
    FirstName:"",
    LastName :"",
    Social :"",
    Phone :"",
    Email :"",
  })

  const handleChange = (e) => {
    
    const {name,value} = e.target
    
    setData(previousData => (
      {
        ...previousData,
        [name] : value
      }
    ))
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    setData({
      FirstName:"",
      LastName :"",
      Social :"",
      Phone :"",
      Email :"",
      
    })
    setmodalIsOpen(!modalIsOpen)
  }
  

  const toogleModal = () => {
    setmodalIsOpen(!modalIsOpen)
  }
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
        
                {item.isActive == true ?
                <p onClick={toogleModal}>Başvur</p>
                  :
                <p>Sonuçları Gör</p>
                  }
        
            </div>
      </div>

          
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={toogleModal}
              className="modal"
              overlayClassName="modal-overlay"
              >
            
              <button className='bootcamps-modal-cls-btn' onClick={toogleModal}>x</button>
              <div className="bootmcaps-modal-title">
                <h3>{item.title}</h3>
              </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-container">

                  
                      <input value={data.FirstName} onChange={handleChange}  name='FirstName' type="text" placeholder='İsim:' />
                      <input value={data.LastName} onChange={handleChange}  name='LastName' type="text" placeholder='Soyisim:' />
                      <input value={data.Social} onChange={handleChange}  name='Social' type="text" placeholder='Bizi nereden duydunuz? :' />
                      <input value={data.Phone} onChange={handleChange}  name='Phone' type="tel" placeholder='Telefon Numarası' />
                      <input value={data.Email} onChange={handleChange}  name='Email' type="email" placeholder='Email' />
                      </div>

                      <div className="bootcamps-modal-btn">
                          <button type='submit'>Kayıt Ol</button>
                      </div>
                </form>
              
            </Modal>
   
    </>
  )
}

export default BootcampsCardItem