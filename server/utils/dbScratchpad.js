const mongoose = require("mongoose");
mongoose.set('debug', true)
const configDB = require('../../config/database')
console.log("configDB: ", configDB)
mongoose.connect(configDB.url);
mongoose.Promise = Promise;


const fetchNearestHubs = require('./fetchNearestHubs').fetchNearestHubs;

function fetc() {
    let coordinates = [17.4544593, 78.3004403];

}

fetc();

// db.foodhubs.find(
//     {
//         location: {
//             $near: {
//                 $geometry: {
//                     type: "Point",
//                     coordinates: [17.4544593, 78.3004403]
//                 },
//                 $maxDistance: 2000
//             }
//         }
//     }
// )