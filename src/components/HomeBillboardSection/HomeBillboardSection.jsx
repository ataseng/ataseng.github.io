import React from 'react';
import './homeBillboardSection.css';
import Data from './HomeBillboardData.json';
import { Icon } from '@iconify/react/dist/iconify.js';

const HomeBillboardSection = () => {
  const boardLength = Data[0].billboardElements.length
  console.log(boardLength);
  
  
  return (

    <>
      <div className="billboard-section">
        <div className="billboard-content">
          <div className="billboard-title">
            <h2>{Data[0].title}</h2>
          </div>
          <div className="billboard-description">
            <p>{Data[0].description}</p>
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

              {Data[0].billboardElements.map((item,key) => (
                <>
                  <div key={key} className={`board ${key === 0 ? 'first' : ''}`}>
                    {item.name}
                  </div>
                  <div className={`divider-line ${key === boardLength-1 ? 'disable' : ''} `}></div>
                </>
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
