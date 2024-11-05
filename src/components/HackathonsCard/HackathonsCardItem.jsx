import React, { useState } from 'react'
import './hackathonsCardItem.css'
import {Icon} from '@iconify/react'
import image from '../../assets/images/bootcamps-Image.jpg'
import Modal from 'react-modal';
const HackathonsCardItem = ({item}) => {
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
    console.log(data);
    
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
    <div className="hackathons-card">

    <div className="hackathons-card-image">
      <img src={image} alt="" />
    </div>

    <div className="hackathons-card-label">
      <ul>
        {
          item.label.map((item, key) => (
            <li key={key}>{item}</li>
          ))
        }
      </ul>
    </div>

    <div className="hackathons-card-title">
      <h3>{item.title}</h3>
    </div>

    <div className="hackathons-card-description">
      <p>{item.description}</p>
    </div>

    <div className="hackathons-card-info">
      <div className="hackathons-card-info-location">
        <Icon className='hackathons-card-info-icon' icon="mingcute:location-line" />
        <span>{item.location}</span>
      </div>
      <div className="hackathons-card-info-date">
        <Icon className='hackathons-card-info-icon' icon="uil:calender" />
        <span>{item.date}</span>
      </div>
      <div className="hackathons-card-info-time">
        <Icon className='hackathons-card-info-icon' icon="tdesign:time" />
        <span>{item.time}</span>
      </div>
    </div>
        <div className="hackathons-card-button">
    
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
            
              <button className='hackathons-modal-cls-btn' onClick={toogleModal}>x</button>
              <div className="hackathons-modal-title">
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

                      <div className="hackathons-modal-btn">
                          <button type='submit'>Kayıt Ol</button>
                      </div>
                </form>
              
            </Modal>

  

</>
  )
}

export default HackathonsCardItem