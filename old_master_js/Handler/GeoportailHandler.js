/**
 * Handle Geoportail API
 *
 * @constructor
 */
function GeoportailHandler() {

    let that = {
        apiKey: "k81gswufyozu38e49nfkcepg",
        availableLayers: {
            ignMap: "GEOGRAPHICALGRIDSYSTEMS.MAPS",
            ign25000: "GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD",
            ignPhoto: "ORTHOIMAGERY.ORTHOPHOTOS"
        },
        layer: null,

        get mapLayerUrl() {
            return "https://wxs.ign.fr/" + that.apiKey + "/geoportail/wmts?" +
                "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
                "&STYLE=normal" +
                "&TILEMATRIXSET=PM" +
                "&FORMAT=image/jpeg" +
                "&LAYER=" + that.layer +
                "&TILEMATRIX={z}" +
                "&TILEROW={y}" +
                "&TILECOL={x}";
        },

        get mapLayerOptions() {
            return {
                minZoom : 0,
                maxZoom : 18,
                        attribution : "IGN-F/Geoportail",
                tileSize : 256
            };
        }
    };

    that.layer = that.availableLayers.ignMap;

    return that;
}