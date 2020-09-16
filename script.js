$(document).ready(function(){
    



var APIKey = "AIzaSyB-WOeEFR0l5fEi4fiug6nt43CVRRbqdc0"

var script = document.createElement('script');

script.src = "https://maps.googleapis.com/maps/api/js?key=" + APIKey + "&callback=" + initMap ;

script.defer = true;

document.head.appendChild(script);

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: -34.397,
        lng: 150.644
      },
      zoom: 10
    });
  }
 
});



   
   

   
   
   
   
   
    // $("#type").on("click", function() {
    //   var city = "New York"
        
    //     googleApi = "AIzaSyB-WOeEFR0l5fEi4fiug6nt43CVRRbqdc0"
    //     var googleURL = "https://www.google.com/maps/embed/v1/search?key=" + googleApi + "&q=breweries+in+" + city;
        
       

        
        
        
        

