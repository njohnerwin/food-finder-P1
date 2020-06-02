$(document).ready(function () {
    // use variables to hold results to push to zomato api call
    var cityName = "";
    var stateCode = "";
    var lat = "";
    var lon = "";
    var id = "";
    var restList = [];
    console.log(restList)
    var res1 = "";
    var res1C = "";
    var r1Ac = "";
    var delivery = "";
    var takeOut = "";
    var address = "";
    var userRatings = "";
    var userRate = "";

    var apiK = "e1014510ebbf942b1f1d07d44fa4f59b";

    // search via city name for resturants 
    $(".save").on("click", function (event) {
        event.preventDefault();
        cityName = $(".search").val().trim();


        // AJAX call to the run OpenWeatherMap API to use city name as search criteria
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}${stateCode}&appid=${apiK}`;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (data) {
            console.log(data)
            console.log(data.coord)

            // search for resturants based on city/location
            searchByCity();
            function searchByCity() {
                lat = data.coord.lat
                console.log(lat)
                lon = data.coord.lon
                console.log(lon)

                var api = "527c121c5d125ed8860ba0873283b0c9";
                var entityType = "city";

                // set lat and lon for api call from weather api
                var coordS = `lat=${lat}&lon=${lon}`

                // AJAX call to use geocode to get popular resturants based on location
                var queryURL1 = `https://developers.zomato.com/api/v2.1/geocode?${coordS}`

                $.ajax({
                    url: queryURL1,
                    method: "GET",
                    headers: {
                        "user-key": api,
                        "accept": "application/json"
                    }
                }).then(function (rests) {
                    console.log(rests)
                    // create variables to hold restaurant list info
                    var rest0 = rests.nearby_restaurants[0].restaurant.name
                    console.log(rest0)
                    var rest1 = rests.nearby_restaurants[1].restaurant.name
                    var rest2 = rests.nearby_restaurants[2].restaurant.name
                    var rest3 = rests.nearby_restaurants[3].restaurant.name
                    var rest4 = rests.nearby_restaurants[4].restaurant.name 
                    var rest5 = rests.nearby_restaurants[5].restaurant.name
                    var rest6 = rests.nearby_restaurants[6].restaurant.name
                    var rest7 = rests.nearby_restaurants[7].restaurant.name
                    var rest8 = rests.nearby_restaurants[8].restaurant.name
                    console.log(rest8)

                    restList = [rest0, rest1, rest2, rest3, rest4, rest5, rest6, rest7, rest8];
                    console.log(restList)
                    res1 = rests.nearby_restaurants[0].restaurant.name;
                    res1C = rests.nearby_restaurants[0].restaurant.cuisines;
                    r1Ac = rests.nearby_restaurants[0].restaurant.average_cost_for_two;
                    delivery = rests.nearby_restaurants[0].restaurant.R.has_menu_status.delivery;
                    takeOut = rests.nearby_restaurants[0].restaurant.R.has_menu_status.takeaway;
                    address = rests.nearby_restaurants[0].restaurant.location.address;
                    userRatings = rests.nearby_restaurants[0].restaurant.user_rating.aggregate_rating;
                    userRate = rests.nearby_restaurants[0].restaurant.user_rating.rating_text;

                    console.log(res1)
                    console.log(res1C)
                    console.log(r1Ac)
                    console.log(delivery)
                    console.log(takeOut)
                    console.log(address)
                    console.log(userRatings)
                    console.log(userRate)

                    // append restaurant info to page
                    $("#res").append("<p>" + "Restaurant Name: " + res1 + "</p>")
                    $("#res").append("<p>" + "Cuisine: "+ res1C + "</p>")
                    $("#res").append("<p>" + "Average Cost For Two: "+ "$" + r1Ac + "</p>")
                    $("#res").append("<p>" + "Delivery: "+ delivery + "</p>")
                    $("#res").append("<p>" + "Takeout: " + takeOut + "</p>")
                    $("#res").append("<p>" +"Address: " + address + "</p>")
                    $("#res").append("<p>" + "User Ratings: " + userRatings + "</p>")
                    $("#res").append("<p>" + "Restaurant Rating: " + userRate + "</p>")
                   
                    // render list of restaurants based on city search
                    renderRestaurantList();
                    function renderRestaurantList() {
                        console.log(restList)
                        // $.each(restList, function (i, resturants) { 
                        //     $("#res").append("<div>" + restList + "</div>");

                        // })
                        // loop through array and append list 
                        for (var i = 0; i < restList.length; i++){
                            var restL = $("<ul>");
                            $("#res").append("<ul>" + restList[i] + "</ul>")
                            
                            console.log(restList[i])
                            
                        }
                
        
                    };
                    // $.each(cityList, function (i, city) {
                    //     var button = $("<br><button>")
                    //     button.addClass("cities")
                    //     button.text(city).val(city)
                    //     $("#city-search").append(button)


                // }
                    

                })


            }
        })

    });
});


 // id = rests.establishments[0].establishment.id
                    // console.log(id)

                    // console.log(entityType)
                    // api call to get resturants details
                    // var ids = id
                    // console.log(ids)
                    // var queryURL2 = `https://developers.zomato.com/api/v2.1/location_details?entity_id=${id}&entity_type=${entityType}`

                    // console.log(queryURL2)

                    // // // https://developers.zomato.com/api/v2.1/location_details?entity_id=281&entity_type=city

                    // $.ajax({
                    //     url: queryURL2,
                    //     method: "GET",
                    //     headers: {
                    //         "user-key": api,
                    //         "accept": "application/json"
                    //     }
                    // }).then(function (details) {
                    //     console.log(details)

                    // })