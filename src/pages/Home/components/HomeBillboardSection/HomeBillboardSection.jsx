import './homeBillboardSection.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import HomeBilboardElement from './HomeBilboardElement';

const HomeBillboardSection = ({ title, text, listItems }) => {

    const boardLength = listItems?.length;

  return (
    <div id='billboard-section' className="billboard-section">
                <div className="billboard-content">
                    <div className="billboard-title">
                        <h2>{title}</h2>
                    </div>
                    <div className="billboard-description">
                        <p>{text}</p>
                    </div>

                    <div className="billboard-visual">
                        <div className="top-line">


                            <div className="top-left-line"></div>
                            <div className="top-center-line"></div>
                            <div className="top-right-line"></div>
                        </div>
                        <div className="hook-left">
                            <Icon className='hook-icon-left' icon="mdi:hook" />
                        </div>

                        <div className="hook-right">
                            <Icon className="hook-icon-right" icon="mdi:hook" />
                        </div>

                        {
                            listItems?.split(";").map((item, index) => (
                                <HomeBilboardElement key={`bilboard_element_${index}`} item={item} index={index} boardLength={boardLength} />
                            ))
                        }
                    </div>
                </div>
            </div>
  )
}

export default HomeBillboardSection