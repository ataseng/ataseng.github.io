import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './CompetitionsCard.css';
import { Icon } from '@iconify/react';
import CompetitionForm from '../CompetitionsCard/CompetitionForm/CompetitionForm';

const CompetitionsCard = ({ data }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleButtonClick = () => {
        if (data.status === 'active') {
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
            <img src={data.image} alt={data.title || 'No Title'} className="card-image" />
            <div className="card-content">
                <div className="tags">
                    {(data.tags || []).map((tag, index) => (
                        <span key={index} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>
                <h3 className="card-title">{data.title || 'No Title'}</h3>
                <p className="card-description">{data.description || 'No Description'}</p>
                <div className="card-footer">
                    <div className="location">
                        <Icon icon="bx:map" className="icon" />
                        <span>{data.location || 'Unknown Location'}</span>
                    </div>
                    <div className="date-time">
                        <Icon icon="uiw:date" className="icon" />
                        <span>{data.date || 'Unknown Date'}</span>
                    </div>
                    <div className="date-time">
                        <Icon icon="weui:time-outlined" className="icon" />
                        <span>{data.time || 'Unknown Time'}</span>
                    </div>
                </div>
            </div>
            <button className="card-button" onClick={handleButtonClick}>
                {data.status === 'active' ? 'Kayıt' : 'Sonuçlar'}
            </button>

            {isFormOpen && ReactDOM.createPortal(
                <CompetitionForm onClose={handleCloseForm} />,
                document.getElementById('modal-root')
            )}
        </div>
    );
};

export default CompetitionsCard;
