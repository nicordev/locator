import {
    centerMap,
    createDivIcon,
    createMarker
} from '../leaflet_handler/leaflet_handler.js';
import { displayInfoBox } from '../user_interface/user_interface.js'

export function UserLocator(map) {
    let userMarker = createMarker([0, 0], {
        icon: createDivIcon({className: 'user-icon'})
    });
    let fullUserCoordinates = {};
    let userLatLng = {};
    const userInfoBoxElement = document.getElementById('info-box-user');

    const showUserCoordinates = (userLatLng, accuracy) => {
        userInfoBoxElement.innerHTML = '';
        userInfoBoxElement.appendChild(createInfoBoxItem("You're here:"));
        userInfoBoxElement.appendChild(createInfoBoxItem(`Latitude: ${userLatLng.lat.toFixed(4)}`));
        userInfoBoxElement.appendChild(createInfoBoxItem(`Longitude: ${userLatLng.lng.toFixed(4)}`));
        userInfoBoxElement.appendChild(createInfoBoxItem(`Precision: ${accuracy.toFixed(0)} m`));
    }

    const createInfoBoxItem = (textContent) => {
        const itemElement = document.createElement('div');
        itemElement.textContent = textContent;
        
        return itemElement;
    };

    this.showUserOnMap = function (geolocationData) {
        fullUserCoordinates = geolocationData.coords;
        userLatLng = {
            lat: fullUserCoordinates.latitude,
            lng: fullUserCoordinates.longitude,
        };
        
        userMarker.setLatLng(userLatLng);
        userMarker.addEventListener('click', function () {
            displayInfoBox();
            showUserCoordinates(userLatLng, fullUserCoordinates.accuracy);
        });
        userMarker.remove();
        userMarker.addTo(map);
        centerMap(map, userLatLng);
    }
}