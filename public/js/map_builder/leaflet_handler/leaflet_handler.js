export const createLeafletMap = (
    mapElementId,
    centerLatLng = [0, 0],
    zoom = 13,
    options = null
) => L.map(mapElementId, options).setView(centerLatLng, zoom);

export const createLeafletTileLayer = (layerUrl, layerOptions) => L.tileLayer(layerUrl, layerOptions);

export const addLeafletTileLayerToMap = (map, layer) => layer.addTo(map);

export const removeLeafletLayerFromMap = (map, layer) => map.removeLayer(layer);

export const addMarkerToMap = (map, markerLatLng, options = null) => L.marker(markerLatLng, options).addTo(map);

export const createMarkerIcon = (
    iconUrl, 
    iconSize, 
    iconAnchor, 
    popupAnchor = null,
    shadowUrl = null, 
    shadowSize = null, 
    shadowAnchor = null
) => L.icon({
    iconUrl,
    shadowUrl,
    iconSize,
    shadowSize,
    iconAnchor,
    shadowAnchor,
    popupAnchor
});

export const createDivIcon = (options) => L.divIcon(options);

export const addPopupToMap = (map, latlng, content) => L.popup()
    .setLatLng(latlng)
    .setContent(content)
    .openOn(map);
