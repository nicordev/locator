import { addMarkerToMap, openPopupOnMap, createPopup } from '../leaflet_handler/leaflet_handler.js'
import { geoportailApiKey } from '../../../config/config.js'

export const addWaypointToMap = (event, map) => {
    const marker = addMarkerToMap(map, event.latlng, { icon: greenArrowDownIcon });

    marker.addEventListener('click', (clickEvent) => showWaypointData(clickEvent, marker, map));
    marker.addEventListener('contextmenu', (contextMenuEvent) => removeWaypoint(contextMenuEvent, marker));
    marker.addEventListener('dblclick', (dblClickEvent) => debugWaypoint(dblClickEvent, marker));
};

const showWaypointData = (event, marker, map) => {
    const latitude = marker.getLatLng().lat.toPrecision(5);
    const longitude = marker.getLatLng().lng.toPrecision(5);
    let altitude = '';

    // WIP
    
    // fetchAltitudeFromIgn(latitude, longitude, function (ignData) {
    //     console.log(ignData);
    // });
    
    const popupContent = createWaypointPopupContent(latitude, longitude, altitude, marker);
    const popup = createPopup(marker.getLatLng, popupContent, marker);

    console.log({popup, popupContent})

    openPopupOnMap(map, popup);
}

const createWaypointPopupContent = function (latitude, longitude, altitude, waypointMarker) {
    const createCoordinateElement = function (content) {
        const coordinateElement = document.createElement('div');
        coordinatesElement.textContent = content;

        return coordinateElement;
    }

    const createRemoveButtonElement = function () {
        const removeButtonElement = document.createElement('button');
        removeButtonElement.textContent = 'Remove';
        removeButtonElement.addEventListener('click', function () {
            this.remove();
            waypointMarker.remove();
        });

        return removeButtonElement;
    }

    const contentElement = document.createElement('div');
    const coordinatesElement = document.createElement('div');

    coordinatesElement.appendChild(createCoordinateElement(`lat: ${Number(latitude).toFixed(4)}`));
    coordinatesElement.appendChild(createCoordinateElement(`long: ${Number(longitude).toFixed(4)}`));

    if (altitude) {
        coordinatesElement.appendChild(createCoordinateElement(`alt: ${altitude.toFixed(0)} m`));
    }

    contentElement.appendChild(coordinatesElement);
    contentElement.appendChild(createRemoveButtonElement());

    return contentElement;
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
