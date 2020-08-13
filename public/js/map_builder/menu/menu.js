import { startGeolocation, stopGeolocation } from '../../geolocation/geolocation.js'
import { centerMap } from '../leaflet_handler/leaflet_handler.js'

export const initializeMenu = (mapContainerId, selectedLayerCallback, geolocationSuccessCallback) => {
    const menuElement = selectElementInsideMapContainer(mapContainerId, '.menu');

    initializeShowMenuButton(mapContainerId, menuElement);
    initializeLocateUserButton(mapContainerId, geolocationSuccessCallback);

    const layerSelectorElement = selectElementInsideMapContainer(mapContainerId, '.layer-selector');

    layerSelectorElement.id = `${mapContainerId}-layer-selector`;
    layerSelectorElement.addEventListener('change', function () {
        selectedLayerCallback(this.selectedOptions[0].value);
    })
}

export const selectElementInsideMapContainer = (mapContainerId, elementSelector) => document.querySelector(`#${mapContainerId} ${elementSelector}`);

export const isHidden = (element) => {
    return element.style.display === 'none' || element.classList.contains('hidden');
}

export const hideElement = (element) => {
    element.classList.add('hidden');
}

export const showElement = (element) => {
    element.classList.remove('hidden');
}

const initializeShowMenuButton = (mapContainerId, menuElement) => {
    const showMenuButtonElement = selectElementInsideMapContainer(mapContainerId, '.show-menu-button');
    
    showMenuButtonElement.addEventListener('click', function () {
        if (isHidden(menuElement)) {
            showElement(menuElement);
            this.classList.add('command-selected');
        } else {
            hideElement(menuElement);
            this.classList.remove('command-selected');
        }
    });
}

const initializeLocateUserButton = (mapContainerId, geolocationSuccessCallback) => {
    const locateUserButtonElement = selectElementInsideMapContainer(mapContainerId, '.locate-user-button');
    let geolocationId = null;

    locateUserButtonElement.addEventListener('click', function () {
        if (this.classList.contains('command-selected')) {
            this.classList.remove('command-selected');
            stopGeolocation(geolocationId);
        } else {
            this.classList.add('command-selected');
            geolocationId = startGeolocation(
                geolocationSuccessCallback, 
                () => console.log('Failed to locate user.')
            );
        }
    });
}
