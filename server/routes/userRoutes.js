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
        let user = await User.findOne({ 'local.username': req.params.username }, { 'local.password': 0 }).exec()
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
        next("GET /api/users/ " + req.params.username + " | " + error.toString())
    }

});

// Update a User
router.put('/:username', isLoggedIn, async function (req, res, next) {
    let error = null;
    // Add changes that you permit
    let permittedChanges = ["firstName", "lastName", "aboutMe"];
    let requestedChanges = Object.keys(req.body);

    for (let i = 0; i < requestedChanges.length; i++) {
        if (!permittedChanges.includes(requestedChanges[i]))
            return next('You are trying to modify user properties you aren\'t allowed to.')
    }
    console.log("req.user.username:", req.user.local.username)
    try {
        let user = await User.findOneAndUpdate(
            { 'local.username': req.user.local.username },
            req.body,
            {
                new: true,
                fields: 'firstName lastName aboutMe'
            }
        ).exec()

        if (!user) {
            res.status(404)
            error = "Something's fishy. We couldn't find you in our records";
            return res.json({ error })
        }

        return res.json({ error, user })

    } catch (error) {
        return next("PUT /api/users/ " + req.params.username + " | " + error.toString())
    }
})

// Delete a user
router.delete('/:username', isLoggedIn, async function (req, res, next) {
    let error = null;
    // Check if the user logged in is attemping to delete 
    // another user's account
    if (req.user.local.username !== req.params.username) {
        return res.json({
            error: "Ahaa! You can't delete another user mate!"
        })
    }

    try {
        let user = await User.findOneAndRemove(
            { 'local.username': req.user.local.username }
        ).exec();

        if (!user) return res.json({ error: "User not found. Please try again" })

    } catch (error) {
        return next("DELETE /:username | " + error.toString());
    }

    // Log out the user
    req.logout();
    // Notify that the account has been deleted
    return res.json({ error, message: "Account deleted" })
})

module.exports = router;
