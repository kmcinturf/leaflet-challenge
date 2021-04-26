// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
// Perform a GET request to the query URL
// d3.json(queryUrl, function(data) {
//   createMarkers(data.features);
// });
// var newYorkCoords = [52.37, 9.73];
// var mapZoomLevel = -550000000;



function createMap(response)

{

  var features = response.features
  // Check if data got pulled in.
  console.log(features)
  function getValue(x) {
    if(x > -10 & x <= 10) {return "green"}
     if(x > 10 & x <= 30) {return "yellow"}
     if (x > 30  & x <= 50) {return "orange"}
     if(x > 50 & x <= 70) {return "red"}
     if(x > 70 & x <= 90) {return "brown"}
     if(x >= 90) {return "black"} 
 
  }

 // Create Marker Group
 featureMarkers = features.map(feature =>
  
   
     L.circleMarker([feature.geometry.coordinates[1],feature.geometry.coordinates[0]], {
      color: "red",
      fillColor: getValue(feature.geometry.coordinates[2]),
      fillOpacity: .75,
      radius: feature.properties.mag
    },
      
    ).bindPopup("<h3>" + feature.properties.place + "<h3><h3>Place: " + feature.properties.mag + "</h3>") 
    // function onEachFeature(feature, layer) {
    //   layer.bindPopup("<h3>" + feature.properties.place +
    //     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    // }
  
    // // Create a GeoJSON layer containing the features array on the earthquakeData object
    // // Run the onEachFeature function once for each piece of data in the array
    // var earthquakes = L.geoJSON(features, {
    //   onEachFeature: onEachFeature
    );
    // function onEachFeature(feature, layer) {
    //   layer.bindPopup("<h3>" + feature.properties.place +
    //     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    // }
  
    
    // var earthquakes = L.geoJSON(response, {
    //   featureMarkers: featureMarkers
    // });

    //   createMap(earthquakes);


  

  earthquakeFeatureGroup = L.layerGroup(featureMarkers)
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
    center: [52.37, 9.73],
    zoom: 5,
    layers: [lightmap, earthquakeFeatureGroup]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [-10, 10, 30, 50, 70, 90],
        labels = ['<strong> Earthquake Depth </strong>'],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML += '<strong> Earthquake Depth (km) </strong>'
        div.innerHTML +=
            '<i style="background:' + getValue(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);
  
 
  

  
}

d3.json(queryUrl).then(createMap);

// // Perform an API call to the Earthquake  API to get signicant month data . Call createMarkers when complete
// function updateLegend(x) {
//   document.querySelector(".legend").innerHTML = [
//     "<p>Earthquake x: " +feature.geometry.coordinates[2](x) + "</p>",
//     "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",

//   ].join("");
  
// }

// Set up the legend


  // Adding legend to the map
  
// function updateLegend(x) {
//   document.querySelector(".legend").innerHTML = [
//     "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
//     "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
//   ].join("");
// }






// // Define arrays to hold created city and state markers
// var xMarkers = [];
// var magnatideMarkers = [];

// // Loop through locations and create city and state markers
// for (var i = 0; i < locations.length; i++) {
//   // Setting the marker radius for the state by passing population into the markerSize function
//   xMarkers.push(
//     L.circle(feature[i].geometry.coordinates, {
//       stroke: false,
//       fillOpacity: 0.75,
//       color: "white",
//       x: "white",
//       radius: markerSize(feature[i].geometry.population)
//     })
//   );

//   // Setting the marker radius for the city by passing population into the markerSize function
//   magnatideMarkers.push(
//     L.circle(feature[i].geometry.coordinates, {
//       stroke: false,
//       fillOpacity: 0.75,
//       color: "purple",
//       x: "purple",
//       radius: markerSize(feature[i].geometry.mag)
//     })
//   );
// }

