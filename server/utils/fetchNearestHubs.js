// To fetch the nearest hubs for a given offer's coordinates
async function fetchNearestHubs(db, coordinates) {
    try {
        let hubs = await db.FoodHub.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: coordinates
                    },
                    $maxDistance: 10000
                }
            }
        }).exec();
    } catch (error) {
        console.log("Don't forget to catch this error properly")
    }

    return hubs;
}

module.exports.fetchNearestHubs = fetchNearestHubs;
