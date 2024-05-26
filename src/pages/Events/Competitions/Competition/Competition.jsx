import "./Competition.css";
import ResultCard from "./ResultCard/ResultCard";
import { FTCA_Winner_Teams } from "./data/ftac";

const Competition = ({ title }) => {

    return (
        <section className="events">
            <h2>{title}</h2>
            <div className="result-cards">
                {
                    FTCA_Winner_Teams.map((team, index) => (
                        <ResultCard 
                            key = {`$resultcard_${team.id}_${index}`}
                            {...team}
                        />
                    ))
                }
            </div>
        </section>
        
    )
}

export default Competition;