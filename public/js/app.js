function App() {

    let that = {
        geolocator: new Geolocator(),
        geolocationOptions: {
            enableHighAccuracy : true,
            maximumAge : 0, // Maximum age in milliseconds of a possible cached position that is acceptable to return
            timeout : 10000 // Maximum length of time in milliseconds the device is allowed to take in order to return a position
        },
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
            ),
            geolocate: new Command(
                (event, buttonElement) => {
                    if ('Stop' !== buttonElement.textContent) {
                        buttonElement.textContent = 'Stop';
                    } else {
                        buttonElement.textContent = 'Locate me';
                    }
                    
                    that.geolocator.toggleWatchPosition(
                        (position) => {
                            buttonElement.textContent = ('Stop');
                            that.map.setCenter([position.coords.latitude, position.coords.longitude]);
                            console.log('geolocation works!');
                        },
                        (position) => {
                            console.log('geolocation failed...');
                        },
                        that.geolocationOptions
                    );
                },
                document.getElementById('command-geolocation-button'),
                document.getElementById('command-geolocation-button')
            )
        },
        init: () => {
            that.map = new Map();
            that.map.init(
                'main-map',
                [45.12, 6.28],
                13
            );
        }
    };

    return that;
}
