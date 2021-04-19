// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
// Perform a GET request to the query URL
// d3.json(queryUrl, function(data) {
//   createMarkers(data.features);
// });
var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;


function createMap(response)

{


  var features = response.features
  // Check if data got pulled in.
  console.log(features)


 // Create Marker Group
 featureMarkers = features.map(feature =>
  {
    // return L.marker([feature.properties.place]).bindPopup("<h3>" + feature.properties.place + "<h3><h3>Place: " + feature.properties.mag + "</h3>")

     return L.marker([feature.geometry.coordinates]).bindPopup("<h3>" + feature.properties.place + "<h3><h3>Place: " + feature.properties.mag + "</h3>")
    // function onEachFeature(feature, layer) {
    //   layer.bindPopup("<h3>" + feature.properties.place +
    //     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    // }
  
    // // Create a GeoJSON layer containing the features array on the earthquakeData object
    // // Run the onEachFeature function once for each piece of data in the array
    // var earthquakes = L.geoJSON(features, {
    //   onEachFeature: onEachFeature
    });
    // function onEachFeature(feature, layer) {
    //   layer.bindPopup("<h3>" + feature.properties.place +
    //     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    // }
  
    
    // var earthquakes = L.geoJSON(response, {
    //   featureMarkers: featureMarkers
    // });

    //   createMap(earthquakes);


  

  earthquakeFeatureGroup = L.geoJSON(featureMarkers)
 // //////////


  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });
   

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the earthquake layer
  var overlayMaps = {
    "Earthquake Data": earthquakeFeatureGroup
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [lightmap, earthquakeFeatureGroup]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}



// // Perform an API call to the Earthquake  API to get signicant month data . Call createMarkers when complete



d3.json(queryUrl).then(createMap);


// Define arrays to hold created city and state markers
var depthMarkers = [];
var magnatideMarkers = [];

// Loop through locations and create city and state markers
for (var i = 0; i < locations.length; i++) {
  // Setting the marker radius for the state by passing population into the markerSize function
  depthMarkers.push(
    L.circle(feature[i].geometry.coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "white",
      fillColor: "white",
      radius: markerSize(feature[i].geometry.population)
    })
  );

  // Setting the marker radius for the city by passing population into the markerSize function
  magnatideMarkers.push(
    L.circle(feature[i].geometry.coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "purple",
      fillColor: "purple",
      radius: markerSize(feature[i].geometry.mag)
    })
  );
}

