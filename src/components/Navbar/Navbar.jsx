import { Link } from "react-router-dom";
import navLogo from "../../assets/images/ATASENG_64_64.ico";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
        <Link to={`/`}>
            <img src={navLogo} alt="Nav Logo" id="nav-logo" />
        </Link>
        <ul id="nav-menu">
            <li>
                <Link to={`/`}>Anasayfa</Link>
            </li>
            <li>
                <Link to={`/events`}>Etkinlikler</Link>
            </li>
            <li>
                <Link to={`/team`}>Ekibimiz</Link>
            </li>
            <li>
                <Link to={`/about`}>Hakkımızda</Link>
            </li>
            <li>
                <Link to={`/contact`}>İletişim</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar