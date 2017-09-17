// 5.2 Route Instance
// Let's rewrite our cities routes using a Route Instance.

// 1.) Create a new Route Instance for the '/cities' URL path and assign it to the citiesRoute variable.
// 2.) Move the code from our previous app.get() route to a new GET route on the citiesRoute object.
// 3.) Move app.post() to citiesRoute.


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
// In memory store for the cities in our application
var cities = {};

var citiesRoute = app.route('/cities');//1.)


// GET route for /cities
app.citiesRoute(function (request, response) {//2.)
  if(request.query.search) {
    response.json(citySearch(request.query.search));
  } else {
    response.json(cities);
  }
});

// POST route for /cities
citiesRoute.post(parseUrlencoded, function (request, response) {//3.)
  if(request.body.description.length > 4) {
    var city = createCity(request.body.name, request.body.description);
    response.status(201).json(city);
  } else {
    response.status(400).json('Invalid City');
  }
});

// GET route for /cities/:name
app.get('/cities/:name', function (request, response) {
  var cityInfo = cities[request.cityName];
  if(cityInfo) {
    response.json(cityInfo);
  } else {
    response.status(404).json('City not found');
  }
});

// DELETE route for /cities/:name
app.delete('/cities/:name', function (request, response) {
  if(cities[request.cityName]) {
    delete cities[request.cityName];
    response.sendStatus(200);
  } else {
    response.sendStatus(404);
  }
});

// Searches for keyword in description and returns the city
function citySearch(keyword) {
  var result = null;
  var search = RegExp(keyword, 'i');
  for(var city in cities) {
    if(search.test(cities[city])) {
      return city;
    }
  }
}

// Adds a new city to the in memory store
function createCity(name, description) {
  cities[name] = description;
  return name;
}

app.listen(3000);

// 4.) Now, let's get rid of the citiesRoute temporary variable and use chaining function calls.
// 5.) Finally, let's move the old routes for the '/cities/:name' URL path to use the new Route Instance API.

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
// In memory store for the cities in our application
var cities = {};

app.route('/cities') //semicolon, var citiesRoute removed

// GET route for /cities
.get(function (request, response) { //citiesRoute removed
  if(request.query.search) {
    response.json(citySearch(request.query.search));
  } else {
    response.json(cities);
  }
}) //semicolon removed

// POST route for /cities
.post(parseUrlencoded, function (request, response) {// citiesRoute removed
  if(request.body.description.length > 4) {
    var city = createCity(request.body.name, request.body.description);
    response.status(201).json(city);
  } else {
    response.status(400).json('Invalid City');
  }
});

// GET route for /cities/:name
app.route('/cities/:name') //.5)
// GET route for /cities/:name
.get(function (request, response) {
  var cityInfo = cities[request.cityName];
  if(cityInfo) {
    response.json(cityInfo);
  } else {
    response.status(404).json('City not found');
  }
})

// DELETE route for /cities/:name
.delete(function (request, response) {
  if(cities[request.cityName]) {
    delete cities[request.cityName];
    response.sendStatus(200);
  } else {
    response.sendStatus(404);
  }
});

// Searches for keyword in description and returns the city
function citySearch(keyword) {
  var result = null;
  var search = RegExp(keyword, 'i');
  for(var city in cities) {
    if(search.test(cities[city])) {
      return city;
    }
  }
}

// Adds a new city to the in memory store
function createCity(name, description) {
  cities[name] = description;
  return name;
}

app.listen(3000);

// 5.4 Using a Router Instance
// Let's refactor app.js to use a Router object.

// 1.) Create a new router object and assign it to the router variable.
// 2.) When we are done, our router will be mounted on the /cities path.
// With this in mind, change app.route('/cities') to use router and map requests to the root path.
// 3.) Likewise, let's move our '/cities/:name' route to our router. Remember to update the path.
// 4.) Our router is now ready to be used by app. Mount our new router under the /cities path.

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

// In memory store for the
// cities in our application
var cities = {
  'Lotopia': 'Rough and mountainous',
  'Caspiana': 'Sky-top island',
  'Indigo': 'Vibrant and thriving',
  'Paradise': 'Lush, green plantation',
  'Flotilla': 'Bustling urban oasis'
};

