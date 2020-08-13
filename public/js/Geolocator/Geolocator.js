export default function Geolocator()
{
    let currentGeolocationId = null;

    /**
     * Check if the navigator handles geolocation
     *
     * @returns {boolean}
     */
    this.isGeolocationAvailable = function () {

        if ("geolocation" in navigator) {
            return true;
        }

        return false;
    };

    /**
     * Geolocate the user
     *
     * @param successCallback
     * @param failureCallback
     * @param duration to stop the watch after a while
     * @param options
     * @returns {number}
     */
    this.startGeolocation = function (
        successCallback,
        failureCallback = null,
        duration = null,
        options = {}
    ) {
        if (currentGeolocationId) {
            return;
        }

        if (!this.isGeolocationAvailable()) {
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

        currentGeolocationId = navigator.geolocation.watchPosition(successCallback, failureCallback, options);

        if (duration && duration !== Infinity) {
            setTimeout(this.clearWatch, duration);
        }
    },

    /**
     * Stop the geolocation
     */
    this.stopGeolocation = function () {
        navigator.geolocation.clearWatch(currentGeolocationId);
    }
}
