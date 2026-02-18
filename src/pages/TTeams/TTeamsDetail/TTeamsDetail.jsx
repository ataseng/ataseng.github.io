import { useParams } from "react-router";
import "./TTeamsDetail.css";
import { useEffect, useState } from "react";
import { api } from "../../../api";
import TeamCard from "../../../components/TeamCard/TeamCard";

const TTeamsDetail = () => {

    const { slug } = useParams();
    const [teamDetail, setTeamDetail] = useState({});

    const getTeamDetail = async () => {
        const result = await api.get(`https://ataseng.com/api/teams/detail/get.php?slug=${slug}`);
        if (result && result.content) {

            let parsedMembers = [];
            try {
                if (typeof result.content.Members_JSON === 'string') {
                    parsedMembers = JSON.parse(result.content.Members_JSON);
                } else {
                    parsedMembers = result.content.Members_JSON;
                }
            } catch (err) {
                console.error("JSON parse error:", err);
                parsedMembers = [];
            }

            setTeamDetail({
                ...result.content,
                members: parsedMembers
            });
        }
    }

    useEffect(() => {
        if (slug)
            getTeamDetail();
    }, [slug]);

    useEffect(() => {
        if (teamDetail)
            console.log(teamDetail)
    }, [teamDetail]);

    return (
        <section id='tteams-section'>
            <div className="section-content tteams-content">
                <h2>{teamDetail?.Name}</h2>
                <img src={teamDetail?.Banner} alt="team-banner" />
                <p className="team_detail_about">{teamDetail?.About}</p>

                <hr />
                <h3>Takım Üyeleri</h3>

                <div className="team-cards">
                    {
                        teamDetail?.members?.map(member => (
                            <TeamCard
                                key={`team_member_${member.id}`}
                                image={member.image}
                                fullname={`${member.name} ${member.surname}`}
                                department={member.department}
                                position={member.role}
                                gender={member.gender}
                                extraClass="dark_bg"
                            />
                        ))
                    }
                </div>

            </div>
        </section>
    )
}

export default TTeamsDetail