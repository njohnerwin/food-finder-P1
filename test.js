var ipInfo;
var city;
var state;
var lat;
var lon;
var r1,r2,r3,r4,r5,r6,r7,r8,r9,r10;
var im1;




function start(){

    //getting users ip
    $.ajax({
        url: "https://api.ipify.org?format=json&callback=?",
        method: "GET"
    }).then(function getIP(json){
        console.log(json);
        ipInfo = json.ip;

        //adding users ip to the link
        var ipLink = "http://ip-api.com/json/" + ipInfo;




        //getting users location based on ip
        $.ajax({
            url: ipLink,
            method: "GET"
        }).then(function getInfo(info){
            console.log(info);


            //asigning variables for loction
            city = info.city;
            state = info.regionName;
            lat = info.lat;
            lon = info.lon;
            

            //api key for zomato
            var key = "0a122aa8b91face2a9097e2f2b6aa1e5";


            //String adding lon and lat
            var resString = `lat=${lat}&lon=${lon}`

            //Complete link for api
            var resLink = "https://developers.zomato.com/api/v2.1/geocode?" + resString


            //calling zomato api with users cords. for near by food
            $.ajax({
                url: resLink,

                method: "GET",

                headers: {
                    "user-key": key,
                    "accept": "application/json"
                }

            }).then(function getRes(resturants){

                console.log(resturants);


                //asigning resturants to there variables
                r1 = resturants.nearby_restaurants[0].restaurant.name;
                r2 = resturants.nearby_restaurants[1].restaurant.name;
                r3 = resturants.nearby_restaurants[2].restaurant.name;
                r4 = resturants.nearby_restaurants[3].restaurant.name;
                r5 = resturants.nearby_restaurants[4].restaurant.name;
                r6 = resturants.nearby_restaurants[5].restaurant.name;
                r7 = resturants.nearby_restaurants[6].restaurant.name;
                r8 = resturants.nearby_restaurants[7].restaurant.name;
                r9 = resturants.nearby_restaurants[8].restaurant.name;
                r10 = resturants.nearby_restaurants[9].restaurant.name;
                

                update();
            });

        });
    });  
}




//function to update html
function update(){
    //add items to html here

}

start();

