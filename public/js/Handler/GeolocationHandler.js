/**
 * Locate the user
 *
 * @constructor
 */
function GeolocationHandler ()
{
    let that = {

        geolocationId: null,

        /**
         * Check if the navigator handles geolocation
         *
         * @returns {boolean}
         */
        isGeolocationReady: function () {

            if ("geolocation" in navigator) {
                return true;
            }

            return false;
        },

        /**
         * Toggle geolocation
         *
         * @param successCallback
         * @param failureCallback
         * @param options
         * @returns {boolean} true if active
         */
        toggleWatchPosition: function (
            successCallback,
            failureCallback = null,
            options = {}
        ) {

            if (!options.enableHighAccuracy) {
                options.enableHighAccuracy = true;
            }

            if (!options.maximumAge) {
                options.maximumAge = 0;
            }

            options.timeout = Infinity;

            if (null === that.geolocationId) {
                that.geolocationId = that.watchPosition(
                    successCallback,
                    failureCallback,
                    null,
                    options
                );

                return true;
            }

            that.clearWatch(that.geolocationId);
            that.geolocationId = null;

            return false;
        },

        /**
         * Geolocate the user
         *
         * @param successCallback
         * @param failureCallback
         * @param duration to stop the watch after a while
         * @param options
         * @returns {number}
         */
        watchPosition: function (
            successCallback,
            failureCallback = null,
            duration = null,
            options = {}
        ) {
            if (!that.isGeolocationReady()) {
                throw new Error("Your navigator does not handle geolocation.");
            }

            if (!options.enableHighAccuracy) {
                options.enableHighAccuracy = true;
            }

            // Duration in ms before the failure callback is called
            if (!options.timeout) {
                options.timeout = 10000;
            }

            if (!options.maximumAge) {
                options.maximumAge = 0;
            }

            let geolocationId = navigator.geolocation.watchPosition(successCallback, failureCallback, options);

            if (duration && duration !== Infinity) {
                setTimeout(that.clearWatch, duration, geolocationId);
            }

            return geolocationId;
        },

        /**
         * Stop the geolocation
         *
         * @param geolocationId
         */
        clearWatch: function (geolocationId) {

            navigator.geolocation.clearWatch(geolocationId);
        }
    };

    return that;
}