var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var methodOverride = require("method-override");

var db = require("./models");
// To import OAuth routes file
var authRoutes = require("./routes/auth-routes");
// To get Passport running
var passportSetup = require("./config/passport-setup");
// Mongoose for MongoDB--might be getting rid of later
var mongoose = require("mongoose");
// Importing keys file
var keys = require("./config/keys");
// To store auth info in browser
var cookieSession = require("cookie-session");
// Passport auth npm
var passport = require("passport");

var app = express();
var PORT = process.env.PORT || 3000;

// Method override for RESTFul form submissions
app.use(methodOverride("_method"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongoDB
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log("Connected to mongoDB");
});

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
    image: "https://img.purch.com/h/1000/aHR0cDovL3d3dy5zcGFjZS5jb20vaW1hZ2VzL2kvMDAwLzAxMy82MTUvb3JpZ2luYWwva3NjLXZpc2l0b3ItY29tcGxleC1wcmVwYXJpbmctc2h1dHRsZS1kaXNwbGF5LmpwZw== ",
    phoneNumber: "321-867-5000",
    approved: true
  });
  db.Location.create({
    destination: "Gatorland",
    address: "14501 S. Orange Blossom Trail Orlando, Florida 32837",
    description: "Get ready for down-home family fun at “The Alligator Capital of the World®” –  Gatorland!  There isn’t a better place to see alligators and crocodiles of all sizes, from babies, also known as grunts, to the 14-foot monsters that call our Breeding Marsh home. We even have the largest collection of extremely rare white leucistic alligators.  But, Gatorland is more than just a gator park!  Our free-flight aviary, petting zoo, one-of-a-kind animal shows, thrilling Screamin’ Gator Zip Line and new Stompin’ Gator Off-Road Adventure ensure your day will be chock-full of fun, smiles and special memories!",
    category: "Outdoor, Family Friendly",
    website: "https://www.gatorland.com/",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGukQNYsQDy3223U2NCEkTQ9C43txOIThOXA7cE6P2zNP5k78q",
    phoneNumber: "407-855-5496",
    approved: false
  });
  db.Location.create({
    destination: "Central Florida Zoo & Botanical Gardens ",
    address: "3755 NW Hwy 17-92, Sanford, FL 32771",
    description: "Enter the lush tropical world of the Central Florida Zoo & Botanical Gardens.  A relaxing, entertaining and educational experience for the entire family. The Zoo cares for over 400 animals, representing over 150 species, many of which you can see during your visit to the Zoo. You can take to the sky and enjoy an aerial adventure course, ZOOm Air Adventure Park or bring your flip-flops and swimsuit to cool-off in the Wharton-Smith Tropical Splash Ground.",
    category: "Outdoor, Family Friendly",
    website: "http://www.centralfloridazoo.org/",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/06/16/c8/cc/central-florida-zoo-botanical.jpg",
    phoneNumber: "407-323-4450",
    approved: false
  });
  app.listen(PORT, function() {
    console.info(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
