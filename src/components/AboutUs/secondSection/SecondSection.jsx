import React from 'react'
import './secondSection.css'

const SecondSection = ({ item }) => {
    return (
        <>
            <div className="second-content">
                <div className="secondText">
                    <div className="secondHeader">
                        <h3>{item.second.title}</h3>
                    </div>
                    <ul>
                        {

                            item.second.text.split(".").map((sentence, index) => (
                                sentence.trim() !== '' && <li key={index}>{sentence.trim()}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="secondImage">
                    <img
                        src={require(`../../../assets/images/${item.second.images}`)}
                        alt={item.first.title}
                    />
                </div>
            </div>
        </>
    )
}

export default SecondSection