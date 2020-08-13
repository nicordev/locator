/**
 * Tell if the browser can handle geolocation.
 */
const isGeolocationAvailable = function () {

    if ("geolocation" in navigator) {
        return true;
    }

    return false;
};

/**
 * Geolocate the user.
 *
 * @param successCallback
 * @param failureCallback
 * @param options
 * @returns {number}
 */
const startGeolocation = function (
    successCallback,
    failureCallback = null,
    options = {}
) {
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

    return navigator.geolocation.watchPosition(successCallback, failureCallback, options);
}

/**
 * Stop a geolocation.
 */
const stopGeolocation = function (geolocationId) {
    navigator.geolocation.clearWatch(geolocationId);
}

export { isGeolocationAvailable, startGeolocation, stopGeolocation };