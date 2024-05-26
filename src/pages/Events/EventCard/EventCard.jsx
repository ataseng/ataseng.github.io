import { Link } from "react-router-dom";
import "./EventCard.css";
import { useRef } from "react";

const EventCard = ({title, to, icon}) => {
	const boxIcon = useRef(null);

	const cardMouseEnter = () => {
		boxIcon.current.setAttribute("animation", "tada");
	}

	const cardMouseLeave = () => {
		boxIcon.current.removeAttribute("animation");
	}

	return (
		<Link to={to} className="event-card-link" onMouseEnter={() => cardMouseEnter()} onMouseLeave={() => cardMouseLeave()}>
			<article className='event-card'>
				<box-icon type="solid" name={icon} ref={boxIcon}></box-icon>
				<h3>
					{title}
				</h3>
			</article>
		</Link>
	)
}

export default EventCard