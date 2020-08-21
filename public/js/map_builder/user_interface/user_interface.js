import {
    startGeolocation,
    stopGeolocation,
} from '../../geolocation/geolocation.js';
import { centerMap } from '../leaflet_handler/leaflet_handler.js';

export const showInfoBoxDisplay = () => {
    const infoBoxElement = document.getElementById('info-box');

    if (infoBoxElement.classList.contains('hidden')) {
        infoBoxElement.classList.remove('hidden');
        return;
    }

    infoBoxElement.classList.add('hidden');
}

export const displayInfoBox = () => {
    const infoBoxElement = document.getElementById('info-box');
    infoBoxElement.classList.remove('hidden');
}

export const initializeMenu = (
    map,
    mapContainerId,
    selectedLayerCallback,
    geolocationSuccessCallback
) => {
    const menuElement = selectElementInsideMapContainer(
        mapContainerId,
        '.menu'
    );
    
    initializeShowMenuButton(mapContainerId, menuElement);
    initializeInfoBox();
    initializeLocateUserButton(mapContainerId, geolocationSuccessCallback);

    const layerSelectorElement = selectElementInsideMapContainer(
        mapContainerId,
        '.layer-selector'
    );

    layerSelectorElement.id = `${mapContainerId}-layer-selector`;
    layerSelectorElement.addEventListener('change', function () {
        selectedLayerCallback(this.selectedOptions[0].value);
    });

    initializeSearchBar(map);
};

export const selectElementInsideMapContainer = (
    mapContainerId,
    elementSelector
) => document.querySelector(`#${mapContainerId} ${elementSelector}`);

export const isHidden = (element) => {
    return (
        element.style.display === 'none' || element.classList.contains('hidden')
    );
};

export const hideElement = (element) => {
    element.classList.add('hidden');
};

export const showElement = (element) => {
    element.classList.remove('hidden');
};

const initializeShowMenuButton = (mapContainerId, menuElement) => {
    const showMenuButtonElement = selectElementInsideMapContainer(
        mapContainerId,
        '.show-menu-button'
    );

    showMenuButtonElement.addEventListener('click', function () {
        if (isHidden(menuElement)) {
            showElement(menuElement);
            this.classList.add('command-selected');
        } else {
            hideElement(menuElement);
            this.classList.remove('command-selected');
        }
    });
};

const hideCurrentElement = function () {
    this.classList.add('hidden');
}

const initializeInfoBox = () => {
    const infoBoxElement = document.getElementById('info-box');

    infoBoxElement.addEventListener('dblclick', hideCurrentElement);
}

const initializeLocateUserButton = (
    mapContainerId,
    geolocationSuccessCallback
) => {
    const locateUserButtonElement = selectElementInsideMapContainer(
        mapContainerId,
        '.locate-user-button'
    );
    let geolocationId = null;

    locateUserButtonElement.addEventListener('click', function () {
        if (this.classList.contains('command-selected')) {
            this.classList.remove('command-selected');
            stopGeolocation(geolocationId);
        } else {
            this.classList.add('command-selected');
            geolocationId = startGeolocation(geolocationSuccessCallback, () =>
                console.log('Failed to locate user.')
            );
        }
    });
};

const initializeSearchBar = () => {
    const searchInputElement = document.getElementById('search-criteria');
    const searchButtonElement = document.getElementById('search-button');

    searchButtonElement.addEventListener('click', function () {
        search(searchInputElement.value);
    });
};

const search = (criteria) => {
    const query = `https://nominatim.openstreetmap.org/search?q=${criteria}&format=json`;

    fetch(query)
        .then((response) => response.json())
        .then((results) => {
            const searchResultElement = document.getElementById('search-results');
    
            searchResultElement.innerHTML = '';
    
            if (results.length === 0) {
                searchResultElement.textContent = 'Nothing found.';
                return;
            }
    
            for (let result of results) {
                searchResultElement.appendChild(createResultItem(result));
            }
        });
};

const createResultItem = (result) => {
    const resultItemElement = document.createElement('div');
    resultItemElement.classList.add('search-result');
    resultItemElement.textContent = `${result.display_name} ${result.lat} ${result.lon}`;
    
    return resultItemElement
};
