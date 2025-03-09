import './WelcomeSection.css';
import logo from '../../assets/images/logo2.png';
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { forwardRef } from "react";
import Loader from '../Loader/Loader';

const WelcomeSection = forwardRef((props, ref) => {
    return (
        <div ref={ref} id='welcome-section' className="welcome-section">
            <div className="welcome-content">
                <div className="welcome-logo">
                    <img src={logo} alt="Ataseng Logo" />
                </div>
                <div className="welcome-description">
                    <p>
                        {
                            props.text ?
                            props.text : 
                            <Loader color={"white"}/>
                        }
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