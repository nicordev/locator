function Map() {
    let that = {
        element: {},
        builder: new MapBuilder(),
        map: {},
        layers: {},
        layerControls: {},
        zoom: null,
        center: null,

        init: (
            mapElementId,
            centerLatLng,
            zoom = 13,
            options = null
        ) => {
            that.element = document.getElementById(mapElementId);
            that.center = centerLatLng;
            that.zoom = zoom;
            that.map = that.builder.buildMap(
                mapElementId, 
                centerLatLng, 
                zoom, 
                options
            );

            let ignMap = 'ignMap';
            let mapBox = 'mapBox';

            that.layers[mapBox] = that.builder.buildMapBoxLayer();
            that.layers[ignMap] = that.builder.buildGeoportailLayer(ignMap);
            that.builder.addLayersToMap(that.map, that.layers);
            that.layerControls = that.builder.addLayerControlsToMap(that.map, that.layers);
        },

        /**
         * Center the map on a position
         *
         * @param map
         * @param latlng
         * @param zoom
         */
        setCenter: function (centerLatLng) {
            that.center = centerLatLng;
            that.map.setView(
                centerLatLng,
                that.zoom
            );
        },

        /**
         * Zoom the map
         *
         * @param map
         * @param latlng
         * @param zoom
         */
        setZoom: function (zoom) {
            that.zoom = zoom;
            that.map.setView(
                that.center,
                zoom
            );
        }
    }

    return that;
}