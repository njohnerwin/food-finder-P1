$(document).ready(function () {

    // numerical codes: -1 = has, 0 = doesn't have
    // initialize variables
    var zipCode;
    var locationString;
    var lat;
    var lon;
    var restaurant;
    var resCuisines;
    var resAvgCost;
    var delivery;
    var deliveryStr;
    var takeOut;
    var takeOutStr;
    var address;
    var userRatings;
    var zomatoURL;
    var pageCount;
    var page;

    //required API keys (ipapi doesn't need one)
    var openweatherKey = "e1014510ebbf942b1f1d07d44fa4f59b";
    var zomatoKey = "527c121c5d125ed8860ba0873283b0c9";

    //The primary function of the page - creates the restaurant cards and publishes them to #restInfo
    function searchByCity(lat, lon, page) {

        //converts the current page number into a usable numeric "start" value for the query
        var offset = (page * 15).toString();

        //The full query URL
        var zomatoQ = `https://developers.zomato.com/api/v2.1/search?start=${offset}&count=15&lat=${lat}&lon=${lon}&sort=real_distance`;

        $.ajax({
            url: zomatoQ,
            method: "GET",
            headers: {
                "user-key": zomatoKey,
                "accept": "application/json"
            }
        }).then(function (rests) {
            //The return is logged for easy debugging
            console.log(rests);

            //Calculates a total page count from the # of results in the return
            pageCount = Math.ceil(rests.results_found / rests.results_shown);

            // empty id's before dumping new info
            $("#restInfo").empty();

            revealNav(page);

            //Displays the current page and total page count to the user
            $("#bookmark").text(`Page ${page + 1} of ${pageCount}`);

            //loops through all of the restaurants in the current return
            for (var x in rests.restaurants) {

                //stores all of the relevant restaurant info in the proper variables for ease of access
                restaurant = rests.restaurants[x].restaurant.name;
                resCuisines = rests.restaurants[x].restaurant.cuisines;
                resAvgCost = rests.restaurants[x].restaurant.average_cost_for_two;
                delivery = rests.restaurants[x].restaurant.R.has_menu_status.delivery;
                takeOut = rests.restaurants[x].restaurant.R.has_menu_status.takeaway;
                address = rests.restaurants[x].restaurant.location.address;
                userRatings = rests.restaurants[x].restaurant.user_rating.aggregate_rating;
                zomatoURL = rests.restaurants[x].restaurant.url;

                //Translates the numeric "delivery" and "takeout" results into English
                if (delivery === -1) {
                    deliveryStr = "Yes";
                }
                else {
                    deliveryStr = "No";
                }

                if (takeOut === -1) {
                    takeOutStr = "Yes";
                }
                else {
                    takeOutStr = "No";
                }
                
                //Populates the restInfo div with a distinct card containing all of the information received for this particular restaurant
                $("#restInfo").append($(`
                    <section class="card" id="card${x}">
                        <h2 id="name${x}">${restaurant}</h2>
                        <p id="cuisine${x}"><b>Cuisine:</b> ${resCuisines}</p>
                        <p id="address${x}"><b>Address:</b> ${address}</p>
                        <p id="averCost${x}"><b>Average Cost for Two:</b> $${resAvgCost}</p>
                        <p id="delivery${x}"><b>Delivery:</b> ${deliveryStr}</p>
                        <p id="takeout${x}"><b>Takeout:</b> ${takeOutStr}</p>
                        <p id="rating${x}"><b>User rating:</b> ${userRatings}</p>
                        <a href="${zomatoURL}" id="url${x}">Zomato home page</a>
                    </section>
                `));

            };
        });
    }

    //Function manages the display status of the page navigation buttons. Hides "first" and "prev" if on page 1.
    function revealNav(page) {
        
        if (page > 0) {
            $("#prev").css("visibility", "visible");
            $("#first").css("visibility", "visible");
        }
        else {
            $("#prev").css("visibility", "hidden");
            $("#first").css("visibility", "hidden");
        }

        $("#next").css("visibility", "visible");

    }

    //Gets the user's IP and their location (in lat/lon coordinates) from ipapi, then calls searchByCity()
    $.ajax({
        url: "https://ipapi.co/json/",
        method: "GET"
    }).then(function(json) {
        console.log("This is the ipapi return:");
        console.log(json);
        lon = json.longitude;
        lat = json.latitude;
        page = 0;
        locationString = `${json.city}, ${json.region_code} - ${json.country}`;
        $("#showLocation").text("Showing results for your location: " + locationString);
        searchByCity(lat, lon, page);
    })

    //Validates zip code input and uses it to call searchByCity() on a new location
    $("#save").on("click", function (event) {

        event.preventDefault();
        zipCode = $("#locationInput").val().trim();

        var openweatherQ = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${openweatherKey}`;

        if (zipCode === "" || zipCode.length != 5) {
            searchByCity(lat, lon, page);
        }

        //Uses the OpenWeather API to translate the zip code into coordinates
        $.ajax({
            url: openweatherQ,
            method: "GET",
        }).then(function (data) {
            console.log(data);
            console.log(data.coord);
            lat = data.coord.lat;
            lon = data.coord.lon;
            page = 0;
            locationString = data.name;
            $("#showLocation").text("Showing results for: " + locationString);
            searchByCity(lat, lon, page);
        })

    })

    //The following three event handlers govern page navigation
    $("#next").on("click", function (event) {
        page++;
        searchByCity(lat, lon, page);
    })

    $("#first").on("click", function () {
        page = 0;
        searchByCity(lat, lon, page);
    })

    $("#prev").on("click", function (event) {
        page--;
        searchByCity(lat, lon, page);
    })

})