// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.status(401)
    return res.json({
        error: "You need to be logged in to access this resource"
    })
}


module.exports = {
    isLoggedIn,
}