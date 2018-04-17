// const FoodHub = require('../models').FoodHub

function fetchNearestHubs(FoodHub, coordinates) {
    FoodHub.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [17.4544593, 78.3004403]
                },
                $maxDistance: 2000
            }
        }
    }).exec(function (err, foodHubs) {
        if (err) {
            console.log("Unable to fetch nearest Food Hubs: ", err.toString())
            return null;
        } else {
            return foodHubs;
        }
    })
}

module.exports.fetchNearestHubs = fetchNearestHubs;
