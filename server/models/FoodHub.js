const mongoose = require('mongoose');

var foodHubSchema = new mongoose.Schema({
    foodHubID: {
        type: String,
        default: shortid.generate
    },
    name: {
        type: String,
        required: [true, "A food hub must have a name"]
    },
    address: {
        address: { type: String },
        lat: { type: Number },
        long: { type: Number }
    },
    description: {
        type: String,
        default: 'No description available'
    },
    offers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    }],


}, { timestamps: true });

var FoodHub = mongoose.model('FoodHub', foodHubSchema);

module.exports = FoodHub;