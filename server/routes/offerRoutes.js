const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/authCheck')
const fetchNearestHubs = require('../utils/fetchNearestHubs')

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

        return res.json({ error, offer })
    })
})

router.get('/:offerID/fetchFoodHubs', function (req, res, next) {

})

module.exports = router;