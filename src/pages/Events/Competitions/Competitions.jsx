import EventCard from "../EventCard/EventCard";

const Competitions = () => {
	
	const competitions = [
        {
            title: "1. Geleneksel Algoritma Yarışması",
            to: "/events/competitions/1",
			icon: "medal"
        }
    ];
	
	return (
		<section className="events">
            <h2>Yarışmalar</h2>
            <div className="event-cards">
                {
                    competitions.map((competition, index) => (
                        <EventCard
                            key={`competitioncard_${index}`}
                            title = {competition.title}
                            to = {competition.to}
							icon = {competition.icon}
                        />
                    ))
                }
            </div>
        </section>
	)
}

export default Competitions