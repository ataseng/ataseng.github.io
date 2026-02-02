import './homeTeamSection.css'
import maleAvatar from '../../assets/images/avatars/maleAvatar.png';
import femaleAvatar from '../../assets/images/avatars/femaleAvatar.png';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

const HomeTeamSection = ({ our_team }) => {
    
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
                        our_team.length > 0 ?
                        our_team.filter(team_member => team_member.Position === "Başkan").map((item, key) => (
                            <div key={key} className="home-team-content-card">
                                <div className="person-image">
                                    {
                                        item.Image ? 
                                            <img src={item.image} alt="" />
                                            : item.Gender === "M" ? 
                                                <img src={maleAvatar} alt="" /> : 
                                                <img src={femaleAvatar} alt="" />
                                    }
                                </div>
                                <div className="person-name">
                                    <p>{item.Name} {item.Surname}</p>
                                </div>

                                <div className="departmant-info">
                                    <div className="departmant">
                                        <p>{item.Department}</p>
                                    </div>
                                    <div className="grade">
                                        <p>{item.Grade}. Sınıf</p>
                                    </div>
                                </div>

                                <div className="club-positions">
                                    <p style={{fontWeight: "bold"}}>{item.Position}</p>
                                </div>
                            </div>
                        ))
                        :
                        <Loader />
                    }

                    <p style={{width: "100%"}}></p>

                    {
                        our_team.length > 0 ?
                        our_team.filter(team_member => team_member.Position !== "Başkan").map((item, key) => (
                            <div key={key} className="home-team-content-card">
                                <div className="person-image">
                                    {
                                        item.Image ? 
                                            <img src={item.image} alt="" />
                                            : item.Gender === "M" ? 
                                                <img src={maleAvatar} alt="" /> : 
                                                <img src={femaleAvatar} alt="" />
                                    }
                                </div>
                                <div className="person-name">
                                    <p>{item.Name} {item.Surname}</p>
                                </div>

                                <div className="departmant-info">
                                    <div className="departmant">
                                        <p>{item.Department}</p>
                                    </div>
                                    <div className="grade">
                                        <p>{item.Grade}. Sınıf</p>
                                    </div>
                                </div>

                                <div className="club-positions">
                                    <p>{item.Position}</p>
                                </div>
                            </div>
                        ))
                        :
                        <Loader />
                    }
                </div>

                <div className="home-team-content-link">
                    <Link to={"/takim"}>Diğer ekip üyeleri için <span>”Ekibimiz”</span> sayfasını ziyaret edin</Link>
                </div>
            </div>
        </div>
    )
};

export default HomeTeamSection