const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:true})); // esa es una linea de codigo que tenemos que poner siempre
                                                  //cuando queremos parse into the body of the post request

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req,res){
  const query =  req.body.cityName;
  const apikey = "b9b0035f2ce843b8a4f2440eed583d55"
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apikey + "";

  https.get(url, function(response) {
    console.log(response);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description; //pongo [0] pq esta dentro del primer array del objeto.
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius</h1>");
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<img src = " + imgURL + ">");


      res.send();



    });


  });


});









app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
