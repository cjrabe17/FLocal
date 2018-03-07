//Dependencies
//===================================
var express = require("express");
var router = express.Router();
//===================================

//Import model (*.js) to use database functions
var florida = require("<model goes here>");
//===================================

//Create routes
//Render main page
router.get("/", function(req, res) {
    florida.all(function(data) {
        var hbsObject = {
            florida: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});
//===================================