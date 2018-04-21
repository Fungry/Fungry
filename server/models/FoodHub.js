const mongoose = require('mongoose');
const shortid = require('shortid');
const bcrypt = require('bcrypt');

var foodHubSchema = new mongoose.Schema({
    foodHubID: {
        $type: String,
        default: shortid.generate
    },
    name: {
        $type: String,
        required: [true, "A food hub must have a name"]
    },
    local: {
        username: {
            $type: String,
            lowercase: true,
            required: [true, "Username can't be blank"],
            index: true
        },
        password: {
            $type: String,
            required: true,
        },
    },
    email: {
        $type: String,
        required: [true, "Email can't be blank"],
    },
    location: {
        type: {
            $type: String,
            default: "Point",
            enum: "Point",
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

// 
foodHubSchema.index({ location: '2dsphere' })

// 
var FoodHub = mongoose.model('FoodHub', foodHubSchema);

// Async Unique Validation for `username`
// Resource: http://timstermatic.github.io/blog/2013/08/06/async-unique-validation-with-expressjs-and-mongoose/
FoodHub.schema.path('local.username').validate(async function (value) {
    value = value.toLowerCase();
    var user = await FoodHub.findOne({ 'local.username': value });
    if (user) {
        return false;
    }
}, 'This username is already taken!');

// The email has to be unique as well
FoodHub.schema.path('email').validate(async function (value) {
    value = value.toLowerCase();
    var user = await FoodHub.findOne({ 'email': value });
    if (user) {
        return false;
    }
}, 'This e-mail is already taken!');

//hash the password before saving it to the database
foodHubSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.local.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.local.password = hash;
        next();
    })
});

module.exports = FoodHub;