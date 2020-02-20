function Map() {
    let that = {
        element: {},
        builder: new MapBuilder(),
        map: {},
        layers: {},
        zoom: 13,
        center: null,

        init: (
            mapElementId,
            centerLatLng,
            zoom = 13,
            options = null
        ) => {
            that.element = document.getElementById(mapElementId);
            that.map = that.builder.buildMap(mapElementId);
            that.buildMapBoxLayer();
            that.buildGeoportailLayer('ignMap');
            that.builder.addLayersToMap(that.map, that.layers);
        },

        buildMapBoxLayer: () => {
            let layerUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
            let options = {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1Ijoibmljb3JkZXYiLCJhIjoiY2swbWNrNm1tMTI1MjNtbXpwZ2ZpcXJ6eCJ9.nEonoKrNrSnRZa0RpJz6XA' // My mapbox access token
            };

            return that.layers.mapBox = that.builder.buildTileLayer(
                layerUrl,
                options
            );
        },

        buildGeoportailLayer: (layer = 'ignMap') => {
            let apiKey = "k81gswufyozu38e49nfkcepg";
            let availableLayers = {
                ignMap: "GEOGRAPHICALGRIDSYSTEMS.MAPS",
                ign25000: "GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD",
                ignPhoto: "ORTHOIMAGERY.ORTHOPHOTOS"
            };
            let url = "https://wxs.ign.fr/" + apiKey + "/geoportail/wmts?" +
            "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
            "&STYLE=normal" +
            "&TILEMATRIXSET=PM" +
            "&FORMAT=image/jpeg" +
            "&LAYER=" + availableLayers[layer] +
            "&TILEMATRIX={z}" +
            "&TILEROW={y}" +
            "&TILECOL={x}";
            let options = {
                minZoom : 0,
                maxZoom : 18,
                attribution : "IGN-F/Geoportail",
                tileSize : 256
            };

            return that.layers[layer] = that.builder.buildTileLayer(url, options);
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