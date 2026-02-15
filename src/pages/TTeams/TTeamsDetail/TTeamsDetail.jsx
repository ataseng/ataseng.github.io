import { useParams } from "react-router";
import "./TTeamsDetail.css";
import { useEffect, useState } from "react";
import { api } from "../../../api";

const TTeamsDetail = () => {

    const { slug } = useParams();
    const [teamDetail, setTeamDetail] = useState({});

    const getTeamDetail = async () => {
        const result = await api.get(`https://ataseng.com/api/teams/detail/get.php?slug=${slug}`);
        if (result && result.content)
            setTeamDetail(result.content);
    }

    useEffect(() => {
        if (slug)
            getTeamDetail();
    }, [slug]);

    return (
        <section id='tteams-section'>
            <div className="section-content tteams-content">
                <h2>{teamDetail?.Name}</h2>
                <img src={teamDetail?.Banner} alt="team-banner" />
                <p className="team_detail_about">{teamDetail?.About}</p>
            </div>
        </section>
    )
}

export default TTeamsDetail