var router = require("express").Router();

// auth login
router.get("/login", (req, res) => {
    res.render("login");
});

// auth logout
router.get("/logout", (req, res) => {
    res.send("logging out");
    //handle with Passport
});

// auth with Google
router.get("/google", (req, res) => {
    //handle with Passport
    res.send("logging in with Google");
});

module.exports = router;