var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;
// var port = process.env.PORT || 8000;

// BodyParser makes it possible for our server to interpret data sent to it.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(express.static("app/public"));
 
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

// 
app.get('/', function (request, response) {
  response.send('Hello World')
});

// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// The below code effectively "starts" our server
app.listen(port, function(port) {
	console.log("Application listening on port " + port);
});

// data displayed after listening?!

