const mongoose = require("mongoose");
mongoose.set('debug', true)
const configDB = require('../../config/database')
mongoose.connect(configDB.url);

mongoose.Promise = Promise;

const db = require('../models')

async function beefItUp() {
    let user = await db.User.create({
        'local.username': "ben",
        'local.password': "123",
        'firstName': "First",
        'lastName': "Last",
        'aboutMe': "I am a good offerer",
        'email': "ben@one.com",
    })
    console.log(user);

    let offerOne = await db.Offer.create({
        "location.type": "Point",
        "location.address": "Swarna Heights, Diamond Heights Road, Nallagandla, Gopanapalli Thanda, Hyderabad, Telangana 500019",
        "location.coordinates": [
            17.4544593,
            78.3004403
        ],
        user: user._id,
        description: "This is Offer One",
        photos: [
            'http://via.placeholder.com/350x150',
            'http://via.placeholder.com/350x150',
            'http://via.placeholder.com/350x150',
        ],
        items: [
            { name: "Rice", serving: 10, veg: true },
            { name: "Dal", serving: 10, veg: true },
        ]

    })
    console.log(offerOne);

    // Navodaya Grounds Nallagandla, Gopanapalli Hyderabad, Telangana 500019
    // 17.4546923,78.2926963,15.02z
    let foodHubOne = await db.FoodHub.create({
        name: "Food Hub One",
        "location.type": "Point",
        "location.address": "Navodaya Grounds Nallagandla, Gopanapalli Hyderabad, Telangana 500019",
        "location.coordinates": [
            17.4546923,
            78.2926963
        ]
    })

    // Bharat Heavy Electricals Limited భరత్ హెవీ ఎలక్ట్రికల్స్ లిమిటెడ్ Hyderabad, Telangana
    // 17.4952418,78.2805514,14z
    let foodHubTwo = await db.FoodHub.create({
        name: "Food Hub Two",
        "location.type": "Point",
        "location.address": "Bharat Heavy Electricals Limited భరత్ హెవీ ఎలక్ట్రికల్స్ లిమిటెడ్ Hyderabad, Telangana",
        "location.coordinates": [
            17.4952418,
            78.2805514
        ]
    })

    // Yashoda Hospitals - Secunderabad యశోద హాస్పిటల్స్
    // 17.4339641,78.4906122,14.92z
    let foodHubThree = await db.FoodHub.create({
        name: "Food Hub Three",
        "location.type": "Point",
        "location.address": "Yashoda Hospitals - Secunderabad యశోద హాస్పిటల్స్",
        "location.coordinates": [
            17.4339641,
            78.4906122
        ]
    })
}
// Uncomment the following for creating dummy data 
beefItUp();

//  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
//  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
//  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
//  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //

async function cleanUp() {
    await db.User.remove({}).exec();
    await db.Offer.remove({}).exec();
}
// Uncomment the following for cleaing up the database
// cleanUp();