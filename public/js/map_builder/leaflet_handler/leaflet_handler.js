export const createLeafletMap = (
    mapElementId,
    centerLatLng = [0, 0],
    zoom = 13,
    options = null
) => L.map(mapElementId, options).setView(centerLatLng, zoom);

export const createLeafletTileLayer = (layerUrl, layerOptions) => L.tileLayer(layerUrl, layerOptions);

export const addLeafletTileLayerToMap = (map, layer) => {
    layer.addTo(map);
}

export const removeLeafletLayerFromMap = (map, layer) => map.removeLayer(layer);

export const addMarkerToMap = (map, markerLatLng) => L.marker(markerLatLng).addTo(map);