var db = require("../models");

module.exports = {
  renderHome: function(req, res) {
    db.Location.findAll({
      where: {
        approved: 1
      }
    }).then(function(location_data) {
      var hbsObject = { locations: location_data };
      console.log("------ Location Data -------");
      console.log(hbsObject);
      console.log("--------------------------");
      res.render("index", hbsObject);
    });
  },
  renderAdminPage: function(req, res) {
    db.Location.findAll({
      where: {
        approved: 0
      }
    }).then(function(location_data) {
      var hbsObject = { locations: location_data };
      // console.log("------ Location Data -------");
      // console.log(hbsObject);
      // console.log("--------------------------");
      res.render("adminPage", hbsObject);
    });
  },
  renderRequestNewSpot: function(req, res) {
    res.render("requestNewSpot")
  },
  login: function(req, res) {
    res.render("login");
  },
  createUserForm: function(req, res) {
    res.render("createUserForm");
  },
};
  