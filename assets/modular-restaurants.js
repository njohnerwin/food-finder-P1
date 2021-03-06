$(document).ready(function () {

    // numerical codes: -1 = has, 0 = doesn't have
    // use variables to hold results to push to zomato api call
    var zipCode;
    var locationString;
    var lat;
    var lon;
    var id;
    var restList = [];
    var restIDS = []
    console.log(restList)
    var restaurant;
    var resID;
    var resCuisines;
    var resAvgCost;
    var delivery;
    var deliveryStr;
    var takeOut;
    var takeOutStr;
    var address;
    var userRatings;
    var userRate;
    var menuURL;
    var ipInfo;

    var openweatherKey = "e1014510ebbf942b1f1d07d44fa4f59b";
    var zomatoKey = "527c121c5d125ed8860ba0873283b0c9";

    function searchByCity(lat, lon) {

        var zomatoQ = `https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lon}`;

        console.log(zomatoQ);

        $.ajax({
            url: zomatoQ,
            method: "GET",
            headers: {
                "user-key": zomatoKey,
                "accept": "application/json"
            }
        }).then(function (rests) {
            // empty id's before dumping new info
            $("#restInfo").empty();
            for (var x in rests.nearby_restaurants) {
                console.log(rests.nearby_restaurants[x]);
                restaurant = rests.nearby_restaurants[x].restaurant.name;
                resID = rests.nearby_restaurants[x].restaurant.id;
                resCuisines = rests.nearby_restaurants[x].restaurant.cuisines;
                resAvgCost = rests.nearby_restaurants[x].restaurant.average_cost_for_two;
                delivery = rests.nearby_restaurants[x].restaurant.R.has_menu_status.delivery;
                takeOut = rests.nearby_restaurants[x].restaurant.R.has_menu_status.takeaway;
                address = rests.nearby_restaurants[x].restaurant.location.address;
                userRatings = rests.nearby_restaurants[x].restaurant.user_rating.aggregate_rating;
                userRate = rests.nearby_restaurants[x].restaurant.user_rating.rating_text;
                menuURL = rests.nearby_restaurants[x].restaurant.menu_url;

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
                
                $("#restInfo").append($(`
                    <section class="card" id="card${x}">
                        <h2 id="name${x}">${restaurant}</h2>
                        <p id="cuisine${x}"><b>Cuisine:</b> ${resCuisines}</p>
                        <p id="address${x}"><b>Address:</b> ${address}</p>
                        <p id="averCost${x}"><b>Average Cost for Two:</b> $${resAvgCost}</p>
                        <p id="delivery${x}"><b>Delivery:</b> ${deliveryStr}</p>
                        <p id="takeout${x}"><b>Takeout:</b> ${takeOutStr}</p>
                        <p id="rating${x}"><b>User rating:</b> ${userRatings}</p>
                        <a href="#" id="url${x}">Zomato home page</a>
                    </section>
                `));

            };
        });
    }


    $.ajax({
        url: "https://ipapi.co/json",
        method: "GET"
    }).then(function(json) {
        console.log("This is the ipapi return:");
        console.log(json);
        lon = json.longitude;
        lat = json.latitude;
        locationString = `${json.city}, ${json.region_code} - ${json.country}`;
        $("#showLocation").text("Showing results for your location: " + locationString);
        searchByCity(lat, lon);
    })

    $("#save").on("click", function (event) {

        event.preventDefault();
        zipCode = $("#locationInput").val().trim();

        var openweatherQ = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${openweatherKey}`;

        $.ajax({
            url: openweatherQ,
            method: "GET",
        }).then(function (data) {
            console.log(data);
            console.log(data.coord);
            lat = data.coord.lat;
            lon = data.coord.lon;
            locationString = data.name;
            $("#showLocation").text("Showing results for: " + locationString);
            searchByCity(lat, lon);
        })

    })

})