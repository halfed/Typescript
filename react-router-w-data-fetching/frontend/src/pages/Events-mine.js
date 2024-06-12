import { Link } from 'react-router-dom';
import EventsNavigation from '../components/EventsNavigation';

const EVENTS = [
    { id: 'e1', title: 'Dummy Event 1' },
    { id: 'e2', title: 'Dummy Event 2' },
    { id: 'e3', title: 'Dummy Event 3' },
    { id: 'e4', title: 'Dummy Event 4' },
]

function Events() {
    return (
        <>
            <h1>Events</h1>
            <ul>
                {
                    EVENTS.map((event) => (
                        <li key={event.id}>
                            <Link to={`/events/${event.id}`}>{event.title}</Link>
                        </li>
                        
                    ))
                }
            </ul>
        </>
    );
};

export default Events;