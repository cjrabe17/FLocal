var router = require("express").Router();
var passport = require("passport");

// auth login
router.get("/login", (req, res) => {
    res.render("login");
});

// auth logout
router.get("/logout", (req, res) => {
    res.send("logging out");
    //handle with Passport later
});

// auth with Google
router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
}));

// callback route for Google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.send("you reached the callback URI");
});

module.exports = router;