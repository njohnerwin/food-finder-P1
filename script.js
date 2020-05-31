$(document).ready(function () {

    var cityName = "";
    var stateCode = "";
    var lat = "";
    var lon = "";

    var apiK = "e1014510ebbf942b1f1d07d44fa4f59b";

    $(".save").on("click", function (event) {
        event.preventDefault();
        cityName = $(".search").val().trim();

        // if (!cityName) {
        //     alert("Please enter a City Name!")
        // }
       
        // AJAX call to the run OpenWeatherMap API to use city name as search criteria
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}${stateCode}&appid=${apiK}`;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (data) {
            console.log(data)

            var lat = data.city.coord.lat
            var lon = data.city.coord.lon

            localStorage.setItem("lat", lat);
            localStorage.setItem("lon", lon);
            console.log(lat)
            console.log(lon)
        })

    })


    searchByCity();
    function searchByCity() {
        lat = localStorage.getItem("lat");
        lon = localStorage.getItem("lon")

        var api = "527c121c5d125ed8860ba0873283b0c9"

        // set lat and lon for api call
        var coordS = `lat=${lat}&lon=${lon}`

        var queryURL = `https://developers.zomato.com/api/v2.1/geocode?q=${coordS}&apikey=${api}`

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (data) {
            console.log(data)

        })

    }
})



// curl -X GET --header "Accept: application/json" --header "user-key: 527c121c5d125ed8860ba0873283b0c9" "https://developers.zomato.com/api/v2.1/cities?q=Hartford"

// curl -X GET --header "Accept: application/json" --header "user-key: 527c121c5d125ed8860ba0873283b0c9" "https://developers.zomato.com/api/v2.1/geocode?lat=41.4939&lon=-73.0517"