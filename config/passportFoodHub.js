// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var FoodHub = require('../server/models/FoodHub');
// For checking the password
const bcrypt = require('bcrypt');

// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        FoodHub.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // Strategies: one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('foodhub-local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, 
        // we CAN override with email
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, username, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function () {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to signup already exists
            FoodHub.findOne({ 'local.username': username }, function (err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if there's already a user with that email
                if (user) {
                    return done(null, false, "This username is already taken.");
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser = new FoodHub();

                    // set the user's local credentials
                    newUser.local.username = username;
                    newUser.local.password = password;
                    newUser.email = req.body.email;
                    newUser.name = req.body.name;
                    newUser.location.address = req.body.address;
                    newUser.location.coordinates = req.body.coordinates;

                    // save the user
                    newUser.save(function (err) {
                        if (err)
                            // throw err;
                            return done(err)
                        return done(null, newUser);
                    });

                }
            });
        });
    }));

    passport.use('foodhub-local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, username, password, done) { // callback with email and password from our form

            // Check if a user whose email is the same as the form's email, exists
            FoodHub.findOne({ 'local.username': username }, function (err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);
                
                // if no user is found, return the message
                if (!user)
                    return done(null, false, "No user with this username exists!");

                // all is well, return successful user
                if (bcrypt.compareSync(password, user.local.password)) {
                    return done(null, user);

                    // if the user is found but the password is wrong
                } else {
                    // Let the user know if they enter an incorrect password
                    return done(null, false, "Oops! Wrong password.");
                }
            });
        }));
};