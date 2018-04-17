mapboxgl.accessToken = 'pk.eyJ1IjoicHJvdG93b2xmIiwiYSI6ImNqZnV3cGczOTFocW0ycXFuZ3FiNWVreDAifQ.Rmh5TW6uymQZYx2FRkrAqA';

let offerCoords = document.getElementById('offerCoords');
let body = document.getElementsByTagName('body')[0]

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 13,
    center: [offerCoords.dataset.long, offerCoords.dataset.lat],
});

let offerMarker = document.createElement('div');
offerMarker.className = 'offerMarker'

new mapboxgl.Marker(offerMarker)
    .setLngLat([offerCoords.dataset.long, offerCoords.dataset.lat])
    .addTo(map);

fetch('/api/offers/' + body.dataset.offerid + '/fetchFoodHubs')
    .then(function (response) {
        return response.json();
    })
    .then(function (hubsData) {
        console.log(hubsData);
        addHubsToMap(hubsData);
    })
    .catch(error => console.error(error));

function addHubsToMap(hubsData) {
    let hubs = hubsData.nearestHubs;
    let lat, long, name;
    for (let i = 0; i < hubs.length; i++) {
        let hubMarker = document.createElement('div');
        hubMarker.className = 'hubMarker'

        lat = hubs[i].location.coordinates[0];
        long = hubs[i].location.coordinates[1];
        name = '<h3>' + hubs[i].name + '</h3>';
        name += '<p>' + hubs[i].location.address + '</p>'

        // create the popup
        let markerPopup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(name);

        new mapboxgl.Marker(hubMarker)
            .setLngLat([long, lat])
            .setPopup(markerPopup) // add popups
            .addTo(map);
    }
}