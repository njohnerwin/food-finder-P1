$(document).ready(function () {
    // use variables to hold results to push to zomato api call
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

    
        // console.log(cityName)
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (data) {
            console.log(data)
            console.log(data.coord)
          
            // set items in local storage to be called in zomato api 
            // localStorage.setItem("lat", lat);
            // localStorage.setItem("lon", lon);   


    searchByCity();
    function searchByCity() {
        // lat = localStorage.getItem("lat");
        lat = data.coord.lat
        console.log(lat)
         lon = data.coord.lon
         console.log(lon)
        // console.log(lat)
        // lon = localStorage.getItem("lon")
        // console.log(lon)

        var api = "527c121c5d125ed8860ba0873283b0c9"

        // set lat and lon for api call
        var coordS = `lat=${lat}&lon=${lon}`
        console.log(coordS)

        var queryURL = `https://developers.zomato.com/api/v2.1/establishments?${coordS}`


        // var queryURL = `https://developers.zomato.com/api/v2.1/geocode?q=${coordS}&apikey=${api}`
        // https://developers.zomato.com/api/v2.1/establishments?lat=41.4939&lon=-73.0517
        // https://developers.zomato.com/api/v2.1/geocode?lat=41.4939&lon=-73.0517
        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {
                "user-key": api,
                "accept": "application/json"}
        }).then(function (data) {
            console.log(data)

        })

    }
})

});
});
