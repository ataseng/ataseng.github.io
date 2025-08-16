import { useState } from 'react'
import './BootcampCard.css'
import image from '../../../../../assets/images/bootcamps-Image.jpg';
import { Icon } from '@iconify/react'
import Modal from 'react-modal';


const BootcampCard = ({ item }) => {

    // const [modalIsOpen, setmodalIsOpen] = useState(false)

    // const [data, setData] = useState({
    //     FirstName: "",
    //     LastName: "",
    //     Social: "",
    //     Phone: "",
    //     Email: "",
    // })

    // const handleChange = (e) => {

    //     const { name, value } = e.target

    //     setData(previousData => (
    //         {
    //             ...previousData,
    //             [name]: value
    //         }
    //     ))
    // }


    // const handleSubmit = (e) => {
    //     e.preventDefault()

    //     setData({
    //         FirstName: "",
    //         LastName: "",
    //         Social: "",
    //         Phone: "",
    //         Email: "",

    //     })
    //     setmodalIsOpen(!modalIsOpen)
    // }


    // const toogleModal = () => {
    //     setmodalIsOpen(!modalIsOpen)
    // }

    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleButtonClick = () => {
        if (item.Status === 'active') {
            setIsFormOpen(true);
        } else {
            alert("Sonuçlar sayfasına yönlendirileceksiniz.");
        }
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    return (
        <>
            <div className="card">
                <img src={item.image} alt={item.Title || 'No Title'} className="card-image" />
                <div className="card-content">
                    <div className="tags">
                        {(item.tags || []).map((tag, index) => (
                            <span key={index} className="tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 className="card-title">{item.Title || 'No Title'}</h3>
                    <p className="card-description">{item.description || 'No Description'}</p>
                    <div className="card-footer">
                        <div className="location">
                            <Icon icon="bx:map" className="icon" />
                            <span>{item.location || 'Unknown Location'}</span>
                        </div>
                        <div className="date-time">
                            <Icon icon="uiw:date" className="icon" />
                            <span>{item.date || 'Unknown Date'}</span>
                        </div>
                        <div className="date-time">
                            <Icon icon="weui:time-outlined" className="icon" />
                            <span>{item.time || 'Unknown Time'}</span>
                        </div>
                    </div>
                </div>
                <button className="card-button" onClick={handleButtonClick}>
                    {item.Status === 'active' ? 'Kayıt' : 'Sonuçlar'}
                </button>
                {/* <div className="bootcamps-card-button">

                    {item.Status === "active" ?
                        <p onClick={toogleModal}>Başvur</p>
                        :
                        <p>Sonuçları Gör</p>
                    }

                </div> */}
            </div>

            {/* <Modal
              isOpen={modalIsOpen}
              onRequestClose={toogleModal}
              className="modal"
              overlayClassName="modal-overlay"
              >
            
              <button className='bootcamps-modal-cls-btn' onClick={toogleModal}>x</button>
              <div className="bootmcaps-modal-title">
                <h3>{item.Title}</h3>
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
              
            </Modal> */}

        </>
    )
}

export default BootcampCard;