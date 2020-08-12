import {
    centerMap,
    createDivIcon,
    createMarker
} from '../leaflet_handler/leaflet_handler.js';

export function UserLocator(map) {
    let userMarker = createMarker([0, 0], {
        icon: createDivIcon({className: 'user-icon'})
    });

    this.showUserOnMap = function (geolocationData) {
        const fullUserCoordinates = geolocationData.coords;
        const userLatLng = {
            lat: fullUserCoordinates.latitude,
            lng: fullUserCoordinates.longitude,
        };
        userMarker.setLatLng(userLatLng);
        userMarker.remove();
        userMarker.addTo(map);
        centerMap(map, userLatLng);
    }
}
