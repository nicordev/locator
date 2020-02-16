/**
 * Interface between common needs to draw maps and the leaflet library
 *
 * @returns {{drawCircle: (function(*=, *=, *=): *), addPopup: (function(*=, *=, *=): *), makeMap: (function(*=, *=, *=, *=): *), addTileLayer: addTileLayer, addMarker: (function(*=, *=): *)}}
 * @constructor
 */
function MapHandler() {

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
        makeMap: function (
            mapElementId,
            centerLatLng,
            zoom = 13,
            options = null
        ) {
            return L.map(mapElementId, options).setView(centerLatLng, zoom);
        },

        makeTileLayer: function (
            layerUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
            layerOptions = {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1Ijoibmljb3JkZXYiLCJhIjoiY2swbWNrNm1tMTI1MjNtbXpwZ2ZpcXJ6eCJ9.nEonoKrNrSnRZa0RpJz6XA' // My mapbox access token
            }
        ) {
            return L.tileLayer(layerUrl, layerOptions);
        },

        /**
         * Add a tile layer to the map (the background)
         *
         * @param map
         * @param layerUrl
         * @param layerOptions
         */
        addTileLayer: function (
            map,
            layerUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
            layerOptions = {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1Ijoibmljb3JkZXYiLCJhIjoiY2swbWNrNm1tMTI1MjNtbXpwZ2ZpcXJ6eCJ9.nEonoKrNrSnRZa0RpJz6XA' // My mapbox access token
            }
        ) {
            L.tileLayer(layerUrl, layerOptions).addTo(map);
        },

        /**
         * Add tile layers to the map (the background)
         *
         * @param map
         * @param layerUrl
         * @param layerOptions
         */
        addTileLayers: function (
            map,
            layers
        ) {
            for (layer of layers) {
                layer.addTo(map);
            }
        },

        /**
         * Add a marker
         *
         * @param map
         * @param markerLatLng
         * @returns {*}
         */
        addMarker: function (
            map,
            markerLatLng
        ) {
            return L.marker(markerLatLng).addTo(map);
        },

        /**
         * Add a popup
         * @param map
         * @param latlng
         * @param content
         * @returns {*}
         */
        addPopup: function (map, latlng, content) {

            return L.popup()
                .setLatLng(latlng)
                .setContent(content)
                .openOn(map);
        },

        /**
         * Center the map on a position
         *
         * @param map
         * @param latlng
         * @param zoom
         */
        centerMap: function (map, latlng, zoom) {

            map.setView(
                latlng,
                zoom
            );
        },

        /**
         * Draw a circle
         *
         * @param map
         * @param centerLatLng
         * @param options
         * @returns {*}
         */
        drawCircle: function (
            map,
            centerLatLng,
            options = {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500
            }
        ) {
            return L.circle(centerLatLng, options).addTo(map);
        }
    };

    return that;
}