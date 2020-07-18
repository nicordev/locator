import { addMarkerToMap, addPopupToMap } from '../leaflet_handler/leaflet_handler.js'
import { geoportailApiKey } from '../../../../config/config.js'

export const addWaypointToMap = (event, map) => {
    const marker = addMarkerToMap(map, event.latlng, { icon: greenArrowDownIcon });

    marker.addEventListener('click', (clickEvent) => showWaypointData(clickEvent, marker, map));
    marker.addEventListener('contextmenu', (contextMenuEvent) => removeWaypoint(contextMenuEvent, marker));
    marker.addEventListener('dblclick', (dblClickEvent) => debugWaypoint(dblClickEvent, marker));
};

const showWaypointData = (event, marker, map) => {
    const latitude = marker.getLatLng().lat.toPrecision(5);
    const longitude = marker.getLatLng().lng.toPrecision(5);
    const altitude = fetchAltitudeFromIgn(latitude, longitude);
    console.log(altitude);
    const content = `lat: ${latitude}  lng: ${longitude}`;
    addPopupToMap(map, marker.getLatLng(), content);
}

const removeWaypoint = (event, marker) => marker.remove();

const debugWaypoint = (event, marker) => {
    console.log('Debugging a waypoint...');
    console.log(marker);
}

const greenArrowDownIcon = L.icon({
    iconUrl: './image/marker_green_arrow_down.png',
    iconRetinaUrl: './image/marker_green_arrow_down.png',
    iconSize: [20, 20],
    iconAnchor: [10, 20],
    popupAnchor: [0, -14]
});

const fetchAltitudeFromIgn = (latitude, longitude) => {

    const ignUrl = `https://wxs.ign.fr/${geoportailApiKey}/alti/rest/elevation.json?lat=${latitude}&lon=${longitude}&indent=true`;

    return fetch(ignUrl)
        .then(response => response.json())
    ;
}

// https://wxs.ign.fr/k81gswufyozu38e49nfkcepg/alti/rest/elevation.json?lat=45.747&lon=4.8651&indent=true