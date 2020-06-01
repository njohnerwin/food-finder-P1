$(document).ready(function () {
    // use variables to hold results to push to zomato api call
    var cityName = "";
    var stateCode = "";
    var lat = "";
    var lon = "";
    var id = "";

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
                    // create variables to hold restaurant info
                    var res1 = rests.nearby_restaurants[0].restaurant.name
                    var res1C = rests.nearby_restaurants[0].restaurant.cuisines
                    var r1Ac = rests.nearby_restaurants[0].restaurant.average_cost_for_two
                    var delivery = rests.nearby_restaurants[0].restaurant.R.has_menu_status.delivery
                    var takeOut = rests.nearby_restaurants[0].restaurant.R.has_menu_status.takeaway
                    var address = rests.nearby_restaurants[0].restaurant.location.address
                    var userRatings = rests.nearby_restaurants[0].restaurant.user_rating.aggregate_rating
                    var userRate = rests.nearby_restaurants[0].restaurant.user_rating.rating_text

                    


                    console.log(res1)
                    console.log(res1C)
                    console.log(r1Ac)
                    console.log(delivery)
                    console.log(takeOut)
                    console.log(address)
                    console.log(userRatings)
                    console.log(userRate)

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