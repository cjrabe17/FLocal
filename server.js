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

// To use the OAuth file
app.use("/auth", authRoutes);

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.info(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
