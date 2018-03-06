var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// Set Handlebars.
var exphbs = require("express-handlebars");

var app = express();
var PORT = process.env.PORT || 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// This will be used for the delete function
app.use(methodOverride("_method"));

// Setting up handlebars as the view engine and setting the default page to main.handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// XXXXXXXXXXXXXXXXX  UPDATE Express Routes  XXXXXXXXXXXXXXXXXX
var routes = require("./controllers/controller.js");
app.use("/", routes);

app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
});