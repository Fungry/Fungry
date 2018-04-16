const mongoose = require('mongoose');

var foodHubSchema = new mongoose.Schema({
    foodHubID: {
        $type: String,
        default: shortid.generate
    },
    name: {
        $type: String,
        required: [true, "A food hub must have a name"]
    },
    location: {
        type: {
            $type: String,
            default: 'Point',
            required: [true, "GeoJSON requires a type"]
        },
        address: { $type: String },
        coordinates: {
            $type: [Number],
            required: [true, "GeoJSON requires latitude and longitude coordinates"]
        }
    },
    description: {
        $type: String,
        default: 'No description available'
    },
    offersClosed: [{
        $type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    }],


}, { timestamps: true, typeKey: '$type' });

var FoodHub = mongoose.model('FoodHub', foodHubSchema);

module.exports = FoodHub;