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
                    menuUrl = rests.nearby_restaurants[0].restaurant.menu_url

                    // $("#res").attr("href", rests.nearby_restaurants[0].restaurant.menu_url);
              

                    console.log(res1)
                    console.log(res1C)
                    console.log(r1Ac)
                    console.log(delivery)
                    console.log(takeOut)
                    console.log(address)
                    console.log(userRatings)
                    console.log(userRate)
                    console.log(menuUrl)

                    // append restaurant at index 0 info to page
                    function restCard0() {
                        $("#res0").append("<p>" + "Restaurant Name: " + res1 + "</p>")
                        $("#res0").append("<p>" + "Cuisine: " + res1C + "</p>")
                        $("#res0").append("<p>" + "Average Cost For Two: " + "$" + r1Ac + "</p>")
                        $("#res0").append("<p>" + "Delivery: " + delivery + "</p>")
                        $("#res0").append("<p>" + "Takeout: " + takeOut + "</p>")
                        $("#res0").append("<p>" + "Address: " + address + "</p>")
                        $("#res0").append("<p>" + "User Ratings: " + userRatings + "</p>")
                        $("#res0").append("<p>" + "Restaurant Rating: " + userRate + "</p>")
                        $("#res0").append("<p>" + "Menu: " + '"<a href="'+rests.nearby_restaurants[0].restaurant.menu_url + '">Menu</a>"' + "</p>")
                        // '"<a href="'+rests.nearby_restaurants[1].restaurant.menu_url + '">Menu</a>"'
                    }

                    // append restaurant at index 1 info to page
                    function restCard1() {
                        $("#res1").append("<p>" + "Restaurant Name: " + rests.nearby_restaurants[1].restaurant.name + "</p>")
                        $("#res1").append("<p>" + "Cuisine: " + rests.nearby_restaurants[1].restaurant.cuisines + "</p>")
                        $("#res1").append("<p>" + "Average Cost For Two: " + "$" + rests.nearby_restaurants[1].restaurant.average_cost_for_two + "</p>")
                        $("#res1").append("<p>" + "Delivery: " + rests.nearby_restaurants[1].restaurant.R.has_menu_status.delivery + "</p>")
                        $("#res1").append("<p>" + "Takeout: " + rests.nearby_restaurants[1].restaurant.R.has_menu_status.takeaway + "</p>")
                        $("#res1").append("<p>" + "Address: " + address + "</p>")
                        $("#res1").append("<p>" + "User Ratings: " + rests.nearby_restaurants[1].restaurant.user_rating.aggregate_rating + "</p>")
                        $("#res1").append("<p>" + "Restaurant Rating: " + rests.nearby_restaurants[1].restaurant.user_rating.rating_text + "</p>")
                        $("#res1").append("<p>" + "Menu: " + '"<a href="'+rests.nearby_restaurants[1].restaurant.menu_url + '">Menu</a>"' + "</p>")
                        // $("#res1").html('"<a href="'+rests.nearby_restaurants[1].restaurant.menu_url + '">Menu</a>"')  


                        // $('#my-link').html('<a href="http://www.google.com">Google</a>')
                    }
                    // append restaurant at index 2 info to page
                    function restCard2() {
                        $("#res2").append("<p>" + "Restaurant Name: " + rests.nearby_restaurants[2].restaurant.name + "</p>")
                        $("#res2").append("<p>" + "Cuisine: " + rests.nearby_restaurants[2].restaurant.cuisines + "</p>")
                        $("#res2").append("<p>" + "Average Cost For Two: " + "$" + rests.nearby_restaurants[2].restaurant.average_cost_for_two + "</p>")
                        $("#res2").append("<p>" + "Delivery: " + rests.nearby_restaurants[2].restaurant.R.has_menu_status.delivery + "</p>")
                        $("#res2").append("<p>" + "Takeout: " + rests.nearby_restaurants[2].restaurant.R.has_menu_status.takeaway + "</p>")
                        $("#res2").append("<p>" + "Address: " + address + "</p>")
                        $("#res2").append("<p>" + "User Ratings: " + rests.nearby_restaurants[2].restaurant.user_rating.aggregate_rating + "</p>")
                        $("#res2").append("<p>" + "Restaurant Rating: " + rests.nearby_restaurants[2].restaurant.user_rating.rating_text + "</p>")
                        $("#res2").append("<p>" + "Menu: " + '"<a href="'+rests.nearby_restaurants[2].restaurant.menu_url + '">Menu</a>"' + "</p>")
                    }
                    // append restaurant at index 3 info to page
                    function restCard3() {
                        $("#res3").append("<p>" + "Restaurant Name: " + rests.nearby_restaurants[3].restaurant.name + "</p>")
                        $("#res3").append("<p>" + "Cuisine: " + rests.nearby_restaurants[3].restaurant.cuisines + "</p>")
                        $("#res3").append("<p>" + "Average Cost For Two: " + "$" + rests.nearby_restaurants[3].restaurant.average_cost_for_two + "</p>")
                        $("#res3").append("<p>" + "Delivery: " + rests.nearby_restaurants[3].restaurant.R.has_menu_status.delivery + "</p>")
                        $("#res3").append("<p>" + "Takeout: " + rests.nearby_restaurants[3].restaurant.R.has_menu_status.takeaway + "</p>")
                        $("#res3").append("<p>" + "Address: " + address + "</p>")
                        $("#res3").append("<p>" + "User Ratings: " + rests.nearby_restaurants[3].restaurant.user_rating.aggregate_rating + "</p>")
                        $("#res3").append("<p>" + "Restaurant Rating: " + rests.nearby_restaurants[3].restaurant.user_rating.rating_text + "</p>")
                        $("#res3").append("<p>" + "Menu: " + '"<a href="'+rests.nearby_restaurants[3].restaurant.menu_url + '">Menu</a>"' + "</p>")
                    }
                    // render list of restaurants based on city search
                    renderRestaurantList();
                    function renderRestaurantList() {
                        console.log(restList)
                        // for (var i = 0; i < restList.length; i++) {
                        //     $("#res").append("<div>" + restList[0] + "</div>");
                        //     $("#res").append("<div>" + restList[1] + "</div>")
                        //     $("#res").append("<div>" + restList[2] + "</div>")
                        //     $("#res").append("<div>" + restList[3] + "</div>")
                        //     $("#res").append("<div>" + restList[4] + "</div>")
                        //     $("#res").append("<div>" + restList[5] + "</div>")
                        //     $("#res").append("<div>" + restList[6] + "</div>")
                        //     $("#res").append("<div>" + restList[7] + "</div>")
                        //     $("#res").append("<div>" + restList[8] + "</div>")

                        //     restList.splice(restList[0]);

                        // }
                        // loop through array and append list 
                        for (var i = 0; i < restList.length; i++) {
                            var restL = $("<ul>");
                            // $("#res").append("<ul>" + restList[i] + "</ul>")
                            console.log(cityName)
                            if (restList[0]) {
                                restCard0();
                                restCard1()
                                restCard2()
                                restCard3()

                                // use splice method to remove duplication 
                                restList.splice(restList[0]);
                            } else {

                            }
                        // console.log(restList[i])

                        }

                    };

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