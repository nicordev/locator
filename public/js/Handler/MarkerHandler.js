/**
 * Handle markers on the map
 *
 * @constructor
 */
function MarkerHandler() {

    let that = {
        map: null,
        mapHandler: null,
        popupHandler: null,
        markers: [],

        init: function (map, mapHandler, popupHandler) {

            that.map = map;
            that.mapHandler = mapHandler;
            that.popupHandler = popupHandler;
        },

        /**
         * Place a marker using an event
         *
         * @param event
         */
        placeMarkerOnEvent: function (event) {

            let marker = that.mapHandler.addMarker(
                that.map,
                [event.latlng.lat, event.latlng.lng]
            );
            that.markers.push(marker);
            marker.addEventListener("click", that.popupHandler.placePopupOnEvent);
            marker.addEventListener("contextmenu", that.removeMarkerOnEvent);
        },

        /**
         * Remove a marker linked to an event
         *
         * @param event
         */
        removeMarkerOnEvent: function (event) {

            let marker = event.target,
                index = that.markers.indexOf(marker);

            if (index > -1) {
                that.markers.splice(index, 1);
            }

            marker.remove();
        }
    };

    return that;
}