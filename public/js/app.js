function App() {

    let that = {
        map: {},
        mapCommands: {
            center: {
                elements: {
                    latitude: document.getElementById('command-center-latitude'),
                    longitude: document.getElementById('command-center-longitude'),
                    trigger: document.getElementById('command-center-button')
                },
                init: () => {
                    that.mapCommands.center.elements.trigger.addEventListener('click', () => {
                        that.map.setCenter([
                            that.mapCommands.center.elements.latitude.value,
                            that.mapCommands.center.elements.longitude.value
                        ]);
                    });
                }
            }
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
