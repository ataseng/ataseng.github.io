// import EventCard from "./EventCard";
import EventCard from "./EventCard/EventCard";
import "./Events.css";

const Events = () => {

    const events = [
        {
            title: "Eğitimler",
            to: "/events/educations",
            icon: "book-bookmark"
        },
        {
            title: "Yarışmalar",
            to: "/events/competitions",
            icon: "medal"
        },
        {
            title: "Kariyer Günleri",
            to: "/events/careerdays",
            icon: "message-rounded-dots"
        },
        {
            title: "Bootcamps",
            to: "/events/bootcamps",
            icon: "graduation"
        },
        {
            title: "Hackathons",
            to: "/events/hackathons",
            icon: "trophy"
        }, 
    ]

    return (
        <section className="events">
            <h2>Etkinlikler</h2>
            <div className="event-cards">
                {
                    events.map((event, index) => (
                        <EventCard
                            key={`eventcard_${index}`}
                            title = {event.title}
                            to = {event.to}
                            icon = {event.icon}
                        />
                    ))
                }
            </div>
        </section>
    )
}

export default Events;