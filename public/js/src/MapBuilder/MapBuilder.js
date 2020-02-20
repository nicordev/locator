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

        buildTileLayer: (
            layerUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
            layerOptions = {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1Ijoibmljb3JkZXYiLCJhIjoiY2swbWNrNm1tMTI1MjNtbXpwZ2ZpcXJ6eCJ9.nEonoKrNrSnRZa0RpJz6XA' // My mapbox access token
            }
        ) => L.tileLayer(layerUrl, layerOptions),

        addLayersToMap: (map, layers) => {
            for (layer of layers) {
                layer.addTo(map);
            }
        }
    }

    return that;
}