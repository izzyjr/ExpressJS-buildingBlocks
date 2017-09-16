// 2.4 Express Static 
// Change the code in app.js to use the express-static middleware instead of the response.sendFile() function.

// 1.) Remove our app.get() containing the root '/' route.Line11
// 2.) Mount the static middleware and serve files under the public directory.Line15

// app.js

var express = require('express');
var app = express();

app.get(function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
});
app.use(express.static("public"));

app.get('/cities', function(req, res){
  var cities = ['Lotopia', 'Caspiana', 'Indigo'];
  res.send(cities);
});

app.listen(3001);

// 2.5 Script Tags
// Now we can add some client-side JavaScript by including the jquery.js and client.js files.

// 1.) Within index.html, include jquery.js using a <script> tag.Line11(index.html)
// 2.) Within index.html, include client.js using a <script> tag.Line12(index.html)
// 3.) Now in the client.js file, complete the code for the 
// $.get function so that it calls the /cities URL path, and then runs the appendToList function.Line3(client.js)

// 2.7 Logging Middleware 250 PTS
// Help finish the following middleware code in the logger.js file:

// 1.) On the response object, listen to the event that's emitted 
// when the response has been handed off from Express to the underlying Operating System.
// 2.) Inside of the finish callback, calculate the duration of the request by subtracting the startTime from a new Date object.
// Store the duration in the duration variable, which has already been declared for you.Line7(logger.js)
// 3.) Using the stream object, which holds a reference to standard out,
// write the following message: "This request took ____ ms", where ____ is the duration for the request.Line8(logger.js)
// 4.) If we run the code as is, the request will be stuck in our middleware.
// Call the function that moves processing to the next middleware in the stack.Line10(logger.js)

// 2.9 Only GET
// Let's build a middleware that ensures only GET requests are allowed to go through.

// 1.)First, in the only_get.js file, create an anonymous function that uses the middleware signature and assign it to module.exports.
// Remember, the Express middleware function signature takes three arguments.Line51
// 2.)Use the request object to check if the HTTP method used is 'GET' and if it is,
// then call the function that moves processing to the next middleware in the stack.Line55
// 3.) If the HTTP method is not 'GET', 
// then complete the request by sending back a message that says 'Method is not allowed'.Line59


// only_get.js
 module.exports = (function(request, response, next) {
    if (request.method === 'GET') {
     next();
   }else{
     response.send('Method is not allowed');
   }
 });



