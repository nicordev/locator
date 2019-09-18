function MapHandler() {

    let that = {
        makeMap: function (
            mapElementId,
            centerLatLng,
            zoom = 13,
            options = null
        ) {
            return L.map(mapElementId, options).setView(centerLatLng, zoom);
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
            markerLatLng
        ) {
            return L.marker(markerLatLng).addTo(map);
        },

        addPopup: function (map, latlng, content) {

            return L.popup()
                .setLatLng(latlng)
                .setContent(content)
                .openOn(map);
        },

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
    }

    return that;
}