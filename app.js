// Setting up app dependencies =
const { json, response } = require("express");
const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

// Setting up the URL for the api

// Appication functions and logic

function urlGenerator(city){
    const unit = "metric";
    const apiKey = "ade23561d34e2d5671891be50eee3dd0";
    const apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
    const url = apiEndPoint + "q=" + city + "&appid=" + apiKey + "&units=" + unit; 

    return url;
}

// https.get(url, function(req, res) {

//     response.on("data", function temperature(response){
//         let weatherData = JSON.parse(data);
//         let temperature = weatherData.main.temp;
//         var cityName = weatherData.name;
//         res.send(cityName + " : " + temperature );
//     })
// })



app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res){
    const cityName1 = req.body.cityNameOne;
    const cityName2 = req.body.cityNameTwo;

    const cityOneUrl = urlGenerator(cityName1);
    const cityTwoUrl = urlGenerator(cityName2);




    https.get(cityOneUrl, function(response){

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            // const description = weatherData.weather[0].description;
            const iconId = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/" + iconId + "@2x.png";

            res.send(cityName1 + " : " + temperature + " degree celcius");

        })
    })

    // https.get(cityTwoUrl, function(response){
    //     response.on("data", function(data){
    //         const weatherDataOne = JSON.parse(data);
    //         const temperatureOne = weatherDataOne.main.temp;
    //         // res.write(cityName2 + " : " + temperatureOne);
    //     })
    // })

    // res.send();

    
})




app.listen(port, function(){
    console.log("port is up and running at " + port);
})