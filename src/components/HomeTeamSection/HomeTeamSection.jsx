import React, { forwardRef } from 'react'
import './homeTeamSection.css'
import maleAvatar from '../../assets/images/avatars/maleAvatar.png';
import femaleAvatar from '../../assets/images/avatars/femaleAvatar.png';
import Data from './HomeTeam.json'
import { Link } from 'react-router-dom';
const HomeTeamSection = forwardRef((_, ref) => {
    return (
        <div ref={ref} id='home-team-section' className="home-team-section">
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
                                    {
                                        item.image ? 
                                            <img src={item.image} alt="" />
                                            : item.gender === "male" ? 
                                                <img src={maleAvatar} alt="" /> : 
                                                <img src={femaleAvatar} alt="" />
                                    }
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
                    <Link to={"/takim"}>Diğer ekip üyeleri için <span>”Ekibimiz”</span> sayfasını ziyaret edin</Link>
                </div>
            </div>
        </div>
    )
});

export default HomeTeamSection