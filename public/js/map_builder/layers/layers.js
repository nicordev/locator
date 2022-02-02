import { createLeafletTileLayer } from '../leaflet_handler/leaflet_handler.js';

export const createMapBoxLayer = () => {
    let layerUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
    let options = {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoibmljb3JkZXYiLCJhIjoiY2swbWNrNm1tMTI1MjNtbXpwZ2ZpcXJ6eCJ9.nEonoKrNrSnRZa0RpJz6XA' // My mapbox access token
    };

    return createLeafletTileLayer(layerUrl, options);
};

export const createGeoportailLayer = (layer = 'ignMap') => {
    const options = {
        minZoom: 0,
        maxZoom: 18,
        attribution: "IGN-F/Geoportail",
        tileSize: 256
    };

    const layers = {
        ignMap: `https://wxs.ign.fr/decouverte/geoportail/wmts?SERVICE=WMTS&REQUEST=GetTile&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&FORMAT=image/png&VERSION=1.0.0&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&STYLE=normal`,
        ignPhoto: `https://wxs.ign.fr/decouverte/geoportail/wmts?SERVICE=WMTS&REQUEST=GetTile&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&FORMAT=image/jpeg&VERSION=1.0.0&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&STYLE=normal`
    }

    return createLeafletTileLayer(layers[layer], options);
};

export const createOpenStreetMapLayer = () => {
    return createLeafletTileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
};

export const createHikeLayer = () => {
    return createLeafletTileLayer('https://www.visorando.com/tiles/HIKINGMAP/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> & <a href="https://www.visorando.com">visorando</a>'
    });
};