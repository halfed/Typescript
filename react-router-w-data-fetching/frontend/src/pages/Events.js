import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';


import EventsList from '../components/EventsList';

function EventsPage() {

    // FROM COMMENT BELOW WE DONT NEED TO USE EVENTS BUT 'DATA'
    // const events = useLoaderData();
    // const data = useLoaderData();

    const { events } = useLoaderData();
    return (
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>
    );
}

export default EventsPage;

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        throw json({ message: 'Could not fetch events.' },
            { status: 500, });
        
    } else {
        const resData = await response.json();
        return resData.events;
    }
}

export function loader() {
    return defer({
        events: loadEvents()
    });
    // BUILT IN BROWSER FETCH METHOD RETURNS A PROMISE THAT RESOLVES TO A BROWSER REPSPONSE
    // const response = await fetch('http://localhost:8080/events');

    // if (!response.ok) {
    //     // return { isError: true, message: 'Could not fetch events' };
    //     // throw { message: 'Could not fetch events' };

    //     /// This could be used but react-router-dom has a json helper to use
    //     // throw new Response(JSON.stringify(
    //     //     { message: 'Could not fetch events.' }),
    //     //     { status: 500, });

    //     throw json({ message: 'Could not fetch events.' },
    //         { status: 500, });
        
    // } else {
    //     // WITH REACT ROUTER SUPPORT FOR RESPONSE OBJECT AND DATA EXTRACTION
    //     // WE CAN TAKE THE RESPONSE OBJECT AND USE THAT TO RETURN, SO NO 
    //     // NEED FOR BELOW
    //     // const resData = await response.json();
    //     // const res = new Response();
    //     // return resData.events;
    //     return response;
    // }
}