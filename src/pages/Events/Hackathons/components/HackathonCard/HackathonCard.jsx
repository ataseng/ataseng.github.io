import { Icon } from '@iconify/react'
import { useState } from 'react';

const HackathonCard = ({ item }) => {

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

    return (
        <div className="card">
            <img src={item.image} alt={item.Title || 'No Title'} className="card-image" />
            <div className="card-content">
                <div className="tags">
                    {(item.tags || []).map((tag, index) => (
                        <span key={index} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>
                <h3 className="card-title">{item.Title || 'No Title'}</h3>
                <p className="card-description">{item.description || 'No Description'}</p>
                <div className="card-footer">
                    <div className="location">
                        <Icon icon="bx:map" className="icon" />
                        <span>{item.location || 'Unknown Location'}</span>
                    </div>
                    <div className="date-time">
                        <Icon icon="uiw:date" className="icon" />
                        <span>{item.date || 'Unknown Date'}</span>
                    </div>
                    <div className="date-time">
                        <Icon icon="weui:time-outlined" className="icon" />
                        <span>{item.time || 'Unknown Time'}</span>
                    </div>
                </div>
            </div>
            <button className="card-button" onClick={handleButtonClick}>
                {item.Status === 'active' ? 'Kayıt' : 'Sonuçlar'}
            </button>
        </div>
    )
}

export default HackathonCard