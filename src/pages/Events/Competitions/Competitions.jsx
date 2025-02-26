import './Competitions.css';
import Data from '../../../components/CompetitionsCard/Data/CompetitionsData.json';
import CompetitionList from '../../../components/CompetitionsCard/CompetitionList/CompetitionList'
import { Link } from 'react-router-dom';


const Competitions = () => {
    const formatTitle = (title) => {
        return title.toLowerCase().split(' ').join('-')
    }

    return (
        <>
            {/* {
                Data.map((item, key) => (
                    <Link to={`${formatTitle(item.title)}`} key={key} style={{ display: "flex", textDecoration: "none" }}>{item.title}</Link>
                ))
               
            } */}
             <CompetitionList />
        </>
    )
}

export default Competitions