// To fetch the nearest offers for a given offer's coordinates
async function fetchNearestOffers(db, coordinates) {
    let offers;
    try {
        offers = await db.Offer.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: coordinates
                    },
                    $maxDistance: 10000
                }
            }
        }).populate('user').exec();
    } catch (error) {
        console.log("Don't forget to catch this error properly")
    }

    return offers;
}

module.exports.fetchNearestOffers  = fetchNearestOffers;
