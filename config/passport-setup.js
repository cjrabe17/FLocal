var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var keys = require("./keys");
var User = require("../models/user-model");

passport.serializeUser((user, done) => {
    // Grabbing id from DB's primary key
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
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
        // check if user already exists in db
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if (currentUser) {
                // already have user in the db
                console.log("Existing user is: ", currentUser);
                done(null, currentUser);
            } else {
                // if not, create one in our db
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => {
                    console.log("New user created:" + newUser);
                    done(null, newUser);
                });
            }
        });
    })
)