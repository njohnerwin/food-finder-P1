var i = 0;
var images = [];
var time = 4000;

images[0] = 'assets/bckg_photos/abundance-1868573_1920.jpg';
images[1] = 'assets/bckg_photos/asparagus-2169305_1920.jpg';
images[2] = 'assets/bckg_photos/bakery-1868925_1920.jpg';
images[3] = 'assets/bckg_photos/burger-731298_1920.jpg';
images[4] = 'assets/bckg_photos/coffee-841425_1920.jpg';
images[5] = 'assets/bckg_photos/cooking-2132874_1920.jpg';
images[6] = 'assets/bckg_photos/desserts-1868181_1920.jpg';
images[7] = 'assets/bckg_photos/fish-market-428058_1920.jpg';
images[8] = 'assets/bckg_photos/market-3466906_1920.jpg';
images[9] = 'assets/bckg_photos/pizza-329523_1920.jpg';
images[10] = 'assets/bckg_photos/spaghetti-3547078_1920.jpg';
images[11] = 'assets/bckg_photos/sushi-2853382_1920.jpg';
images[12] = 'assets/bckg_photos/waffles-5192626_1920.jpg';


function changeImage(){
    document.slide.src = images[i];

    if(i < images.length){
        i++;
    }
    else {
        i = 0;
    }
    setTimeout('changeImage()', time);
}

window.onload = changeImage;

$(document).ready(function () {

    // numerical codes: -1 = has, 0 = doesn't have
    // use variables to hold results to push to zomato api call
    var cityName;
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


    $("#save").on("click", function (event) {

        event.preventDefault();
        cityName = $("#locationInput").val().trim();

        var openweatherQ = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openweatherKey}`;

        $.ajax({
            url: openweatherQ,
            method: "GET",
        }).then(function (data) {
            console.log(data);
            console.log(data.coord);
            lat = data.coord.lat;
            lon = data.coord.lon;
            searchByCity(lat, lon);
        })

    })
})