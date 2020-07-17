import { createLeafletMap, addLeafletTileLayerToMap } from './leaflet_handler/leaflet_handler.js'
import { createMapBoxLayer, createGeoportailLayer } from './layers/layers.js'
import { addWaypointToMap } from './waypoint/waypoint.js'

export const build = () => {
    const map = createLeafletMap(
        'map', 
        [45.743, 4.8476],
        13, 
        {doubleClickZoom: false}
    );
    const tileLayers = {
        mapBox: createMapBoxLayer()
    };

    addLeafletTileLayerToMap(map, tileLayers.mapBox);

    map.on('dblclick', function (event) {
        addWaypointToMap(event, map);
    });
}