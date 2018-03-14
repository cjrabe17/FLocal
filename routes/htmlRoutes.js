var floridaController = require("../controllers/floridaController");

module.exports = function(app) {
  app.get("/", floridaController.renderHome);
  app.get("/adminPage", floridaController.renderAdminPage);
  app.get("/requestnewspot", floridaController.renderRequestNewSpot);
  app.get("/createuserform", floridaController.createUserForm);
  app.put("/adminPage/update/:id", floridaController.approveDesitnation);
};
