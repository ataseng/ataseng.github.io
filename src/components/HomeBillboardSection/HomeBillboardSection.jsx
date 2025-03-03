import React from 'react';
import './homeBillboardSection.css';
import Data from './HomeBillboardData.json';
import { Icon } from '@iconify/react/dist/iconify.js';
import HomeBilboardElement from './HomeBilboardElement';

const HomeBillboardSection = () => {
  const boardLength = Data?.billboardElements?.length
  
  return (

    <>
      <div className="billboard-section">
        <div className="billboard-content">
          <div className="billboard-title">
            <h2>{Data?.title}</h2>
          </div>
          <div className="billboard-description">
            <p>{Data?.description}</p>
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
                <Icon  className ="hook-icon-right" icon="mdi:hook" />
              </div>

              {Data?.billboardElements?.map((item, index) => (
                <HomeBilboardElement key={`bilboard_element_${index}`} item={item} index={index} boardLength={boardLength} />
              ))}
              {/* <div className="board first">
                {Data[0].billboardElements[0].name}
              </div>
              <div className="divider-line"></div>
             */}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBillboardSection;
