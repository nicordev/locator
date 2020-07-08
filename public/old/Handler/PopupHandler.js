/**
 * Handle popups on the map
 *
 * @constructor
 */
function PopupHandler() {

    let that = {
        map: null,
        mapHandler: null,
        popups: [],

        init: function (map, mapHandler) {

            that.map = map;
            that.mapHandler = mapHandler;
        },

        /**
         * Place a popup
         *
         * @param latlng
         * @param content
         * @param map
         */
        placePopup: function (latlng, content, map = null) {

            let popup = that.mapHandler.addPopup(
                map || that.map,
                latlng,
                content
            );

            that._setOnRemove(popup);
        },

        /**
         * Remove a popup
         *
         * @param popup either a Popup or the popup's id in the PopupHandler array
         */
        removePopup: function (popup) {

            let popupId = null;

            if (Number.isInteger(popup) && popup in that.popups) {
                popupId = popup;
                popup = that.popups[popupId];
            } else {
                popupId = that.popups.indexOf(popup);
            }

            if (popupId > -1) {
                that.popups.splice(popupId, 1);
            }

            popup.remove();
        },

        /**
         * Add a popup using an event
         *
         * @param event
         */
        placePopupOnEvent: function (event) {

            that.placePopup(event.latlng, event.latlng.toString());
        },

        /**
         * Remove a popup from the list on popup "remove" event
         *
         * @param popup
         * @private
         */
        _setOnRemove: function (popup) {

            popup.on("remove", function () {
                that.removePopup(popup);
            });
        },
    };

    return that;
}