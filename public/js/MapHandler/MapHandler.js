function MapHandler() {

    let that = {
        makeMap: function (
            mapElementId,
            centerLat,
            centerLng,
            zoom = 13
        ) {
            return L.map(mapElementId).setView([centerLat, centerLng], zoom);
        },

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

        addMarker: function (
            map,
            markerLat,
            markerLng
        ) {
            return L.marker([markerLat, markerLng]).addTo(map);
        },

        addCircle: function (
            map,
            centerLat,
            centerLng,
            options = {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500
            }
        ) {
            return L.circle([centerLat, centerLng], options).addTo(map);
        }
    }

    return that;
}