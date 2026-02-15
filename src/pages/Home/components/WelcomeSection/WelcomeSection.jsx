import './WelcomeSection.css';
import logo from '../../../../assets/images/logo2.png';
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import Loader from '../../../../components/Loader/Loader';
import DailyAyah from '../../../../components/DailyAyah/DailyAyah';

const WelcomeSection = ({ text }) => {

    const ayahMode = false;

    return (
        <div id='welcome-section' className="welcome-section">
            <div className="welcome-content">
                <div className="welcome-logo">
                    <img src={logo} alt="Ataseng Logo" />
                </div>
                <div className="welcome-description">
                    {
                        text ?
                            text :
                            <Loader color={"white"} />
                    }
                </div>
                {
                    ayahMode && <DailyAyah />
                }
                <a className='arrow-down' href="#about-section">
                    <MdKeyboardDoubleArrowDown />
                </a>
            </div>
        </div>
    )
}

export default WelcomeSection