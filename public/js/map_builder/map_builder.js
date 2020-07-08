import { createLeafletMap, addLeafletTileLayerToMap, addMarkerToMap } from './leaflet_handler/leaflet_handler.js'
import { createMapBoxLayer, createGeoportailLayer } from './layers/layers.js'

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
        const marker = addMarkerToMap(map, event.latlng);
        marker.addEventListener('click', () => console.log('click on a marker'));
        marker.addEventListener('contextmenu', () => marker.remove());
        marker.addEventListener('dblclick', () => console.log('dbl click on a marker'));
    });
}