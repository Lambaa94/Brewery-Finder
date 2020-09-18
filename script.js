
$(document).ready(function () {
  $("#find-breweries-button").on("click", function () {
    //ADD STATE TO SEARCH PARAM
    ///variables for search parameters
    city = $("#city").val();



    // **************ROBERT 
    localStorage.setItem("searched city", city);



    breweryType = $("#brewery-type").val();
    price = $("#price").val();


    // **************ROBERT 
    localStorage.setItem("searched brewery type", breweryType);
    localStorage.setItem("searched price", price);


    var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&by_type=" + breweryType

    //OPEN BREWERY DB CALL
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      console.log(response)

      //Test brewery is just first brewery on the list in this city (temporary)

      for (var i = 0; i < response.length; i++) {
        var testBrewery = response[i].name;
        var newBreweryButton = $("<button>");
        var hr = $("<hr>")
        newBreweryButton.text(testBrewery);
        newBreweryButton.attr("data-name", testBrewery);
        newBreweryButton.addClass("success button dynamicallyCreatedButtons");
        $(".brewNames").append(newBreweryButton)
        // $(".brewNames").append(newBreweryButton).append(hr);
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

    var yelpURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + localstorageBreweryName + "&location=" + city

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










  // Keep This Here
  googleApi = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB-WOeEFR0l5fEi4fiug6nt43CVRRbqdc0&callback=initMap"

  $("#google").attr("src", googleApi);
  // insert brewery name
  var breweryName = "The Stoogatz"
  // insert lat and lon from API
  var lat;
  var lng;

  function initMap() {
    var options = {
      zoom: 14,
      center: { lat: lat, lng: lng }
    }
    var map = new google.maps.Map(document.getElementById('map'), options)


    var marker = new google.maps.Marker({
      position: { lat: lat, lng: lng },
      map: map,
      icon: 'https://img.icons8.com/office/40/000000/beer.png'
    });

    var infoWindow = new google.maps.InfoWindow({
      content: '<h1>' + breweryName + '</h1>'
    });

    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });

  }



  // Robert **********  This document.ready() wraps around everything right? I put the });


});