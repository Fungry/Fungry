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
        let user = await User.findOne({ 'local.email': req.params.username }, { 'local.password': 0 }).exec()
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
router.put('/:username', async function (req, res, next) {
    try {
        let user = await User.findOne(
            { 'local.email': req.params.username },
            'firstName lastName aboutMe'
        ).exec()
        
        if (!user) {
            res.status(404)
            return res.json({
                error: "No user with the username exists in our records"
            })
        } else {
            console.log(user)
            var obj1 = {
                user: 'Hello',
                name: 'Ben'
            }
            var obj2 = {
                job: 'Vetti',
                name: 'Hannah'
            }
            Object.assign(obj1, obj2);
            console.log("Object 1: ", obj1);
            console.log("Object 2: ", obj2);
            return res.json({
                error: null,
                // message: user,
                user,
            })
        }

    } catch (error) {
        next("PUT /api/users/ " + req.params.username + " | " + error.toString())
    }
})

module.exports = router;
