import { addMarkerToMap, openPopupOnMap, createPopup, createThenOpenPopupToMap } from '../leaflet_handler/leaflet_handler.js'
import { geoportailApiKey } from '../../../config/config.js'
import { displayInfoBox } from '../user_interface/user_interface.js'

export function Waypoint(initialMarker) {
    let marker = initialMarker;
    const id = Date.now();

    this.getMarker = () => marker;
    this.getId = () => id;

    this.removeMarker = function () {
        marker.remove();
    }

    this.setMarker = function (newMarker) {
        this.removeMarker();
        marker = newMarker;
    }
}

export const addWaypointToMap = (event, state) => {
    const { map } = state;
    const marker = addMarkerToMap(map, event.latlng, { icon: greenArrowDownIcon });
    const waypoint = new Waypoint(marker);

    state.waypoints[waypoint.getId()] = waypoint;
    showWaypointData(waypoint, state);

    marker.addEventListener('click', () => showWaypointData(waypoint, state));
    marker.addEventListener('contextmenu', () => removeWaypoint(waypoint, state));
    marker.addEventListener('dblclick', (dblClickEvent) => debug(dblClickEvent, waypoint, state));
};

const showWaypointData = (waypoint, state) => {
    const waypointInfoBoxElement = document.getElementById('info-box-waypoint');
    const marker = waypoint.getMarker();
    const latitude = marker.getLatLng().lat.toPrecision(5);
    const longitude = marker.getLatLng().lng.toPrecision(5);
    let altitude = '';

    if (state.activeWaypoint instanceof Waypoint) {
        state.activeWaypoint.getMarker().setIcon(greenArrowDownIcon);
    }

    state.activeWaypoint = waypoint;

    marker.setIcon(greenOrangeArrowDownIcon);
    
    // fetchAltitudeFromIgn(latitude, longitude, function (ignData) {
    //     console.log(ignData);
    // });

    waypointInfoBoxElement.innerHTML = '';
    waypointInfoBoxElement.appendChild(createWaypointPopupContent(latitude, longitude, altitude, waypoint, state));

    displayInfoBox();
}

const createWaypointPopupContent = function (latitude, longitude, altitude, waypoint, state) {
    const contentElement = document.createElement('div');
    const coordinatesElement = document.createElement('div');

    const createCoordinateElement = function (content) {
        const coordinateElement = document.createElement('div');
        coordinateElement.textContent = content;
        
        return coordinateElement;
    }

    const createRemoveButtonElement = function () {
        const removeButtonElement = document.createElement('button');
        removeButtonElement.textContent = 'Remove';
        removeButtonElement.addEventListener('click', function () {
            this.remove();
            removeWaypoint(waypoint, state);
            coordinatesElement.remove();
        });

        return removeButtonElement;
    }

    coordinatesElement.appendChild(createCoordinateElement(`lat: ${Number(latitude).toFixed(4)}`));
    coordinatesElement.appendChild(createCoordinateElement(`long: ${Number(longitude).toFixed(4)}`));
    
    if (altitude) {
        coordinatesElement.appendChild(createCoordinateElement(`alt: ${altitude.toFixed(0)} m`));
    }
    
    contentElement.appendChild(coordinatesElement);
    contentElement.appendChild(createRemoveButtonElement());
    
    return contentElement;
}

const removeWaypoint = (waypoint, state) => {
    waypoint.removeMarker();
    delete state.waypoints[waypoint.getId()];
}

const debug = (event, waypoint, state) => {
    console.log({event, waypoint, state});
}

const greenArrowDownIcon = L.icon({
    iconUrl: './image/marker_green_arrow_down.png',
    iconRetinaUrl: './image/marker_green_arrow_down.png',
    iconSize: [20, 20],
    iconAnchor: [10, 20],
    popupAnchor: [0, -14]
});

const greenOrangeArrowDownIcon = L.icon({
    iconUrl: './image/marker_green_orange_arrow_down.png',
    iconRetinaUrl: './image/marker_green_orange_arrow_down.png',
    iconSize: [20, 20],
    iconAnchor: [10, 20],
    popupAnchor: [0, -14]
});

const fetchAltitudeFromIgn = (latitude, longitude, callback) => {

    const ignUrl = `https://wxs.ign.fr/${geoportailApiKey}/alti/rest/elevation.json?lat=${latitude}&lon=${longitude}&indent=true`;

    fetch(ignUrl)
        .then(response => response.json().elevations[0].z)
        .then(callback)
    ;
}

// https://wxs.ign.fr/k81gswufyozu38e49nfkcepg/alti/rest/elevation.json?lat=45.747&lon=4.8651&indent=true

// Convert coordinates:
//
// Find in the source code of https://www.fcc.gov/media/radio/dms-decimal

// function convertDegreesToDecimal() {
//     form10.alat.value = ((Math.round(absdlat + (absmlat / 60.) + (absslat / 3600.)) / 1000000)) * latsign;

//     //    if(compareNumber(latsign, 0) == '-' )  form10.alat.value = 0.0 - form10.alat.value;
//     // We have to do it this way because IE11 doesn't handle negative numbers correctly

//     form10.alon.value = ((Math.round(absdlon + (absmlon / 60.) + (absslon / 3600)) / 1000000)) * lonsign;

//     //     if(compareNumber(lonsign, 0) == '-' )  form10.alon.value = 0.0 - form10.alon.value;
//     // We have to do it this way because IE11 doesn't handle negative numbers correctly
// }

// function convertDecimalToDegrees() {
//     form11.deglat.value = ((Math.floor(latAbs / 1000000) * signlat) + '° ' + Math.floor(((latAbs / 1000000) - Math.floor(latAbs / 1000000)) * 60) + '\' ' + (Math.floor(((((latAbs / 1000000) - Math.floor(latAbs / 1000000)) * 60) - Math.floor(((latAbs / 1000000) - Math.floor(latAbs / 1000000)) * 60)) * 100000) * 60 / 100000) + '"');
    
//     form11.deglon.value = ((Math.floor(lonAbs / 1000000) * signlon) + '° ' + Math.floor(((lonAbs / 1000000) - Math.floor(lonAbs / 1000000)) * 60) + '\' ' + (Math.floor(((((lonAbs / 1000000) - Math.floor(lonAbs / 1000000)) * 60) - Math.floor(((lonAbs / 1000000) - Math.floor(lonAbs / 1000000)) * 60)) * 100000) * 60 / 100000) + '"');
// }
