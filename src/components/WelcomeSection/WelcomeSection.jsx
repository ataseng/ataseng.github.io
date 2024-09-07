import React from 'react'
import './WelcomeSection.css'
import logo from '../../assets/images/logo.png'
const WelcomeSection = () => {
  return (
    <div className="welcome-section">
        <div className="welcome-content">
          <div className="welcome-logo">
            <img src={logo} alt="Ataseng Logo" />
          </div>
          <div className="welcome-description">
            <p>
              Teknolojiye yön veren yenilikçi zihinlerin buluşma noktası. 
              Ataseng Kulübü'ne katılın, geleceği birlikte kodlayalım.
            </p>
          </div>
        </div>
      </div>
  )
}

export default WelcomeSection