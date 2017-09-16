// 3.4 City Information
// Now lets look up some information about the city.

// 1.) Inside of our dynamic route, grab the name submitted by the user,
// lookup the city information on the cities object and assign it to the cityInfo variable.Line20
// 2.) Check to see if cityInfo exists and if so, respond with the cityInfo in JSON format.Line21, Line24
// 3.) If cityInfo does not exist, respond with a 404 HTTP status code and a JSON message that says "City not found".
// Line24, Line25
// app.js
var express = require('express');
var app = express();

var cities = {
  'Lotopia': 'Rough and mountainous',
  'Caspiana': 'Sky-top island',
  'Indigo': 'Vibrant and thriving',
  'Paradise': 'Lush, green plantation',
  'Flotilla': 'Bustling urban oasis'
};

app.get('/cities/:name', function (request, response) {
    var cityInfo = cities[request.params.name];
  if(!cityInfo){
    response.status(404);
    response.json("City not found");
  }else {
   response.json(cityInfo); 
  }
});

app.listen(3000);

// 3.6 Flexible Routes 250 PTS
// Our current route only works when the city name argument matches exactly the properties in the cities object.
// This is a problem. We need a way to make our code more flexible.

// 1.) Inside our route, call the parseCityName() function passing in the name parameter.
// Assign the return value to the new variable called cityName.Line55
// 2.) Now, using the city name returned from the parseCityName() function, lookup the corresponding description
// using the cities object and store it in the correct variable that will make the rest of the function work as intended.
// Line56
// app.js
var express = require('express');
var app = express();

var cities = {
  'Lotopia': 'Rough and mountainous',
  'Caspiana': 'Sky-top island',
  'Indigo': 'Vibrant and thriving',
  'Paradise': 'Lush, green plantation',
  'Flotilla': 'Bustling urban oasis'
};

app.get('/cities/:name', function (request, response) {
    var cityName = parseCityName(request.params.name);
    var cityInfo = cities[cityName];
  if(cityInfo) {
    response.json(cityInfo);
  } else {
    response.status(404).json('City not found');
  }
});

function parseCityName(name) {
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return parsedName;
}

app.listen(3000); 

// 3.8 Dynamic Routes II 250 PTS
// Whenever we use our name parameter we want to parse it a specific way.
// Let's clean up our existing code so that all routes with a name parameter get the same special handling.

// 1.) Call app.param() to intercept requests that contain an argument called 'name'.
// Remember app.param() takes a callback function as its second argument, which uses the same signature as a middleware.
// Line93
// 2.) inside the app.param() callback function, call the parseCityName() function with the submitted name parameter.
// Set the return value to a new property in the request object called cityName.Line94
// 3.) Finally, call a function that moves processing to the next function in the stack.

// app.js
var express = require('express');
var app = express();

var cities = {
  'Lotopia': 'Rough and mountainous',
  'Caspiana': 'Sky-top island',
  'Indigo': 'Vibrant and thriving',
  'Paradise': 'Lush, green plantation',
  'Flotilla': 'Bustling urban oasis'
};
app.param('name', function(request, response, next) {
  request.cityName = parseCityName(request.params.name);
  next();
});


app.get('/cities/:name', function (request, response) {
  var cityInfo = cities[request.cityName];
  if(cityInfo) {
    response.json(cityInfo);
  } else {
    response.status(404).json("City not found");
  }
});

function parseCityName(name){
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return parsedName;
}

app.listen(3000);

// 3.9 Dynamic Routes III 250 PTS
// The following code has a Dynamic Route that takes a year as an argument and returns the city created in that year.
// The problem with our current implementation is that it breaks when invalid data is sent on client requests.
// Let's add some basic validation.

// 1.) Call a function that intercepts Dynamic Routes with the 'year' param.
// 2.) Inside of that function, use the isYearFormat() function to check whether the year parameter is in a valid format.
// If so, then move processing to the next function in the stack.
// 3.) If the year parameter is not in a valid format,
// then respond with a 400 HTTP status code and a JSON message 'Invalid Format for Year'.

var express = require('express');
var app = express();

app.param('year', function(requests, response, next) { //1.)
  if(isYearFormat(request.params.year)) { //2.)
   next(); 
  }else { //3.)
    response.status(400).json('Invalid Format for year');

  }
});


var citiesYear = {
  5000: 'Lotopia',
  5100: 'Caspiana',
  5105: 'Indigo',
  6000: 'Paradise',
  7000: 'Flotilla' 
};

function isYearFormat(value) {
  var regexp = RegExp(/^d{4}$/);
  return regexp.test(value);
}

app.get('/cities/year/:year', function(request, response) {
  var year = request.params.year;
  var city = citiesYear[year];

  if(!city) {
      
//3.2 City Search 250 PTS
// We want to create an endpoint that we can use to filter cities.
// Follow the tasks below to to create this new route.

// 1.) Create a new route for GET requests to '/cities'. 
// The second argument should be a callback function which takes request and response.
// 2.) From inside of our route, create an if statement that checks whether
// a value is set to the query string parameter search.
// 3.) inside of the if block, call the citySearch() function, passing in the user submitted parameter for search.
// Then return the result of the function as a JSON response.

var express = require('express');
var app = express();

var cities = ['Caspiana', 'Indigo', 'Paradise'];

app.get('/cities', function(request, response) {//1.)
    if(request.query.search){//2.)
    response.json(citySearch(request.query.search));//3.)
  }
});


function citySearch (keyword) {
  var regexp = RegExp(keyword, 'i');
  var result = cities.filter(function (city) {
    return city.match(regexp);
  });

  return result;
}

app.listen(3000);

