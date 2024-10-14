import React from 'react'
import './thirdSection.css'

const ThirdSection = ({item}) => {
  return (
    <>
    <div className="third-content">
        
    <div className="thirdImage">
            <img   
              src={require(`../../../assets/images/${item.third.images}`)} 
              alt={item.third.title} 
            />
            </div>
            <div className="thirdText">
                <div className="thirdHeader">
                  <h3>{item.third.title}</h3>
                </div>
                <p>{item.third.text}</p>
           
            </div>
            
            </div>
          
 </>
  )
}

export default ThirdSection