app.param('name', function (request, response, next) {
  request.cityName = parseCityName(request.params.name);
});
var router = express.Router();//1.)



router.route('/')//2.)
  .get(function (request, response) {
    if(request.query.search){
      response.json(citySearch(request.query.search));
    }else{
      response.json(cities);
    }
  })

  .post(parseUrlencoded, function (request, response) {
    if(request.body.description.length > 4){
      var city = createCity(request.body.name, request.body.description);
      response.status(201).json(city);
    }else{
      response.status(400).json('Invalid City');
    }
  });

router.route('/:name')//3.)
  .get(function (request, response) {
    var cityInfo = cities[request.cityName];
    if(cityInfo){
      response.json(cityInfo);
    }else{
      response.status(404).json("City not found");
    }
  })

  .delete(function (request, response) {
    if(cities[request.cityName]){
      delete cities[request.cityName];
      response.sendStatus(200);
    }else{
      response.sendStatus(404);
    }
  });
  app.use('/cities', router);//4.)


// Searches for keyword in description
// and returns the city
function citySearch(keyword) {
  var regexp = RegExp(keyword, 'i');
  var result = cities.filter(function (city) {
    return city.match(regexp);
  });

  return result;
}

// Adds a new city to the
// in memory store
function createCity(name, description){
  cities[name] = description;
  return name;
}

// Uppercase the city name.
function parseCityName(name){
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return parsedName;
}

app.listen(3000);

// 5.6 Using All
// Let's use the app.all() method to handle the name parameter instead of app.param().

// 1.) Add a call to all() for our router's '/:name' route.
// Pass a callback function that accepts request, response, and next.
// 2.) Now let's take our logic from the callback function passed to app.param() and move it to our all() callback.
// 3.) Now remove the original call to app.param().


var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

// In memory store for the cities in our application
var cities = {
  'Lotopia': 'Rough and mountainous',
  'Caspiana': 'Sky-top island',
  'Indigo': 'Vibrant and thriving',
  'Paradise': 'Lush, green plantation',
  'Flotilla': 'Bustling urban oasis'
};

// Searches for keyword in description and returns the city
function citySearch(keyword) {
  var regexp = RegExp(keyword, 'i');
  var result = cities.filter(function (city) {
    return city.match(regexp);
  });

  return result;
}

// Adds a new city to the in memory store
function createCity(name, description) {
  cities[name] = description;
  return name;
}

// Uppercase the city name.
function parseCityName(name) {
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return parsedName;
}

// app.param('name', function (request, response, next) {
//   request.cityName = parseCityName(request.params.name);
// }); 3.)

var router = express.Router();

router.route('/')
  .get(function (request, response) {
    if(request.query.search) {
      response.json(citySearch(request.query.search));
    } else {
      response.json(cities);
    }
  })

  .post(parseUrlencoded, function (request, response) {
    if(request.body.description.length > 4) {
      var city = createCity(request.body.name, request.body.description);
      response.status(201).json(city);
    } else {
      response.status(400).json('Invalid City');
    }
  });

router.route('/:name')
   .all(function(request, response, next) {//1.)
      request.cityName = parseCityName(request.params.name);//2.)
  })


  .get(function (request, response) {
    var cityInfo = cities[request.cityName];
    if(cityInfo) {
      response.json(cityInfo);
    } else {
      response.status(404).json("City not found");
    }
  })

  .delete(function (request, response) {
    if(cities[request.cityName]) {
      delete cities[request.cityName];
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  });

app.use('/cities', router);

app.listen(3000);

// 5.7 Creating a Router Module
// Our single application file is growing too long.
// It's time we extract our routes to a separate Node module under the routes folder.

// 1.) Move our router and its supporting code from app.js to routes/cities.js.
// 2.) export our router object so other files can have access to it. 
// Remember, Node - therefore Express - uses the CommonJS module specification.
// 3.) Our cities routes module is now ready to be used from app.js. 
// Require the new routes/cities module from app.js and assign it to a variable called router;



var express = require('express');
var app = express();
var router = require('routes/cities');//3.)



app.use('/cities', router);
app.listen(3000);