const mongoose = require('mongoose');

var offerSchema = new mongoose.Schema({
    offerID: {
        $type: String,
        default: shortid.generate
    },
    user: {
        $type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "An offer must be associated with one user or establishment"]
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
    photos: [{
        $type: String,
    }],
    status: {
        $type: String,
        enum: ['new', 'inProgress', 'closed'],
        default: 'new'
    },
    items: [{
        name: { $type: String },
        serving: { $type: Number },
        veg: { $type: Boolean }
    }],
    foodHub: {
        $type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodHub',
    }

}, { timestamps: true, typeKey: '$type' });

var Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;