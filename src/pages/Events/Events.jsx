import { Link } from 'react-router-dom';
import './Events.css'
import Data from './Data.json'
import { Icon } from '@iconify/react/dist/iconify.js';

function Events() {

  
  
  return (
    <div className="sidebar-margin">
        <div className="event-container">
              {
                Data.map((item,key) => (
                  <div key={key} className="event-card">

                  <div className="event-card-icon">
                    <Icon icon={item.icon} />
                  </div>
      
                  <div className="event-card-title">
                      <h3>{item.title}</h3>
                  </div>
      
                  <div className="event-card-description">
                      <p>{item.description}</p>
                  </div>
      
                  <div className="event-card-button">
                    <Link style={{textDecoration:"none"}} to={item.url}><p>Detayları Gör</p></Link>
                  </div>
      
                </div>
                ))
              }
        </div>
    </div>
  );
}

export default Events;
