import React from 'react'
import './homeTeamSection.css'
import PersonImage from '../../assets/images/personImage.jpg'
import Data from './HomeTeam.json'
const HomeTeamSection = () => {
    return (
        <div id='home-team-section' className="home-team-section">
            <div className="home-team-content">
                <div className="home-team-content-title">
                    <div className="left-line"></div>
                    <h2>EKİBİMİZ</h2>
                    <div className="right-line"></div>
                </div>
                <div className="home-team-content-card-wrap">

                    {
                        Data.map((item, key) => (
                            <div key={key} className="home-team-content-card">
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

                <div className="home-team-content-link">
                    <a href="/takim">Diğer ekip üyeleri için <span>”Ekibimiz”</span> sayfasını ziyaret edin</a>
                </div>
            </div>
        </div>
    )
}

export default HomeTeamSection