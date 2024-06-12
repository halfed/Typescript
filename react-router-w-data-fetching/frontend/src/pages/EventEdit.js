import { useRouteLoaderData } from 'react-router-dom';
import EventForm from '../components/EventForm';

function EventEdit() {
    const data = useRouteLoaderData('event-detail');
    return <EventForm method="patch" event={data.event} />;
 
}

export default EventEdit;