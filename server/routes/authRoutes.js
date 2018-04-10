// app/routes.js
module.exports = function (app, passport) {

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/api/auth/login', function (req, res) {
        return res.json({
            error: null,
            message: "This is a dummy route"
        })
    });

    // process the login form
    app.post('/api/auth/login', function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
            // if (err) { return next(err); }
            if (err) {
                return res.json({
                    error: "Error: " + err.toString()
                });
            }
            if (!user) {
                return res.json({
                    error: "There was an error logging in this user"
                });
            }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                return res.json({
                    error: null,
                    message: "User successfully logged in!"
                })
            });
        })(req, res, next);
    })

    // =====================================
    // SIGNUP ==============================
    // =====================================
    app.get('/api/auth/signup', function (req, res) {
        return res.json({
            error: null,
            message: "This is a dummy route"
        })
    });

    // process the signup form
    app.post('/api/auth/signup', function (req, res, next) {
        passport.authenticate('local-signup', function (err, user, info) {
            // if (err) { return next(err); }
            if (err) {
                return res.json({
                    error: "Error: " + err.toString()
                });
            }
            if (!user) {
                return res.json({
                    error: "There was an error signing up this user"
                });
            }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                return res.json({
                    error: null,
                    message: "User successfully logged in!"
                })
            });
        })(req, res, next);
    })

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/api/profile', isLoggedIn, function (req, res) {
        return res.json({
            error: null,
            user: req.user
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/api/auth/logout', function (req, res) {
        req.logout();
        res.json({
            error: null,
            message: "User successfully logged out!"
        })
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    return res.json({
        error: "You need to be logged in to access this resource"
    })
}