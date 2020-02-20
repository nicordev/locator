function MapBuilder() {
    let that = {
        /**
         * Create a Leaflet map
         *
         * @param mapElementId
         * @param centerLatLng
         * @param zoom
         * @param options
         * @returns {*}
         */
        buildMap: (
            mapElementId,
            centerLatLng = [0, 0],
            zoom = 13,
            options = null
        ) => L.map(mapElementId, options).setView(centerLatLng, zoom),

        buildTileLayer: (layerUrl, layerOptions) => L.tileLayer(layerUrl, layerOptions),

        addLayersToMap: (map, layers) => {
            if (Array.isArray(layers)) {
                for (let layer of layers) {
                    layer.addTo(map);
                }
            } else {
                for (let layer in layers) {
                    layers[layer].addTo(map);
                }
            }
        }
    }

    return that;
}