function App(mapHandler = null) {

    let that = {
        mapHandler: mapHandler,
        map: null,
        commands: null,
        drawingTools: null,
        items: {
            markers: [],
            circles: []
        },

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
                [that.commands.center.lat.value, that.commands.center.lng.value],
                that.commands.zoom.value,
                {doubleClickZoom: false}
            );

            that.mapHandler.addTileLayer(that.map);
            that.map.on("dblclick", onMapDoubleClick);

            function onMapDoubleClick(event) {

                let marker = that.mapHandler.addMarker(
                    that.map,
                    [event.latlng.lat, event.latlng.lng]
                );
                that.items.markers.push(marker);
                marker.addEventListener("click", onMarkerClick);
                marker.addEventListener("contextmenu", onMarkerRightClick);
            }

            function onMarkerClick(event) {

                that.mapHandler.addPopup(
                    that.map,
                    event.latlng,
                    event.latlng.toString()
                )
            }

            function onMarkerRightClick(event) {

                let marker = event.target,
                    index = that.items.markers.indexOf(marker);

                if (index > -1) {
                    that.items.markers.splice(index, 1);
                }

                marker.remove();
            }

            that.commands.applyButton.addEventListener("click", function () {
                that.map.setView(
                    [that.commands.center.lat.value, that.commands.center.lng.value],
                    that.commands.zoom.value
                );
            });

            that.drawingTools = {
                circle: {
                    lat: document.getElementById("circle-lat"),
                    lng: document.getElementById("circle-lng"),
                    radius: document.getElementById("circle-radius"),
                    drawButton: document.getElementById("circle-button")
                }
            };

            that.drawingTools.circle.drawButton.addEventListener("click", function () {
                that.items.circles.push(that.mapHandler.drawCircle(
                    that.map,
                    [that.drawingTools.circle.lat.value, that.drawingTools.circle.lng.value],
                    {
                        color: 'red',
                        fillColor: '#f03',
                        fillOpacity: 0.5,
                        radius: that.drawingTools.circle.radius.value
                    }
                ));
            });
        }
    };

    return that;
}