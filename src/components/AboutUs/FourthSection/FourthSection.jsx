import React from 'react'
import './fourthSection.css'

const FourthSection = ({item}) => {
    return (
        <>
            <div className="fourth-content">
                <div className="fourthText">
                    <div className="fourthHeader">
                        <h3>{item.fourth.title}</h3>
                    </div>
                    
                  {
                    item.fourth.text.split("/").map((item,index) => (
                        <p key={index}>{item}</p>
                    ))
                  }

                </div>
                <div className="fourthImage">
                    <img
                        src={require(`../../../assets/images/${item.fourth.images}`)}
                        alt={item.fourth.title}
                    />
                </div>


            </div>

        </>
    )
}

export default FourthSection