import { Icon } from '@iconify/react';
import "./EventVerticalCard.css";
import { useState } from 'react';
import competitionImage from "../../assets/images/Competitons.jpg";

const EventVerticalCard = ({ item }) => {

    const [isFormOpen, setIsFormOpen] = useState(false);
    
    const handleButtonClick = () => {
        if (item.Status === 'active') {
            setIsFormOpen(true);
        } else {
            alert("Sonuçlar sayfasına yönlendirileceksiniz.");
        }
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    const date = new Date(item.Date);
    const dateText = `${('0' + date.getDate()).slice(-2)}.${('0' + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`;
    const timeText = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;

    return (
        <div className="event-vertical-card">
            <img src={item.Image || competitionImage} alt={item.Title || 'No Title'} className="event-vertical-card-image" />
            <div className="event-vertical-card-content">
                <div className="event-vertical-card-tags">
                    {
                        item.Tags?.map((tag, index) => (
                            <span key={index} className="event-vertical-card-tag">
                                {tag}
                            </span>
                        ))
                    }
                </div>
                <h3 className="event-vertical-card-title">{item.Title || 'No Title'}</h3>
                <p className="event-vertical-card-description">{item.Description || 'No Description'}</p>
                <div className="event-vertical-card-footer">
                    <div className="event-vertical-card-location">
                        <Icon icon="bx:map" className="event-vertical-card-icon" />
                        <span>{item.Location || 'Unknown Location'}</span>
                    </div>
                    <div className="event-vertical-card-date-time">
                        <Icon icon="uiw:date" className="event-vertical-card-icon" />
                        <span>{dateText || 'Unknown Date'}</span>
                    </div>
                    <div className="event-vertical-card-date-time">
                        <Icon icon="weui:time-outlined" className="event-vertical-card-icon" />
                        <span>{timeText || 'Unknown Time'}</span>
                    </div>
                </div>
            </div>
            <button className="event-vertical-card-button" onClick={handleButtonClick}>
                {item.Status === 'active' ? 'Kayıt' : 'Sonuçlar'}
            </button>

            {/* {isFormOpen && ReactDOM.createPortal(
                <CompetitionForm onClose={handleCloseForm} />,
                document.getElementById('modal-root')
            )} */}
        </div>
    )
}

export default EventVerticalCard