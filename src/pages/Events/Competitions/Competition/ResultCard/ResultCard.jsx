import { Link } from "react-router-dom";
import "./ResultCard.css";
import { toSlug } from "../../../../../utils/toSlug";

const ResultCard = ({ place, id, name, teamMembers }) => {
    
    return (
        <article className="result-card">
            <h5 className="place">
                {place}
                <box-icon type="solid" name="trophy"></box-icon>
            </h5>
            <hr />
            <div className="team-info">
                <h5 className="team-name">{name}</h5>
                <div className="team-members">
                    {
                        teamMembers.map((member, index) => (
                            <Link
                                to={`/events/competitions/1/certificate/${id}/${toSlug(member.name)}`} title="Başarı Belgesi"
                            >
                                <p
                                    key={`fta_teammember_${id}_${member.id}_${index}`}
                                >
                                    {member.name}
                                    <box-icon name='file-pdf' type='solid' ></box-icon>
                                </p>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </article>
    )
}

export default ResultCard;