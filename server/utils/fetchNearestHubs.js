const FoodHub = require('../models').FoodHub

function fetchNearestHubs(coordinates) {
    FoodHub.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: coordinates
                },
                $maxDistance: 2000
            }
        }
    }, function (err, foodHubs) {
        if (err) {
            console.log("Unable to fetch nearest Food Hubs: ", err.toString())
            return null;
        } else {
            return foodHubs;
        }
    })
}