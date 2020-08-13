/**
 * Handle circles on the map
 *
 * @constructor
 */
function CircleHandler() {

    let that = {
        map: null,
        mapHandler: null,
        circles: [],

        init: function (map, mapHandler) {

            that.map = map;
            that.mapHandler = mapHandler;
        },

        drawCircle: function (
            center,
            radius,
            options = {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5
            }
        ) {

            let circle = that.mapHandler.drawCircle(
                that.map,
                center,
                {
                    color: options.color || 'red',
                    fillColor: options.fillColor || '#f03',
                    fillOpacity: options.fillOpacity || 0.5,
                    radius: radius
                }
            );

            that.circles.push(circle);
        }
    };

    return that;
}