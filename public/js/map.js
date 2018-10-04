console.log(id)
var mymap = L.map(id).setView(gps, 15);
var marker = L.marker(gps).addTo(mymap);
marker.bindPopup(message).openPopup();
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox.streets',
accessToken: 'pk.eyJ1Ijoic2FtYW5kcmVhZSIsImEiOiJjam1sdXFpaGMwYmU4M2xzOHplcG0xNWc3In0.GV7rPgE3tQUUkFHXxDT3Sg'
}).addTo(mymap);
