//---------------------------------------------------------------------------------------
// OpenStreetMap
//---------------------------------------------------------------------------------------
var zoomLevel;
    if (window.innerWidth <= 600) {
        zoomLevel = 1.6;
    }
    else {
    zoomLevel = 2.5;
    }

    var map = L.map('map', {zoomSnap: 0}, {wheelPxPerZoomLevel: 1}).setView([20, 15], zoomLevel);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 25,
    doubleClickZoom: true,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
