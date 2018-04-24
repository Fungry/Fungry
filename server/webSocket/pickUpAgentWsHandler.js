const shortid = require('shortid');
const qrImage = require('qr-image');
// 
// load the models
const db = require('../models');
// 
// const {
//     fetchNearestOffers,
// } = require('../utils/dbOperations');
// 
function pickUpAgentWsHandler(wsServer, ws, req, clients, rooms) {
    ws.on('message', function incoming(message) {
        // Decipher the secret message
        let parsedMessage = JSON.parse(message);

        // Fetch and emit nearest offers
        if (parsedMessage.type == 'assign-agent') {
            let svgString = qrImage.imageSync(`offer-${parsedMessage.offerID}`, { type: 'svg' });
            // let error = null;
            let data = {
                type: "render-qrcode",
                offerID: parsedMessage.offerID,
                foodHubID: parsedMessage.foodHubID,
                foodHubName: parsedMessage.foodHubName,
                username: parsedMessage.username,
                svgString: svgString
            };
            let clientName = parsedMessage.foodHubID;
            sendDataToClient(clients, clientName, data)

            clientName = parsedMessage.username;
            console.log(clientName)
            console.log(clients.listClientsKeys())
            data.type = "agent-assigned"
            sendDataToClient(clients, clientName, data)
        }
    });
}

function sendDataToClient(clients, clientName, data) {
    clients
        .clientList[clientName]
        .send(JSON.stringify(data));
}

module.exports = pickUpAgentWsHandler;