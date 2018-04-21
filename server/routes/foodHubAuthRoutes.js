// 

module.exports = function (app, passport) {

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/api/auth/foodhubs/login', function (req, res) {
        return res.json({
            error: null,
            message: "This is a dummy route"
        })
    });

    // process the login form
    app.post('/api/auth/foodhubs/login', function (req, res, next) {
        passport.authenticate('foodhub-local-login', function (err, user, info) {
            // if (err) { return next(err); }
            if (err) {
                return res.json({
                    error: "Error: " + err.toString()
                });
            }
            if (!user) {
                return res.json({
                    error: "There was an error logging in this foodhub"
                });
            }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                return res.json({
                    error: null,
                    message: "Food Hub successfully logged in!"
                })
            });
        })(req, res, next);
    })

    // =====================================
    // SIGNUP ==============================
    // =====================================
    app.get('/api/auth/foodhubs/signup', function (req, res) {
        return res.json({
            error: null,
            message: "This is a dummy route"
        })
    });

    // process the signup form
    app.post('/api/auth/foodhubs/signup', function (req, res, next) {
        passport.authenticate('foodhub-local-signup', function (err, user, info) {
            // if (err) { return next(err); }
            if (err) {
                // return next(err)
                return res.json({
                    error: "Error: " + err.toString()
                });
            }
            if (!user) {
                return res.json({
                    error: "There was an error signing up this Food Hub"
                });
            }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                return res.json({
                    error: null,
                    message: "Food Hub successfully signed up and logged in!"
                })
            });
        })(req, res, next);
    })

    // =====================================
    // USER LOGIN CHECK ====================
    // =====================================

    app.get("/api/auth/foodhubs/check", function (req, res, next) {
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            // This needs a fix 
            // not all user info must be given out 
            return res.send(req.user)

        // if they aren't redirect them to the home page
        res.status(401)
        return res.send(null)
    })

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.post('/api/auth/foodhubs/logout', function (req, res) {
        req.logout();
        res.json({
            error: null,
            message: "Food Hub successfully logged out!"
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