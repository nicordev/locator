function App() {

    let that = {
        map: {},
        mapCommands: {
            // TODO: create a dedicated class for map control commands
            elements: {
                centerLatitude: document.getElementById('center-lat'),
                centerLongitude: document.getElementById('center-lng')
            },
            center: () => {
                that.map.setCenter([
                    that.mapCommands.elements.centerLatitude.value,
                    that.mapCommands.elements.centerLatitude.value
                ]);
            }
        },
        init: () => {
            that.map = new Map();
            that.map.init(
                'main-map',
                [45.12, 6.28]
            );
        }
    };

    return that;
}
