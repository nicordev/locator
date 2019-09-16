
// First we’ll initialize the map and set its view to our chosen geographical coordinates and a zoom level:
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

// Next we’ll add a tile layer to add to our map, in this case it’s a Mapbox Streets tile layer. Creating a tile layer usually involves setting the URL template for the tile images, the attribution text and the maximum zoom level of the layer.
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoibmljb3JkZXYiLCJhIjoiY2swbWNrNm1tMTI1MjNtbXpwZ2ZpcXJ6eCJ9.nEonoKrNrSnRZa0RpJz6XA' // My mapbox access token
}).addTo(mymap);

// Let’s add a marker:
var marker = L.marker([51.5, -0.09]).addTo(mymap);

// Adding a circle is the same (except for specifying the radius in meters as a second argument), but lets you control how it looks by passing options as the last argument when creating the object:
var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);

// Adding a polygon is as easy:
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap);

// Popups are usually used when you want to attach some information to a particular object on a map
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

// You can also use popups as layers (when you need something more than attaching a popup to an object):
var popup = L.popup()
    .setLatLng([51.49, -0.1])
    .setContent("I am a standalone popup.")
    .openOn(mymap); // Here we use openOn instead of addTo because it handles automatic closing of a previously opened popup when opening a new one which is good for usability.

// Every time something happens in Leaflet, e.g. user clicks on a marker or map zoom changes, the corresponding object sends an event which you can subscribe to with a function. It allows you to react to user interaction:
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);