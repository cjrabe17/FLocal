//Model
var db = require("../models");

module.exports = function(app) {
  // GET route for getting all of the user requests
  app.get("/api/posts", function(req, res) {
    var query = {};
    if (req.query.Locations_id) {
      query.LocationsId = req.query.Locations_id;
    }
    db.Locations.findAll({
      where: query,
    }).then(function(dbLocations) {
      res.json(dbLocations);
    });
  });
  // POST route for saving a new locations to the database
  app.post("/api/posts", function(req, res) {
    db.Locations.create(req.body).then(function(dbLocations) {
      res.json(dbLocations);
    });
  });
}



