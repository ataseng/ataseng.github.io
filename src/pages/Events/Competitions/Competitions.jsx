import './Competitions.css';
import Data from './Data/CompetitionsData.json';
import { Link } from 'react-router-dom';


const Competitions = () => {
    const formatTitle = (title) => {
        return title.toLowerCase().split(' ').join('-')
    }

    return (
        <>
            {
                Data.map((item, key) => (
                    <Link to={`${formatTitle(item.title)}`} key={key} style={{ display: "flex", textDecoration: "none" }}>{item.title}</Link>
                ))
            }
        </>
    )
}

export default Competitions