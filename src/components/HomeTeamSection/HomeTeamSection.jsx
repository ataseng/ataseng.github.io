import React from 'react'
import './homeTeamSection.css'
import PersonImage from '../../assets/images/personImage.jpg'
import Data from './HomeTeam.json'
const HomeTeamSection = () => {
  return (
    <>
      <div className="sidebar-margin">
        <div className="team-section">
          <div className="team-section-title">
            <div className="left-line"></div>
            <h2>EKİBİMİZ</h2>
            <div className="right-line"></div>
          </div>
          <div className="team-section-card-wrap">

            {
              Data.map((item, key) => (
                <div key={key} className="team-section-card">
                  <div className="person-image">
                    <img src={PersonImage} alt="" />
                  </div>
                  <div className="person-name">
                    <p>{item.name}</p>
                  </div>

                  <div className="departmant-info">
                    <div className="departmant">
                      <p>{item.departmant}</p>
                    </div>
                    <div className="grade">
                      <p>{item.grade}</p>
                    </div>
                  </div>

                  <div className="club-positions">
                    <p>{item.clubPosition}</p>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="team-section-link">
            <a href="#">Diğer ekip üyleri için <span>”Ekibimiz”</span> sayfasını ziyaret edin</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeTeamSection