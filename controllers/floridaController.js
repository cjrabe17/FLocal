module.exports = {
    renderHome: function(req, res) {
      res.render("index");
    },
    renderRequestNewSpot: function(req, res) {
      res.render("requestNewSpot")
    },
    login: function(req, res) {
      res.render("login");
    },
    createUserForm: function(req, res) {
      res.render("createUserForm");
    }
  };
  