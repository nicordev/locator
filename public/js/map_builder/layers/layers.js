import { createLeafletTileLayer } from '../leaflet_handler/leaflet_handler.js'

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

    return createLeafletTileLayer(url, options);
}