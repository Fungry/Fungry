const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/authCheck')
// load up the user model
var User = require('../models/User');

/* GET all users listing. */
// ADMIN only
router.get('/', isLoggedIn, async function (req, res, next) {
    // This route needs be accessible to Admins only
    // FIX THIS
    res.json({
        error: null,
        message: "You cannot lookup for all users"
    })
});

// GET single user
router.get('/:username', isLoggedIn, async function (req, res, next) {
    try {
        let user = await User.findOne({ 'local.email': req.params.username }, { 'local.password':0 }).exec()
        if (!user) {
            res.status(404)
            return res.json({
                error: "No user with the username exists in our records"
            })
        }
        console.log(user)
        return res.json({
            error: null,
            // message: user,
            user,
        })
    } catch (error) {
        next( "GET /api/users/ " + req.params.username + " | " + error.toString())
    }

});

module.exports = router;
