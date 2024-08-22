import { Link } from 'react-router-dom';

function Events() {
  return (
    <div>
      <h1>Events</h1>
      <nav>
        <ul>
          <li><Link to="yarismalar">Competitions</Link></li>
          <li><Link to="egitimler">Education</Link></li>
          <li><Link to="bootcamps">Bootcamps</Link></li>
          <li><Link to="hackathons">Hackathons</Link></li>
          <li><Link to="kariyer-gunleri">Career Days</Link></li>
        </ul>
      </nav>
     
      
    </div>
  );
}

export default Events;
