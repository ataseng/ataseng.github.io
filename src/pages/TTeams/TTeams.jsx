import { Icon } from "@iconify/react/dist/iconify.js";
import "./TTeams.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api";

const TTeams = () => {

    const navigate = useNavigate();

    const redirectToUrl = url => {
        navigate(url);
    }

    const [teams, setTeams] = useState([]);

    const getTeams = async () => {
            const result = await api.get("https://ataseng.com/api/teams/get.php");
            if(result && result.content && result.content.length > 0)
                setTeams(result.content);
        }
    
    useEffect(() => {
        getTeams();
    }, []);

    return (
        <section id='tteams-section'>
            <div className="section-content tteams-content">
                <div className="tteam-cards">
                    {
                        teams.map(item => (
                            <div key={`tteam_${item.ID}`} className="tteam-card" onClick={() => redirectToUrl(item.Slug)}>

                                <div className="tteam-card-icon">
                                    <Icon icon={item.Icon} width={"2.37em"} height={"2.37em"}/>
                                </div>

                                <div className="tteam-card-title">
                                    <h3>{item.Name}</h3>
                                </div>

                                <div className="tteam-card-description">
                                    <p>{item.Description}</p>
                                </div>

                                <div className="tteam-card-button">
                                    <Link style={{ textDecoration: "none" }} to={item.Slug}><p>Detayları Gör</p></Link>
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default TTeams