var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    // Passport local
    local: {
        email: {
            type: String,
            lowercase: true,
            required: [true, "can't be blank"],
            index: true
        },
        password: {
            type: String,
            required: true,
        },
    },
    firstName: {
        type: String,
        required: [true, "can't be blank"],
    },
    lastName: {
        type: String,
        required: [true, "can't be blank"],
    },
    // Passport OAuth for FB and Google
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
    // offers: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Offer'
    // }]
}, { timestamps: true });

var User = mongoose.model('User', userSchema);

// Async Unique Validation for `username`
// Resource: http://timstermatic.github.io/blog/2013/08/06/async-unique-validation-with-expressjs-and-mongoose/
User.schema.path('email').validate(async function (value) {
    value = value.toLowerCase();
    var user = await User.findOne({ email: value });
    if (user) {
        return false;
    }
}, 'This e-mail is already taken!');

//hash the password before saving it to the database
userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

module.exports = User;