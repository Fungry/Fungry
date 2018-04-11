const mongoose = require('mongoose');

var offerSchema = new mongoose.Schema({
    offerID: {
        type: String,
        default: shortid.generate
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "An offer must be associated with one user or establishment"]
    },
    pickUpLoc: {
        address: { type: String },
        lat: { type: Number },
        long: { type: Number }
    },
    description: {
        type: String,
        default: 'No description available'
    },
    photos: [{
        type: String,
    }],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    items: [{
        name: { type: String },
        serving: { type: Number },
        veg: { type: Boolean }
    }],
    foodHub: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodHub',
    }

}, { timestamps: true });

var Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;