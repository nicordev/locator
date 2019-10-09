/**
 * Methods to handle popups on the map
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
         * Add a popup using an event
         *
         * @param event
         */
        placePopupOnEvent: function (event) {

            let popup = that.mapHandler.addPopup(
                that.map,
                event.latlng,
                event.latlng.toString()
            );

            popup.on("remove", function () {
                for (let i = 0; i < that.popups.length; i++) {
                    if (that.popups[i] === popup) {
                        that.popups.splice(i, 1);
                        console.log("Removed!");
                    }
                }
            });
            that.popups.push(popup);
        }
    };

    return that;
}