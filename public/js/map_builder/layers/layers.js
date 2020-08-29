import { createLeafletTileLayer } from '../leaflet_handler/leaflet_handler.js'
import { geoportailApiKey } from '../../../config/config.js'

export const createMapBoxLayer = () => {
    let layerUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
    let options = {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoibmljb3JkZXYiLCJhIjoiY2swbWNrNm1tMTI1MjNtbXpwZ2ZpcXJ6eCJ9.nEonoKrNrSnRZa0RpJz6XA' // My mapbox access token
    };

    return createLeafletTileLayer(layerUrl, options);
}

export const createGeoportailLayer = (layer = 'ignMap') => {
    let availableLayers = {
        ignMap: "GEOGRAPHICALGRIDSYSTEMS.MAPS",
        ignExpress: "GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD",
        ignPhoto: "ORTHOIMAGERY.ORTHOPHOTOS"
    };
    let url = "https://wxs.ign.fr/" + geoportailApiKey + "/geoportail/wmts?" +
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

    return createLeafletTileLayer(url, options);
}

export const createOpenStreetMapLayer = () => {
    return createLeafletTileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
}

export const createHikeLayer = () => {
    return createLeafletTileLayer('https://www.visorando.com/tiles/HIKINGMAP/{z}/{x}/{y}.png', {
        attribution : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> & <a href="https://www.visorando.com">visorando</a>'
    });
}