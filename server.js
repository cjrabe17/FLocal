var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var methodOverride = require("method-override");

var db = require("./models");
// To import OAuth routes file
var authRoutes = require("./routes/auth-routes");

var app = express();
var PORT = process.env.PORT || 3000;

// Method override for RESTFul form submissions
app.use(methodOverride("_method"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());
// Static directory
app.use(express.static("public"));

// Handlebars config ---------------------------------------/
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Route config -------------------------------------------/
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

// To use the OAuth file
app.use("/auth", authRoutes);

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync().then(function() {
  db.Location.create({
    destination: "Disney World",
    address: "Walt Disney World Resort, Orlando, FL 32830",
    description: "The happiest place on Earth.",
    website: "http://www.disney.com/",
    image: "https://lh5.googleusercontent.com/p/AF1QipOFedS1w6xKzGKRWzMxcOMjM7raNKsTah5UrfK0=w408-h544-k-no",
    phoneNumber: "407-939-5277",
    approved: true
  });
  app.listen(PORT, function() {
    console.info(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
