const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/authCheck')
const { fetchNearestHubs } = require('../utils/fetchNearestHubs')
// load the models
const db = require('../models')

// GET an Offer
router.get('/:offerID', function (req, res, next) {
    let error = null;

    db.Offer.findOne({
        offerID: req.params.offerID
    }, function (err, offer) {
        if (err) {
            error = "Error fethcing the offer " +
                req.params.offerID + ". "
                + err.toString();
            res.status(500);
            return res.json({ error })
        }

        // return res.json({ error, offer })
        return res.render('offer', {offer})
    })
})

// GET fetchFoodHubs
// Fetch Nearest (2KM radius) foodHubs
router.get('/:offerID/fetchFoodHubs', async function (req, res, next) {
    let error = null;
    try {
        let offer = await db.Offer.findOne({
            offerID: req.params.offerID
        }).exec()
        if (!offer) return res.json({ error: "Offer doesn't exist" });

        let nearestHubs = await fetchNearestHubs(db, offer.location.coordinates)
        if (!nearestHubs) throw "fetchNearestHubs returned null"

        if (nearestHubs.length === 0)
            return res.json({ error: "No Food Hubs nearby. Sorry." })

        return res.json({
            error,
            nearestHubs
        })

    } catch (err) {
        return next(" Error fetching nearest foodhubs " + err.toString());
    }
})

// Until Functions


module.exports = router;