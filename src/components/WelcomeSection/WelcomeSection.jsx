import './WelcomeSection.css';
import logo from '../../assets/images/logo2.png';
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { forwardRef } from "react";

const WelcomeSection = forwardRef((_, ref) => {
    return (
        <div ref={ref} id='welcome-section' className="welcome-section">
            <div className="welcome-content">
                <div className="welcome-logo">
                    <img src={logo} alt="Ataseng Logo" />
                </div>
                <div className="welcome-description">
                    <p>
                        Teknolojiye yön veren yenilikçi zihinlerin buluşma noktası. Ataseng Kulübü'ne katılın, geleceği birlikte kodlayalım.
                    </p>
                </div>
                <a className='arrow-down' href="#about-section">
                    <MdKeyboardDoubleArrowDown/>
                </a>
            </div>
        </div>
    );
});

export default WelcomeSection