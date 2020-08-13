/**
 * Handle markers on the map
 *
 * @constructor
 */
function MarkerHandler() {

    let that = {
        map: null,
        mapHandler: null,
        markers: [],

        init: function (map, mapHandler) {

            that.map = map;
            that.mapHandler = mapHandler;
        },

        placeMarker: function (
            latlng,
            onClickCallback = null,
            onRightClickCallback = null
        ) {

            let marker = that.mapHandler.addMarker(
                that.map,
                latlng
            );

            if (onClickCallback) {
                marker.addEventListener("click", onClickCallback);
            }

            if (onRightClickCallback) {
                marker.addEventListener("contextmenu", onRightClickCallback);
            }

            that.markers.push(marker);

            return marker;
        },

        /**
         * Remove a marker
         *
         * @param marker either a Marker or the marker's id in the MarkerHandler array
         */
        removeMarker: function (marker) {

            let markerId = null;

            if (Number.isInteger(marker) && marker in that.markers) {
                markerId = marker;
                marker = that.markers[marker];
            } else {
                markerId = that.markers.indexOf(marker);
            }

            if (markerId > -1) {
                that.markers.splice(markerId, 1);
            }

            marker.remove();
        },

        /**
         * Place a marker using an event
         *
         * @param event
         * @param onClickCallback
         * @param onRightClickCallback
         */
        placeMarkerOnEvent: function (
            event,
            onClickCallback = null,
            onRightClickCallback = null
        ) {

            let marker = that.mapHandler.addMarker(
                that.map,
                [event.latlng.lat, event.latlng.lng]
            );
            that.markers.push(marker);

            if (onClickCallback) {
                marker.addEventListener("click", onClickCallback);
            }

            if (onRightClickCallback) {
                marker.addEventListener("contextmenu", onRightClickCallback);
            }
        },

        /**
         * Remove a marker linked to an event
         *
         * @param event
         */
        removeMarkerOnEvent: function (event) {

            that.removeMarker(event.target);
        }
    };

    return that;
}