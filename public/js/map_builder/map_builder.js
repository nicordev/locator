import {
    createLeafletMap,
    addLeafletTileLayerToMap,
    removeLeafletLayerFromMap,
} from './leaflet_handler/leaflet_handler.js';
import {
    createMapBoxLayer,
    createGeoportailLayer,
    createOpenStreetMapLayer,
    createHikeLayer,
} from './layers/layers.js';
import { addWaypointToMap } from './waypoint/waypoint.js';
import { initializeMenu } from './user_interface/user_interface.js';
import { UserLocator } from './UserLocator/UserLocator.js';

export const build = (mapContainerId, mapCenter) => {
    const setActiveLayer = (selectedLayerName) => {
        for (let layerName in tileLayers) {
            if (selectedLayerName === layerName) {
                addLeafletTileLayerToMap(map, tileLayers[layerName]);
            } else {
                removeLeafletLayerFromMap(map, tileLayers[layerName]);
            }
        }
    };

    const mapElement = document.querySelector(`#${mapContainerId} .map`);
    const map = createLeafletMap(mapElement, mapCenter, 13, {
        doubleClickZoom: false,
    });
    const tileLayers = {
        hike: createHikeLayer(),
        openStreetMap: createOpenStreetMapLayer(),
        mapBox: createMapBoxLayer(),
        ignMap: createGeoportailLayer('ignMap'),
        ignExpress: createGeoportailLayer('ignExpress'),
        ignPhoto: createGeoportailLayer('ignPhoto'),
    };
    const state = {};
    const userLocator = new UserLocator(state);

    state.tileLayers = tileLayers;
    state.map = map;
    state.mapContainerId = mapContainerId;
    state.selectedLayerCallback = setActiveLayer;
    state.geolocationSuccessCallback = userLocator.showUserOnMap;
    state.waypoints = {};
    initializeMenu(state);
    setActiveLayer('hike');

    map.on('dblclick', function (event) {
        addWaypointToMap(event, state);
    });
};
