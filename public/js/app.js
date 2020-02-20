function App() {

    let that = {
        map,
        init: () => {
            that.map = new Map();
            that.map.init(
                'main-map',
                [0, 0]
            );
        }
    };

    return that;
}
