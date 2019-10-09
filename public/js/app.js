/**
 * The main class
 *
 * @returns {{init: init, drawingTools: null, mapHandler: null, _initCommands: _initCommands, _initDrawingTools: _initDrawingTools, markerHandler: null, map: null, items: {circles: [], markers: []}, _initMap: _initMap, commands: null, popupHandler: null}}
 * @constructor
 */
function App() {

    let that = {
        mapHandler: null,
        popupHandler: null,
        markerHandler: null,
        circleHandler: null,
        map: null,
        commands: null,
        drawingTools: null,
        items: {
            circles: []
        },

        init: function (
            mapHandler = null,
            markerHandler = null,
            popupHandler = null,
            circleHandler = null
        ) {

            if (mapHandler) {
                that.mapHandler = mapHandler;
            } else {
                that.mapHandler = new MapHandler();
            }

            if (popupHandler) {
                that.popupHandler = popupHandler;
            } else {
                that.popupHandler = new PopupHandler();
            }

            if (markerHandler) {
                that.markerHandler = markerHandler;
            } else {
                that.markerHandler = new MarkerHandler();
            }

            if (circleHandler) {
                that.circleHandler = circleHandler;
            } else {
                that.circleHandler = new CircleHandler();
            }

            that._initCommands();
            that._initMap();
            that._initDrawingTools();
        },

        _initCommands: function () {

            that.commands = {
                center: {
                    lat: document.getElementById("center-lat"),
                    lng: document.getElementById("center-lng"),
                },
                zoom: document.getElementById("zoom"),
                applyButton: document.getElementById("commands-button")
            };
        },

        _initMap: function () {

            // Create the map
            that.map = that.mapHandler.makeMap(
                "main-map",
                [that.commands.center.lat.value, that.commands.center.lng.value],
                that.commands.zoom.value,
                {doubleClickZoom: false}
            );

            // Add a background layer
            that.mapHandler.addTileLayer(that.map);

            // Add interactions
            that.popupHandler.init(that.map, that.mapHandler);
            that.markerHandler.init(that.map, that.mapHandler, that.popupHandler);
            that.map.on("dblclick", that.markerHandler.placeMarkerOnEvent);

            // Init the command to center the map
            that.commands.applyButton.addEventListener("click", centerMapFromCommand);

            function centerMapFromCommand() {

                that.mapHandler.centerMap(
                    that.map,
                    [that.commands.center.lat.value, that.commands.center.lng.value],
                    that.commands.zoom.value
                );
            }
        },

        _initDrawingTools: function () {

            that.circleHandler.init(that.map, that.mapHandler);
            that.drawingTools = {
                circle: {
                    lat: document.getElementById("circle-lat"),
                    lng: document.getElementById("circle-lng"),
                    radius: document.getElementById("circle-radius"),
                    drawButton: document.getElementById("circle-button")
                }
            };

            that.drawingTools.circle.drawButton.addEventListener("click", function () {
                that.circleHandler.drawCircle(
                    [that.drawingTools.circle.lat.value, that.drawingTools.circle.lng.value],
                    that.drawingTools.circle.radius.value
                );
            });
        }
    };

    return that;
}