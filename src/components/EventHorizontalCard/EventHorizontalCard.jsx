import React from 'react'
import EventButton from '../Button/EventButton/EventButton'
import competitionImage from "../../assets/images/Competitons.jpg";
import "./EventHorizontalCard.css";

const EventHorizontalCard = ({ item, curatorTitle, setModalIsOpen, setSelectedItem }) => {
    return (
        <div className="event-horizontal-card">
            <div className="event-horizontal-card-wrap">
                <div className="event-horizontal-card-image">
                    <img src={item.Curator_Image || competitionImage} alt="" />
                </div>

                <div className="event-horizontal-card-info">
                    <div className="event-horizontal-card-title">
                        <h3>{item.Title}</h3>
                    </div>
                    <div className="event-horizontal-card-content">
                        <h4>İçerik</h4>
                        <span className='h4-double-dot'>:</span>
                        <span className='event-horizontal-card-inner-content'>{item.Content?.substring(0, 160).trimEnd() + "..."}</span>
                    </div>
                    <div className="event-horizontal-card-date">
                        <h4>Tarih</h4>
                        <span className='h4-double-dot'>:</span>
                        <span className='event-horizontal-card-inner-content'>{item.Date}</span>
                    </div>
                    <div className="event-horizontal-card-location">
                        <h4>Adres</h4>
                        <span className='h4-double-dot'>:</span>
                        <span className='event-horizontal-card-inner-content'>{item.Location}</span>
                    </div>
                    <div className="event-horizontal-card-curator">
                        <h4>{curatorTitle}</h4>
                        <span className='h4-double-dot'>:</span>
                        <span className='event-horizontal-card-inner-content'>{item.Curator_Name} {item.Curator_Surname}</span>
                    </div>

                    <div className="event-horizontal-card-last-date">
                        <h4>Son Başvuru</h4>
                        <span className='h4-double-dot'>:</span>
                        <span className='event-horizontal-card-inner-content'>{item.Last_Application}</span>
                    </div>
                </div>

                <div className="event-horizontal-card-button">
                    <EventButton
                        item={item}
                        setmodalIsOpen={setModalIsOpen}
                        setSelectedItem={setSelectedItem}
                    />
                </div>
            </div>
        </div>
    )
}

export default EventHorizontalCard