import React from 'react';
import Data from '../about.json';
import './firstSection.css';
import SecondSection from '../secondSection/SecondSection';

const FirstSection = () => {

  return (
    <>
      {
        Data.map((item, index) => (
          <>
            <div key={index} className="firstSection">
            
            <div className="first-content">
            <div className="firstImage">
              <img   
                src={require(`../../../assets/images/${item.first.images}`)} 
                alt={item.first.title} 
              />
              </div>
              <div className="firsText">
                <div className="firstHeader">
                  <h3>{item.first.title}</h3>
                </div>
                <p>{item.first.text}</p>
              </div>
              </div>
            </div>

            <div key={index} className="secondSection">
                <SecondSection item={item}/>
            </div>
          </>
        ))

      
      }
    </>
  )
}

export default FirstSection;
