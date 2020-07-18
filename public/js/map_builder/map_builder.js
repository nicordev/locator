import { createLeafletMap, addLeafletTileLayerToMap } from './leaflet_handler/leaflet_handler.js'
import { createMapBoxLayer, createGeoportailLayer } from './layers/layers.js'
import { addWaypointToMap } from './waypoint/waypoint.js'

export const build = (mapContainerId) => {
    const mapElement = document.querySelector(`#${mapContainerId} .map`);
    const map = createLeafletMap(
        mapElement, 
        [45.743, 4.8476],
        13, 
        {doubleClickZoom: false}
    );
    const tileLayers = {
        mapBox: createMapBoxLayer(),
        ignMap: createGeoportailLayer('ignMap'),
        ign25000: createGeoportailLayer('ign25000'),
        ignPhoto: createGeoportailLayer('ignPhoto'),
    };

    initializeMenu(mapContainerId);

    addLeafletTileLayerToMap(map, tileLayers.ignMap);

    map.on('dblclick', function (event) {
        addWaypointToMap(event, map);
    });
}

const initializeMenu = (mapContainerId) => {
    const menuElement = document.querySelector(`#${mapContainerId} .menu`);
    console.log(menuElement)
}