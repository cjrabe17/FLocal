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
db.sequelize.sync( { force: true } ).then(function() {
  db.Location.create({
    destination: "Disney World",
    address: "Walt Disney World Resort, Orlando, FL 32830",
    description: "The happiest place on Earth.",
    category: "Theme Park",
    website: "http://www.disney.com/",
    image: "https://lh5.googleusercontent.com/p/AF1QipOFedS1w6xKzGKRWzMxcOMjM7raNKsTah5UrfK0=w408-h544-k-no",
    phoneNumber: "407-939-5277",
    approved: true
  });
  db.Location.create({
    destination: "SeaWorld",
    address: "7007 Sea World Dr, Orlando, FL 32821",
    description: "From park to planet, SeaWorld theme parks offer up-close animal experiences, roller coasters and, most importantly, a chance for you to make a difference.",
    category: "Theme Park",
    website: "http://www.seaworldorlando.com/",
    image: "https://skift.com/wp-content/uploads/2016/08/OneOcean1-e1470320852427.jpg",
    phoneNumber: "407-370-1239",
    approved: true
  });
  db.Location.create({
    destination: "Kennedy Space Center",
    address: "SR 405 Kennedy Space Center, FL 32899",
    description: "Kennedy Space Center Visitor Complex is where rockets launch and inspiration begins at Florida's gateway to space. Located one small step from Orlando, arrive early for a full-day experience at the greatest space adventure on Earth.",
    category: "Museum",
    website: "https://www.kennedyspacecenter.com/",
    image: "https://skift.com/wp-content/uploads/2016/08/OneOcean1-e1470320852427.jpg",
    phoneNumber: "321-867-5000",
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
