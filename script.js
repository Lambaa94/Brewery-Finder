
$(document).ready(function () {
  $("#find-breweries-button").on("click", function () {
    localStorage.clear();
    $(".brewNames").empty();
    //ADD STATE TO SEARCH PARAM
    ///variables for search parameters

    state = $("#state").val();
    
    console.log(state)
    


    // **************ROBERT 
    localStorage.setItem("searched state", state);




    breweryType = $("#brewery-type").val();
    // price = $("#price").val();


    // **************ROBERT 
    localStorage.setItem("searched brewery type", breweryType);
    // localStorage.setItem("searched price", price);


    var queryURL = "https://api.openbrewerydb.org/breweries?by_state=" + state + "&by_type=" + breweryType

    //OPEN BREWERY DB CALL
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      console.log(response)

      //Test brewery is just first brewery on the list in this city (temporary)

      for (var i = 0; i < response.length; i++) {
        
        // var array = []

        var testBrewery = response[i].name;
        var newBreweryButton = $("<button>");
        newBreweryButton.text(testBrewery);
        newBreweryButton.attr("data-name", testBrewery);
        newBreweryButton.attr("data-toggle", "yelp-modal")
        newBreweryButton.addClass("success button dynamicallyCreatedButtons");
        $(".brewNames").append(newBreweryButton)

        // array.push(testBrewery);

      }
      
      
    });


  });



  $(document).on("click", ".dynamicallyCreatedButtons", function () {

    var breweryTitle = $(this).attr("data-name");
    localStorage.setItem("Brewery Name", breweryTitle)
    console.log(breweryTitle)



    //YELP CALL BASED ON CITY VAR + TESTBREWERY VAR (TEMPORARY)

    // ****************ROBERT (added local storage as a variable, and i got rid of the getitem method - not sure if this is necessary though)
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
      console.log(yelp);
      console.log(yelp.businesses[0].name)

      console.log(yelp.businesses[0]);

      console.log(yelp.businesses[0].rating)
      console.log(yelp.businesses[0].location.address1)
      var businessID = yelp.businesses[0].id
      console.log(businessID)


      // **************Robert 
      // order was yelp[0].businesses.coordinates.longitude; I changed it to yelp.businesses[0].coordinates.longitude
      // order was yelp[0].businesses.coordinates.latitude; I changed it to yelp.businesses[0].coordinates.latitude
      lon = yelp.businesses[0].coordinates.longitude;
      lat = yelp.businesses[0].coordinates.latitude;
      localStorage.setItem("latitude", lat)
      localStorage.setItem("longitude", lon)
      initMap();
      
      
      
      console.log(lon)
      console.log(lat)


      //YELP RICH BUSINESS INFO CALL. Includes pics and more information. 
      //Biz ID can also be used for another API call for user reviews if we're interested in that.
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
        var nameP = $("<p>")
        nameP.text(name)
        infoDiv.append(nameP)
        $("#brewInfo").append(infoDiv)
        // Brewery Address
        var address = yelp.businesses[0].location.address1
        var addressP = $("<p>")
        addressP.text(address)
        infoDiv.append(address)
        // Brewery Picture
        var photo = biz.image_url
        var breweryImg = $("<img>")
        breweryImg.attr("src", photo)
        infoDiv.append(breweryImg)

        $("#brewInfo").html(infoDiv);

        
      
      
      
      })

    })
  })

});



  // this is pulling the item before the most recently searched
    var lat = parseFloat(localStorage.getItem("latitude"));
    var lon = parseFloat(localStorage.getItem("longitude"));
    var breweryName = localStorage.getItem("Brewery Name");
  
  googleApi = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB-WOeEFR0l5fEi4fiug6nt43CVRRbqdc0&callback=initMap"

  $("#google").attr("src", googleApi);

  // insert lat and lon from API
 
  console.log(lat)
  console.log(lon)

  function initMap() {
    var options = {
      zoom: 13,
      center: { lat: lat, lng: lon }
    }
    var map = new google.maps.Map(document.getElementById('map'), options)
    

  addMarker({
    coords:{ lat: lat, lng: lon },
    iconImage: 'https://img.icons8.com/office/40/000000/beer.png',
    content: '<h1>' + breweryName + '</h1>'
  });

console.log(addMarker)


  function addMarker(props){
  var marker = new google.maps.Marker({
    position: props.coords,
    map: map,
    icon: props.iconImage
  });

if(props.iconImage){
  marker.setIcon(props.iconImage);
}


  if(props.content){
  var infoWindow = new google.maps.InfoWindow({
    content: props.content
  });

  marker.addListener('click', function(){
    infoWindow.open(map, marker);
  }); 


}}};

// Robert **********  This document.ready() wraps around everything right? I put the });



