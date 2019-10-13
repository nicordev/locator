/**
 * The main class
 *
 * @returns {{init: init, drawingTools: null, mapHandler: null, _initCommands: _initCommands, _initDrawingTools: _initDrawingTools, markerHandler: null, map: null, items: {circles: [], markers: []}, _initMap: _initMap, commands: null, popupHandler: null}}
 * @constructor
 */
function App() {

    let that = {
        elementHandler: null,
        mapHandler: null,
        geolocationHandler: null,
        popupHandler: null,
        markerHandler: null,
        circleHandler: null,
        map: null,
        geolocationOptions: {
            enableHighAccuracy : true,
            maximumAge : 0, // Maximum age in milliseconds of a possible cached position that is acceptable to return
            timeout : 10000 // Maximum length of time in milliseconds the device is allowed to take in order to return a position
        },
        commands: null,
        drawingTools: null,
        items: {
            circles: []
        },

        init: function (
            mapHandler = null,
            geolocationHandler = null,
            markerHandler = null,
            popupHandler = null,
            circleHandler = null,
            elementHandler = null
        ) {

            if (mapHandler) {
                that.mapHandler = mapHandler;
            } else {
                that.mapHandler = new MapHandler();
            }

            if (geolocationHandler) {
                that.geolocationHandler = geolocationHandler;
            } else {
                that.geolocationHandler = new GeolocationHandler();
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

            if (elementHandler) {
                that.elementHandler = elementHandler;
            } else {
                that.elementHandler = new ElementHandler();
            }

            that._initExpandButtons();
            that._setCommandElements();
            that._initMap();
            that._initCommands();
            that._initDrawingTools();
        },

        _initExpandButtons: function () {

            let buttonElements = document.getElementsByClassName("expand-toggle"),
                expandedButtonContent = "-",
                retractedButtonContent = "+";

            that.elementHandler.init("hidden");

            for (let buttonElement of buttonElements) {

                buttonElement.addEventListener("click", function () {
                    that.elementHandler.toggleExpandNextElement(buttonElement, expandedButtonContent, retractedButtonContent);
                });

                that.elementHandler.retractElement(buttonElement.parentElement.nextElementSibling, buttonElement);
            }
        },

        /**
         * Set commands DOM elements
         *
         * @private
         */
        _setCommandElements: function () {

            that.commands = {
                geolocationButton: document.getElementById("geolocation-button"),
                center: {
                    lat: document.getElementById("center-lat"),
                    lng: document.getElementById("center-lng"),
                },
                zoom: document.getElementById("zoom"),
                applyButton: document.getElementById("commands-button")
            };
        },

        /**
         * Initialize the map
         *
         * @private
         */
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


        },

        _initCommands: function () {

            // Init the geolocation command
            that.commands.geolocationButton.addEventListener("click", function () {
                that.geolocationHandler.toggleWatchPosition(
                    function (position) {
                        that.mapHandler.centerMap(
                            that.map,
                            [position.coords.latitude, position.coords.longitude],
                            that.commands.zoom.value
                        );
                    },
                    that._geolocationError,
                    that.geolocationOptions
                );

                if (that.commands.geolocationButton.textContent === "Locate me") {
                    that.commands.geolocationButton.textContent = "Stop";
                } else {
                    that.commands.geolocationButton.textContent = "Locate me";
                }
            });

            // Init the command to center the map on a set of coordinates
            that.commands.applyButton.addEventListener("click", function () {
                that.mapHandler.centerMap(
                    that.map,
                    [that.commands.center.lat.value, that.commands.center.lng.value],
                    that.commands.zoom.value
                );
            });
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
        },

        /**
         * Handle error due to geolocation
         *
         * @param error
         * @private
         */
        _geolocationError: function (error) {
            console.log('ERROR(' + error.code + '): ' + error.message);
        }
    };

    return that;
}