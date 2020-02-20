function Map() {
    let that = {
        element,
        map,
        builder: new MapBuilder(),
        layers,

        init: (
            mapElementId,
            centerLatLng,
            zoom = 13,
            options = null
        ) => {
            that.element = document.getElementById(mapElementId);
            that.map = that.builder.buildMap(mapElementId);
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
        }
    }

    return that;
}