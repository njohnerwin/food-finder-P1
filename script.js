$(document).ready(function () {

    var city = prompt("Enter a city name!: ");
    var api = "527c121c5d125ed8860ba0873283b0c9"


    // var queryURL =  `http://api.tripadvisor.com/api/partner/2.0/${city}/155507?key=${api}`

    var queryURL = `https://developers.zomato.com/api/v2.1/cities?q=${city}&apikey=${api}`

    // var queryURL = `Accept: application/json --header "user-key:${api}https://developers.zomato.com/api/v2.1/cities?q=${city}`
   
    // var zip = prompt("Please enter your zip code!: ")
    // https://developers.zomato.com/527c121c5d125ed8860ba0873283b0c9/v2.1/cities\?q\=Naugatuck

    // "https://developers.zomato.com/" +api+ "/v2.1/cities?q=" + city
    

//     $.ajax({
//         url: queryURL,
//         method: "GET",
//     }).then(function (data) {
//         console.log(data)


// })

// fetch('https://api.ipify.org/?format=json')
// .then(results => results.json())
// .then(data => console.log(data.ip))

queryURL1 = "https://ipinfo.io"
$.ajax({
    url: queryURL,
    method: "GET",
}).then(function (data) {
    console.log(data.city)
    

})

})
