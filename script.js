$(document).ready(function () {

// To search with enter key
  $(document).on("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#find-breweries-button").click();
    }
  });


// To start the search for breweries
  $("#find-breweries-button").on("click", function () {
    localStorage.clear();
    $(".brewNames").empty();
    
    state = $("#state").val();

    console.log(state)


    localStorage.setItem("searched state", state);


    breweryType = $("#brewery-type").val();


    localStorage.setItem("searched brewery type", breweryType);


    var queryURL = "https://api.openbrewerydb.org/breweries?by_state=" + state + "&by_type=" + breweryType + "&per_page=50"

    //OPEN BREWERY DB CALL
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
if(response.length >= 1){
      console.log(response)



        for (var i = 0; i < response.length; i++) {

        var testBrewery = response[i].name;
        var newBreweryButton = $("<button>");
        newBreweryButton.text(testBrewery);
        newBreweryButton.attr("data-name", testBrewery);
        newBreweryButton.attr("data-toggle", "yelp-modal")
        newBreweryButton.addClass("dynamicallyCreatedButtons button");
        $(".brewNames").append(newBreweryButton)
      } 
    } else {
      var noResult = "No Search Results Found";
      var noResultSpan = $("<span>");
      var imageTag = $("<img>");
      noResultSpan.text(noResult);
      noResultSpan.addClass("dynamicallyCreatedButtons button")
      $(".brewNames").append(noResultSpan)
    }

      });


    });



  $(document).on("click", ".dynamicallyCreatedButtons", function () {

    var breweryTitle = $(this).attr("data-name");
    localStorage.setItem("Brewery Name", breweryTitle)
    console.log(breweryTitle)



    // Yelp call based on name and state
    var localstorageBreweryName = localStorage.getItem("Brewery Name");
    breweryName = localstorageBreweryName
    var yelpURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + localstorageBreweryName + "&location=" + state

    $.ajax({
      url: yelpURL,
      headers: {
        'Authorization': 'Bearer r-ru9f0en8RW39PeL2KLuaZ1wwUgo6nm3cHomQ9RbfzCM63ocbL6mrc2C3Culn8SmlqtM5w65eUmULYxoGBHwoE0ibv-e2E-tNx0zE7kbiF01t8IjhfP7l7ocZVhX3Yx',
      },
      method: "GET"
    }).then(function (yelp) {
      // Yelp Information in Console
      console.log(yelp);
      console.log(yelp.businesses[0].name)
      console.log(yelp.businesses[0]);
      console.log(yelp.businesses[0].rating)
      console.log(yelp.businesses[0].location.address1)
      console.log(businessID)
      
      var businessID = yelp.businesses[0].id
      

      // Lat and Lon for google maps
      lon = yelp.businesses[0].coordinates.longitude;
      lat = yelp.businesses[0].coordinates.latitude;
      localStorage.setItem("latitude", lat)
      localStorage.setItem("longitude", lon)
      initMap();


        //YELP RICH BUSINESS INFO CALL. Includes pics and more information. 
        
        var yelpBizURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + businessID

        $.ajax({
          url: yelpBizURL,
          headers: {
            'Authorization': 'Bearer r-ru9f0en8RW39PeL2KLuaZ1wwUgo6nm3cHomQ9RbfzCM63ocbL6mrc2C3Culn8SmlqtM5w65eUmULYxoGBHwoE0ibv-e2E-tNx0zE7kbiF01t8IjhfP7l7ocZVhX3Yx',
          },
          method: "GET"
        }).then(function (biz) {
          console.log(biz)
          console.log(biz.image_url)
          //create div to display business info
          var infoDiv = $("<div>")
          // Brewery Name
          var name = yelp.businesses[0].name
          var nameHead = $("<h3 class='modalLeft'>")
          nameHead.text(name)
          infoDiv.append(nameHead)
          $("#brewInfo").append(infoDiv)
          // Brewery Address
          var address = yelp.businesses[0].location.address1
          var addressHead = $("<h4 class='modalLeft'>")
          addressHead.text(address)
          infoDiv.append(addressHead)
          //Yelp Rating
          var rating = biz.rating
          var ratingImg = $("<img class='rating'>")
          ratingImg.attr("src", "assets/" + "yelpstars/" + rating + ".png")
          infoDiv.append(ratingImg)
          var reviewCount = biz.review_count
          var reviewP = $("<h4 class='rating'>")
          reviewP.text("  " + reviewCount + " Ratings")
          infoDiv.append(reviewP)
          yelpSite = biz.url
          var toYelp = $("<a>")
          toYelp.attr("href", yelpSite)
          toYelp.attr("target", '_blank')
          toYelp.html(" on Yelp")
          reviewP.append(toYelp)

          infoDiv.append("<hr>")

          // Brewery Picture
          var photo = biz.image_url
          var breweryImg = $("<img id='breweryPic'>")
          breweryImg.attr("src", photo)
          infoDiv.append(breweryImg)
          $("#brewInfo").html(infoDiv);
        
        });
      });
    });
});
  // Getting lat and lon from yelp call
var lat = parseFloat(localStorage.getItem("latitude"));
var lon = parseFloat(localStorage.getItem("longitude"));
var breweryName = localStorage.getItem("Brewery Name");

googleApi = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB-WOeEFR0l5fEi4fiug6nt43CVRRbqdc0&callback=initMap"

$("#google").attr("src", googleApi);

// Initiate google maps
function initMap() {
  var options = {
    zoom: 13,
    center: { lat: lat, lng: lon }
  }
  var map = new google.maps.Map(document.getElementById('map'), options)


  addMarker({
    coords: { lat: lat, lng: lon },
    iconImage: 'https://img.icons8.com/office/40/000000/beer.png',
    content: '<h1>' + breweryName + '</h1>'
  });

  console.log(addMarker)


  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      icon: props.iconImage
    });

    if (props.iconImage) {
      marker.setIcon(props.iconImage);
    }


    if (props.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });

      marker.addListener('click', function () {
        infoWindow.open(map, marker);
      });


    }
  };
}