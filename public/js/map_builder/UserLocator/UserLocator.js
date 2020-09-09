import {
    centerMap,
    createDivIcon,
    createMarker,
} from '../leaflet_handler/leaflet_handler.js';
import { displayInfoBox } from '../user_interface/user_interface.js';

export function UserLocator(state) {
    let userMarker = createMarker([0, 0], {
        icon: createDivIcon({ className: 'user-icon' }),
    });
    let fullUserCoordinates = {};
    let userLatLng = {};
    const userInfoBoxElement = document.getElementById('info-box-user');

    const showUserCoordinates = (userLatLng, accuracy) => {
        displayInfoBox();
        userInfoBoxElement.innerHTML = '';
        userInfoBoxElement.appendChild(createInfoBoxGroupTitle("You're here:"));
        userInfoBoxElement.appendChild(
            createInfoBoxGroupItem(`Latitude: ${userLatLng.lat.toFixed(4)}`)
        );
        userInfoBoxElement.appendChild(
            createInfoBoxGroupItem(`Longitude: ${userLatLng.lng.toFixed(4)}`)
        );
        userInfoBoxElement.appendChild(
            createInfoBoxGroupItem(`Precision: ${accuracy.toFixed(0)} m`)
        );
    };

    const createInfoBoxGroupItem = (textContent) => {
        const itemElement = document.createElement('div');
        itemElement.textContent = textContent;

        return itemElement;
    };

    const createInfoBoxGroupTitle = (textContent) => {
        const itemElement = document.createElement('div');
        itemElement.textContent = textContent;
        itemElement.classList.add('info-box-group-title');

        return itemElement;
    };

    this.showUserOnMap = function (geolocationData) {
        const { map } = state;
        fullUserCoordinates = geolocationData.coords;
        userLatLng = {
            lat: fullUserCoordinates.latitude,
            lng: fullUserCoordinates.longitude,
        };
        state.userCoordinates = {
            latLng: userLatLng,
            ...fullUserCoordinates.accuracy,
        };
        showUserCoordinates(userLatLng, fullUserCoordinates.accuracy);

        userMarker.setLatLng(userLatLng);
        userMarker.addEventListener('click', () =>
            showUserCoordinates(userLatLng, fullUserCoordinates.accuracy)
        );
        userMarker.remove();
        userMarker.addTo(map);
        centerMap(map, userLatLng);
    };
}
