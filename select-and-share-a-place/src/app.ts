import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;
const GOOGLE_API_KEY = 'YOUR_API_KEY_HERE';

declare var google: any;
let map;

type GoogleGeocodingResponse = {
    results: {geometry: {location: { lat: number; lng: number } } }[];
    status: 'OK' | 'ZERO_RESULTS'
}

async function initMap(coordinates: any) {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
    // THE MAP
    map = new Map(document.getElementById("map"), {
      center: coordinates,
      zoom: 15,
      mapId: "DEMO_MAP_ID",
    });

    // THE MARKER   
    new AdvancedMarkerElement({
    map: map,
    position: coordinates,
    title: "DENVER",
    });
  }

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    // send this to Google's API!
    
    axios
    .get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${enteredAddress}&key=${GOOGLE_API_KEY}`)
    .then(response => {
        console.log(response);
        if(response.data.status !== 'OK') {
            throw new Error('Could not fetch location!');
        }
        const coordinates = response.data.results[0].geometry.location;
        console.log(coordinates);

        initMap(coordinates);


    })
    .catch(err => {
        alert(err.message);
        console.log(err);
    });
}

form.addEventListener('submit', searchAddressHandler);