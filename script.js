// Keep This Here
googleApi = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB-WOeEFR0l5fEi4fiug6nt43CVRRbqdc0&callback=initMap" 

$("#google").attr("src", googleApi);
// insert brewery name
var breweryName = "The Stoogatz"
// insert lat and lon from API
var lat = 39.9526
var lng = -75.1652

  function initMap(){
      var options = {
          zoom: 14,
          center: {lat: lat, lng: lng}
      }
          var map = new google.maps.Map(document.getElementById('map'), options)
  
 
var marker = new google.maps.Marker({
  position : { lat: lat, lng: lng},
  map : map,
  icon:'https://cdn.vox-cdn.com/thumbor/rgnZj-wJtFBWeGIq4beR04GU-8M=/200x200/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19700731/googlemaps.png'
});

var infoWindow = new google.maps.InfoWindow({
  content: '<h1>' + breweryName + '</h1>'
});

marker.addListener("click", function(){
  infoWindow.open(map, marker);
});

  }











//   var options = {
//   center : {lat:42.3601, lng:-71.0589},
//   zoom : 10

// }
//  map = new google.maps.Map($("map"), options)
// // var marker = new google.maps.Marker({
// //   position : options,
// //   map : map
// // })
       

// var APIKey = "AIzaSyB-WOeEFR0l5fEi4fiug6nt43CVRRbqdc0"

;

        
        
        

