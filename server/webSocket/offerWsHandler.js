// 
// load the models
const db = require('../models');
// 
const {
    fetchNearestOffers,
} = require('../utils/dbOperations');
// 
function offerWsHandler(wsServer, ws, req, clients) {
    ws.on('message', function incoming(message) {
        // Decipher the secret message
        let parsedMessage = JSON.parse(message);

        // Fetch and emit nearest offers
        if (parsedMessage.type == 'accept-offer') {
            // let error = null;
            let data = {
                type: "offer-accepted",
                offerID: parsedMessage.offerID,
                foodHubID: parsedMessage.foodHubID,
                foodHubName: parsedMessage.foodHubName,
                username: parsedMessage.username
            };
            let clientName = parsedMessage.username;
            sendDataToClient(clients, clientName, data)
        }
    });
}

function sendDataToClient(clients, clientName, data) {
    clients
        .clientList[clientName]
        .send(JSON.stringify(data));
}

module.exports = offerWsHandler;