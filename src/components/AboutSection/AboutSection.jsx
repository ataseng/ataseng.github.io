import React, { forwardRef } from 'react'
import './AboutSection.css'
import aboutSection from '../../assets/images/aboutSection.jpg'
import { Icon } from '@iconify/react/dist/iconify.js';
import Loader from '../Loader/Loader';

const AboutSection = forwardRef((props, ref) => {
    
    return (
        <>
            <div ref={ref} id='about-section' className="about-section">
                <div className="about-section-content">
                    <div className="about-section-image">
                        <img src={aboutSection} alt="img" />
                    </div>
                    <div className="about-section-inner-content">
                        {
                            props.loading ? 
                            <Loader /> : 
                            <>
                                <div className="about-section-title">
                                    <h2>
                                        {
                                            props.title ? 
                                            props.title : 
                                            <Loader />
                                        }
                                    </h2>
                                </div>
                                <div className="about-section-description">
                                    <p>
                                        {props.text}
                                    </p>
                                </div>
                                {
                                    props.listItems?.length > 0 ?
                                    <ul className="about-section-menu">
                                        {
                                            props.listItems?.map((listItem, index) => (
                                                <li key={`aboutListItem_${index}`}>
                                                    <Icon icon="material-symbols:stars" /><span>{listItem}</span>
                                                </li>
                                            ))
                                        }
                                    </ul> : ""
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
});

export default AboutSection