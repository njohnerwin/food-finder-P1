$(document).ready(function () {
    // use variables to hold results to push to zomato api call
    var cityName = "";
    var lat = "";
    var lon = "";
    var id = "";
    var restList = [];
    var restIDS = []
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
        cityName = $("#locationInput").val().trim();

        // AJAX call to the run OpenWeatherMap API to use city name as search criteria
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiK}`;

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
                    res1ID0 = rests.nearby_restaurants[0].restaurant.id;
                    res1ID1 = rests.nearby_restaurants[1].restaurant.id;
                    res1ID2 = rests.nearby_restaurants[2].restaurant.id;
                    res1ID3 = rests.nearby_restaurants[3].restaurant.id;
                    res1ID4 = rests.nearby_restaurants[4].restaurant.id;
                    res1ID5 = rests.nearby_restaurants[5].restaurant.id;
                    res1ID6 = rests.nearby_restaurants[6].restaurant.id;
                    res1ID7 = rests.nearby_restaurants[7].restaurant.id;
                    res1ID8 = rests.nearby_restaurants[8].restaurant.id;
                    // save restaurants ID in array to use in api call
                  restIDS = [res1ID0, res1ID1, res1ID2, res1ID3, res1ID4, res1ID5, res1ID6, res1ID7, res1ID8];


                    // add restaurant list to array 
                    restList = [rest0, rest1, rest2, rest3, rest4, rest5, rest6, rest7, rest8];
                    console.log(restList)
                    res1 = rests.nearby_restaurants[0].restaurant.name;
                    res1C = rests.nearby_restaurants[0].restaurant.cuisines;
                    res1ID = rests.nearby_restaurants[0].restaurant.id;
                    console.log(res1ID)
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
                    restCard0();
                    function restCard0() {
                        $("#name1").append(":" + " " + rests.nearby_restaurants[0].restaurant.name);
                        $("#cuisine1").append(":" + " " + rests.nearby_restaurants[0].restaurant.cuisines);
                        $("#address1").append(" " + rests.nearby_restaurants[0].restaurant.location.address);
                        $("#delivery1").append(rests.nearby_restaurants[0].restaurant.R.has_menu_status.delivery);
                        $("#takeout1").append(rests.nearby_restaurants[0].restaurant.R.has_menu_status.takeaway)
                        $("#price1").append(":" + " $" + rests.nearby_restaurants[0].restaurant.average_cost_for_two)
                        $("#rating1").append(rests.nearby_restaurants[0].restaurant.user_rating.aggregate_rating)
                        $("#url1").append('"<a href="' + rests.nearby_restaurants[0].restaurant.menu_url + '">Menu</a>"')
                        // '"<a href="'+rests.nearby_restaurants[1].restaurant.menu_url + '">Menu</a>"'
                    }

                    // append restaurant at index 1 info to page
                    restCard1();
                    function restCard1() {
                        $("#name2").append(":" + " " + rests.nearby_restaurants[1].restaurant.name);
                        $("#cuisine2").append(":" + " " + rests.nearby_restaurants[1].restaurant.cuisines);
                        $("#address2").append(" " + rests.nearby_restaurants[1].restaurant.location.address);
                        $("#delivery2").append(rests.nearby_restaurants[1].restaurant.R.has_menu_status.delivery);
                        $("#takeout2").append(rests.nearby_restaurants[1].restaurant.R.has_menu_status.takeaway)
                        $("#price2").append(":" + " $" + rests.nearby_restaurants[1].restaurant.average_cost_for_two)
                        $("#rating2").append(rests.nearby_restaurants[1].restaurant.user_rating.aggregate_rating)
                        $("#url2").append('"<a href="' + rests.nearby_restaurants[1].restaurant.menu_url + '">Menu</a>"')

                    }

                    // append restaurant at index 2 info to page
                    restCard2();
                    function restCard2() {
                        $("#nam3").append(":" + " " + rests.nearby_restaurants[2].restaurant.name);
                        $("#cuisine3").append(":" + " " + rests.nearby_restaurants[2].restaurant.cuisines);
                        $("#address3").append(" " + rests.nearby_restaurants[2].restaurant.location.address);
                        $("#delivery3").append(rests.nearby_restaurants[2].restaurant.R.has_menu_status.delivery);
                        $("#takeout3").append(rests.nearby_restaurants[2].restaurant.R.has_menu_status.takeaway)
                        $("#price3").append(":" + " $" + +rests.nearby_restaurants[2].restaurant.average_cost_for_two)
                        $("#rating3").append(rests.nearby_restaurants[2].restaurant.user_rating.aggregate_rating)
                        $("#url3").append('"<a href="' + rests.nearby_restaurants[2].restaurant.menu_url + '">Menu</a>"')
                    }

                    // append restaurant at index 3 info to page
                    restCard3();
                    function restCard3() {
                        $("#name4").append(":" + " " + rests.nearby_restaurants[3].restaurant.name);
                        $("#cuisine4").append(":" + " " + rests.nearby_restaurants[3].restaurant.cuisines);
                        $("#address4").append(" " + rests.nearby_restaurants[3].restaurant.location.address);
                        $("#delivery4").append(rests.nearby_restaurants[3].restaurant.R.has_menu_status.delivery);
                        $("#takeout4").append(rests.nearby_restaurants[3].restaurant.R.has_menu_status.takeaway)
                        $("#price4").append(":" + " $" + rests.nearby_restaurants[3].restaurant.average_cost_for_two)
                        $("#rating4").append(rests.nearby_restaurants[3].restaurant.user_rating.aggregate_rating)
                        $("#url4").append('"<a href="' + rests.nearby_restaurants[3].restaurant.menu_url + '">Menu</a>"')
                    }


                    // Function for pushing resturant content for each button into the div
                    // displayRestaurantInfo()
                    function displayRestaurantInfo() {
                        var restIDS = $(this).attr("data-name");
                          
                        var queryURL = `https://developers.zomato.com/api/v2.1/restaurant?res_id=${restIDS}&apikey=${api}`;

                        console.log(queryURL)
                        $.ajax({
                            url: queryURL,
                            method: "GET"
                        }).then(function (res) {
                            // var restView = $("<div>");
                            // restView.addClass("restDetail");
                            // $(".restlist").append(restView)

                            // empty id's before dumping new info
                            $("#nameRes").empty();
                            $("#cuisineRes").empty();
                            $("#addressRes").empty();
                            $("#priceRes").empty();
                            $("#ratingRes").empty();
                            $("#urlRes").empty();
                           $("#nameRes").text("Restaurant Name: " + res.name);
                           $("#cuisineRes").text("Cuisine: " + res.cuisines);
                           $("#addressRes").text("Address: " +res.location.address);
                           $("#priceRes").text("Price Range: " + "$" + res.average_cost_for_two);
                        //    $("#deliveryRes").append(": " + res.has_menu_status)
                        //    $("#takeoutRes").append(": " + res.has_menu_status)
                           $("#ratingRes").text("User rating: " +res.user_rating.aggregate_rating);
                           $("#urlRes").html('"<a href="' + res.menu_url + '">Menu</a>"');
                          
                            // $(".restDetail").text(JSON.stringify(response));
                            console.log(res)
                        });
                    }
               
                    // Function for displaying restaurant list/data
                    // displayRestaurantList()
                    function displayRestaurantList() {
                        var div = $("<div>")
                
                        $(".grid-x").append(div)
                        // Deleting the buttons prior to adding new restaurant to prevent duplication
                        $(div).addClass("rest-view");
                        // restList.splice(restList[0])
                        $(".rest-view").empty();

                        for (var i = 0; i < restList.length; i++) {
                            // dynamically generating buttons for each restaurant in the array
                            var m = $("<button>");
                            var id = $("<p>")
                            id.addClass("list")
                            m.addClass("list");
                            m.attr("data-name", restIDS[i]);
                            id.text(restIDS[i])
                            m.text(restList[i]);
                            $(".rest-view").append(m);

                        }
                        
                    }

                    // Handles events when each restaurant button is clicked
                    $(".add-rest").on("click", function (event) {
                        event.preventDefault();
                        
                        var rest = $("#locationInput").val().trim();
                        console.log(rest)
                    
                    })

                    // // Calling the renderButtons function to display the initial buttons
                    $(document).on("click", ".list", displayRestaurantInfo);

                    $(".rest-view").empty();
                    displayRestaurantList();


                })

            }

        })

    });

});
