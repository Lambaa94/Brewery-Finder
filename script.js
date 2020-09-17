$(document).ready(function(){
    $("#type").on("click", function() {
        //ADD STATE TO SEARCH PARAM
        ///variables for search parameters
        city = $("#city").val()
        

        var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city
        
        //OPEN BREWERY DB CALL
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response)
            //Test brewery is just first brewery on the list in this city (temporary)
            var testBrewery = response[0].name;
            console.log(testBrewery)
            
            //YELP CALL BASED ON CITY VAR + TESTBREWERY VAR (TEMPORARY)
            var yelpURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + testBrewery + "&location=" + city
        
            $.ajax({
                url: yelpURL,
                headers: { 
                'Authorization': 'Bearer r-ru9f0en8RW39PeL2KLuaZ1wwUgo6nm3cHomQ9RbfzCM63ocbL6mrc2C3Culn8SmlqtM5w65eUmULYxoGBHwoE0ibv-e2E-tNx0zE7kbiF01t8IjhfP7l7ocZVhX3Yx',
                },
                method: "GET"
            }).then(function(yelp) {
                console.log(yelp);
                console.log(yelp.businesses[0].name)
                console.log(yelp.businesses[0].rating)
                console.log(yelp.businesses[0].location.address1)
                var businessID = yelp.businesses[0].id
                console.log(businessID)
                //YELP RICH BUSINESS INFO CALL. Includes pics and more information. 
                //Biz ID can also be used for another API call for user reviews if we're interested in that.
                var yelpBizURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + businessID
                $.ajax({ 
                    url: yelpBizURL,
                    headers: { 
                        'Authorization': 'Bearer r-ru9f0en8RW39PeL2KLuaZ1wwUgo6nm3cHomQ9RbfzCM63ocbL6mrc2C3Culn8SmlqtM5w65eUmULYxoGBHwoE0ibv-e2E-tNx0zE7kbiF01t8IjhfP7l7ocZVhX3Yx',
                    },
                    method: "GET"
                }).then(function(biz) {
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
                    
                })
                
            })
        
            
        })
        

     })

})