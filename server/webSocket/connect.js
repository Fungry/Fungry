// 
// load the models
const db = require('../models');
// 
const {
    fetchNearestOffers,
} = require('../utils/dbOperations');
// 
function connect(wsServer, ws, req, clients) {
    ws.on('message', function incoming(message) {
        // Decipher the secret message
        let parsedMessage = JSON.parse(message);

        // Create a ws client/room with the ID of the user/FoodHub
        if (parsedMessage.type == 'create-wsclient') {
            clients.saveClient(parsedMessage.clientName, ws)
            console.log("Websocket client created for: ", parsedMessage.clientName)
            console.log("List of clients currently connected", clients.listClientsKeys())
        }

        // Fetch and emit nearest offers
        if (parsedMessage.type == 'fetch-offers') {
            // let error = null;
            let data = null;
            db.FoodHub.findOne({ foodHubID: parsedMessage.clientName }, async function (err, foodhub) {
                if (err) {
                    data = { error: err.toString };
                    sendDataToClient(clients, parsedMessage.clientName, data);

                } else if (!foodhub) {
                    data = { error: "No FoodHub with ID " + parsedMessage.clientName + " found!" };
                    sendDataToClient(clients, parsedMessage.clientName, data);

                } else {
                    foodhub.local.password = null;
                    let nearestOffers = await fetchNearestOffers(db, foodhub.location.coordinates)

                    if (!nearestOffers) {
                        data = { error: "fetchNearestOffers returned null!" };
                        sendDataToClient(clients, parsedMessage.clientName, data);

                    } else if (nearestOffers.length === 0) {
                        data = { error: "No Food Hubs nearby. Sorry." };
                        sendDataToClient(clients, parsedMessage.clientName, data);

                    } else {
                        data = { type: "receive-offers",  nearestOffers};
                        sendDataToClient(clients, parsedMessage.clientName, data);
                    }
                }
            })
        }
    });
}

function sendDataToClient(clients, clientName, data) {
    clients
        .clientList[clientName]
        .send(JSON.stringify(data));
}

module.exports = connect;