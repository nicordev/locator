function App() {

    let that = {
        map: {},
        mapCommands: {
            center: new Command(
                (event, centerElements) => {
                    that.map.setCenter([
                        centerElements.latitude.value,
                        centerElements.longitude.value
                    ]);
                },
                document.getElementById('command-center-button'),
                {
                    latitude: document.getElementById('command-center-latitude'),
                    longitude: document.getElementById('command-center-longitude')
                }
            ),
            zoom: new Command(
                (event, zoomElement) => {
                    that.map.setZoom(zoomElement.value);
                },
                document.getElementById('command-zoom-button'),
                document.getElementById('command-zoom-value')
            )
        },
        init: () => {
            that.map = new Map();
            that.map.init(
                'main-map',
                [45.12, 6.28],
                13
            );
            that.initMapCommands();
        },

        initMapCommands: () => {
            for (let command in that.mapCommands) {
                that.mapCommands[command].init();
            }
        }
    };

    return that;
}
