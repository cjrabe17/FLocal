var router = require("express").Router();
var passport = require("passport");

// auth login
router.get("/login", (req, res) => {
    res.render("login");
});

// auth logout
router.get("/logout", (req, res) => {
    //handle with Passport
    req.logout();
    res.redirect("/");
});

// auth with Google
router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
}));

// callback route for Google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    // res.send(req.user);
    res.redirect("/profile/");
});

module.exports = router;