import { addMarkerToMap } from '../leaflet_handler/leaflet_handler.js'

export const addWaypointToMap = (event, map) => {
    const marker = addMarkerToMap(map, event.latlng, { icon: greenArrowDownIcon });

    marker.addEventListener('click', (clickEvent) => showWaypointData(clickEvent, marker));
    marker.addEventListener('contextmenu', (contextMenuEvent) => removeWaypoint(contextMenuEvent, marker));
    marker.addEventListener('dblclick', (dblClickEvent) => debugWaypoint(dblClickEvent, marker));
};

const showWaypointData = (event, marker) => {
    console.log('Showing waypoint data...');
    console.info(event.latlng);
}

const removeWaypoint = (event, marker) => {
    console.log('Removing waypoint...');
    marker.remove();
}

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