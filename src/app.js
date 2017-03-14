import mapboxgl from 'mapbox-gl'

console.log("Hello there");

let addLayer = (map, id, source) => {
    map.addLayer({
        id: 'points',
        source: 'pointsSource',
        type: 'circle',
        paint:{
            'circle-radius': 10,
            'circle-color': 'skyblue'
        }
    });
}

mapboxgl.accessToken = 'pk.eyJ1IjoibWlrZXdpbGxpYW1zb24iLCJhIjoibzRCYUlGSSJ9.QGvlt6Opm5futGhE5i-1kw';

const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
    center: [4.383, 48.640],
    zoom: 2
});

map.on('load', () => {
  map.addSource('pointsSource', {
    type: 'geojson',
    data: {
    "type": "FeatureCollection",
    "features": [
        {
        "type": "Feature",
        "properties": {
            "text": "Hello There"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
            4.383544921875,
            48.64016871811908
            ]
        }
        },
        {
        "type": "Feature",
        "properties": {
            "text": "Hi Again"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
            0.50537109375,
            48.22467264956519
            ]
        }
        }
    ]}
  });
addLayer(map, 'pointd', 'pointsSource');
 
});

map.on('click', e => {
    const result = map.queryRenderedFeatures(e.point, { layers: ['points']});
    if(result.length){
        const popup = new mapboxgl.Popup({ closeButton: false });
        const content = result[0].properties.text;
        popup.setLngLat(e.lngLat)
        .setHTML(`<h1>${content}</h1>`)
        .addTo(map);
    }
})