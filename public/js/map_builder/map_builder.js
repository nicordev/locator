import {
    createLeafletMap,
    addLeafletTileLayerToMap,
    removeLeafletLayerFromMap,
} from './leaflet_handler/leaflet_handler.js';
import { createMapBoxLayer, createGeoportailLayer } from './layers/layers.js';
import { addWaypointToMap } from './waypoint/waypoint.js';
import { initializeMenu } from './user_interface/user_interface.js';
import { UserLocator } from './UserLocator/UserLocator.js';

export const build = (mapContainerId, mapCenter) => {
    const setActiveLayer = (selectedLayerName) => {
        for (let layerName in tileLayers) {
            if (selectedLayerName === layerName) {
                addLeafletTileLayerToMap(map, tileLayers[layerName]);
                return true;
            }

            removeLeafletLayerFromMap(map, tileLayers[layerName]);
        }
    };

    const mapElement = document.querySelector(`#${mapContainerId} .map`);
    const map = createLeafletMap(mapElement, mapCenter, 13, {
        doubleClickZoom: false,
    });
    const tileLayers = {
        mapBox: createMapBoxLayer(),
        ignMap: createGeoportailLayer('ignMap'),
        ignExpress: createGeoportailLayer('ignExpress'),
        ignPhoto: createGeoportailLayer('ignPhoto'),
    };
    const userLocator = new UserLocator(map);

    initializeMenu(map, mapContainerId, setActiveLayer, userLocator.showUserOnMap);
    setActiveLayer('ignMap');

    map.on('dblclick', function (event) {
        addWaypointToMap(event, map);
    });
};
