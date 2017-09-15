// 1.3 Locations
// Let's start coding our Express application.

// 1.) In our app.js, require the express module and assign it to the express variable.Line6
// 2.) Using the function assigned to express, create an application instance and assign it to the app variable.Line9
// 3.) Using our application instance, app, create a new route that accepts GET requests on the /locations URL path.
// Remember to pass a callback function which takes a request and response.Line12
// 4.) Respond with an array of city names. The city names should be Caspiana, Indigo and Paradise.Line14
// 5.) Bind our application to port 3001.
// 6.) When our application is ready to receive requests, print the string "Running Express" to the console.Line18

// app.js
 var express = require("express");
 var app = express();
 app.get('/locations', function(request, response) {
      response.json(cityNames);
});
    app.listen(3001, function() {
    console.log("Running Express");
  });
  
// 1.6 Cities
// In order to better reflect the domain of our application,
// we want to change our existing route from /locations to /cities.

// 1.) First, change our existing route from /locations to /cities.(It was previously /locations)Line32
// 2.) Now create a new route for /locations.Line37
// 3.) Now redirect from /locations to /cities path using the Moved Permanently HTTP status code 
// (free hint for you, the code for that is 301).Line42


// app.js
var express = require('express');
var app = express();

app.get('/cities', function (request, response) {                                                                                                     
  var cities = ['Caspiana', 'Indigo', 'Paradise'];
  response.send(cities);
});
app.get('/locations', function (request, response) {                                                                                                     
  var cities = ['Caspiana', 'Indigo', 'Paradise'];
  response.redirect(301, '/cities');
});



app.listen(3001, function () {
  console.log("Running Express");
});
