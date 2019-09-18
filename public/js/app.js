function App(mapHandler = null) {

    let that = {
        mapHandler: mapHandler,
        map: null,
        commands: null,

        init: function (mapHandler = null) {

            if (mapHandler) {
                that.mapHandler = mapHandler;
            } else {
                that.mapHandler = new MapHandler();
            }
        },

        run: function () {

            that.commands = {
                center: {
                    lat: document.getElementById("center-lat"),
                    lng: document.getElementById("center-lng"),
                },
                zoom: document.getElementById("zoom"),
                applyButton: document.getElementById("commands-button")
            };
            that.map = that.mapHandler.makeMap(
                "main-map",
                that.commands.center.lat.value,
                that.commands.center.lng.value,
                that.commands.zoom.value
            );
            that.mapHandler.addTileLayer(that.map);

            that.commands.applyButton.addEventListener("click", function () {
                that.map.setView([
                    that.commands.center.lat.value,
                    that.commands.center.lng.value
                ], that.commands.zoom.value);
            });
        }
    };

    return that;
}