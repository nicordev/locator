import {
    centerMap,
    createDivIcon,
    createMarker
} from '../leaflet_handler/leaflet_handler.js';

export function UserLocator(map) {
    let userMarker = createMarker([0, 0], {
        icon: createDivIcon({className: 'user-icon'})
    });
    let fullUserCoordinates = {};
    let userLatLng = {};
    const infoBoxElement = document.getElementById('info-box');

    const showUserCoordinates = (userLatLng, accuracy) => {
        infoBoxElement.innerHTML = '';
        infoBoxElement.appendChild(createInfoBoxItem("You're here:"));
        infoBoxElement.appendChild(createInfoBoxItem(`Latitude: ${userLatLng.lat.toFixed(4)}`));
        infoBoxElement.appendChild(createInfoBoxItem(`Longitude: ${userLatLng.lng.toFixed(4)}`));
        infoBoxElement.appendChild(createInfoBoxItem(`Precision: ${accuracy.toFixed(0)} m`));
    }

    const createInfoBoxItem = (textContent) => {
        const itemElement = document.createElement('div');
        itemElement.textContent = textContent;
        
        return itemElement;
    };

    const hideInfoBox = function () {
        this.classList.add('hidden');
    }

    infoBoxElement.addEventListener('dblclick', hideInfoBox);

    this.showUserOnMap = function (geolocationData) {
        fullUserCoordinates = geolocationData.coords;
        userLatLng = {
            lat: fullUserCoordinates.latitude,
            lng: fullUserCoordinates.longitude,
        };
        
        userMarker.setLatLng(userLatLng);
        userMarker.addEventListener('click', function () {
            infoBoxElement.classList.remove('hidden');
            showUserCoordinates(userLatLng, fullUserCoordinates.accuracy);
        });
        userMarker.remove();
        userMarker.addTo(map);
        centerMap(map, userLatLng);
    }
}
