var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var keys = require("./keys");
var db = require("../models");

passport.serializeUser((user, done) => {
    // Grabbing id from DB's primary key
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for the Google strategy
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        db.User.findOne({
            where: {
                googleId: profile.id
            }
        }).then(function(user) {
            if (user) {
                return done(null, false, {
                    message: "that user already exists"
                });
            } else {
                var data = {
                    googleId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.image.url,
                    adminAccess: false
                };
                db.User.create(data).then(function(newUser, created) {
                    if (!newUser) {
                        return done(null, false);
                    }

                    if (newUser) {
                        return done(null, newUser);
                    }
                });
            }
        });
    })
)