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
  icon:'https://img.icons8.com/office/40/000000/beer.png'
});

var infoWindow = new google.maps.InfoWindow({
  content: '<h1>' + breweryName + '</h1>'
});

marker.addListener("click", function(){
  infoWindow.open(map, marker);
});

  }





        
        
        

