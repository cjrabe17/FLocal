//Dependencies
//===========================
var path = require("path");

//Routes
//===========================
module.exports = function(app) {

    //main index
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/index.handlebars"))
    })
}