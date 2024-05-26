import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <aside>
            <ul>
                <li>
                    <a href="/">Eğitimler</a>
                </li>
                <li>
                    <Link to={`/events/challenges`}>Yarışmalar</Link>
                </li>
                <li>
                    <a href="/">Kariyer Günleri</a>
                </li>
                <li>
                    <a href="/">Bootcamp</a>
                </li>
                <li>
                    <a href="/">Hackathon</a>
                </li>
                <li>
                    <a href="/">Sosyal Aktiviteler</a>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar