var floridaController = require("../controllers/floridaController");

module.exports = function(app) {
  app.get("/", floridaController.renderHome);
  app.get("/requestnewspot", floridaController.renderRequestNewSpot)
};
