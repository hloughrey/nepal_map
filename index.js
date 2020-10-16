function createMap() {
    // initialize Leaflet
    var map = L.map('map').setView({ lon: 0, lat: 0 }, 2);

    // add the OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
            '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    }).addTo(map);

    // show the scale bar on the lower left corner
    L.control.scale().addTo(map);
    map.setView(new L.LatLng(27.6812, 85.3199), 7.5);

    // show a marker on the map
    L.marker({ lon: 85.3199, lat: 27.6812 }).bindPopup('Kathmandu').addTo(map);

    getGeoJsonData().then(data => {
        L.geoJSON(data).addTo(map);
        // Get this working
        map.fitBounds(data.getBounds());
    });
}

function getGeoJsonData() {
    return fetch('./data.json')
        .then(resp => resp.json())
        .then(data => data);
}

createMap();
