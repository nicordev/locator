function Map() {
    const mapBuilder = new MapBuilder();
    let element = null;
    let map = null;
    let layers = [];
    let layerControl = null;
    let zoom = null;
    let center = null;

    this.init = (
        mapElementId,
        centerLatLng,
        zoom = 13,
        options = null
    ) => {
        element = document.getElementById(mapElementId);
        center = centerLatLng;
        zoom = zoom;
        map = builder.buildMap(
            mapElementId, 
            centerLatLng, 
            zoom, 
            options
        );

        layers[mapBox] = builder.buildMapBoxLayer();
        builder.addLayersToMap(map, layers);
        layerControls = builder.addLayerControlsToMap(map, layers);
    };

    this.addIgnLayer = () => {
        let ignMap = 'ignMap';

        layers[ignMap] = builder.buildGeoportailLayer(ignMap);
        builder.addLayerToMap(map, layers[ignMap]);
    }

    this.addMapBoxLayer = () => {
        let mapBox = 'mapBox';

        layers[mapBox] = builder.buildGeoportailLayer(mapBox);
        builder.addLayerToMap(map, layers[mapBox]);
    }
}