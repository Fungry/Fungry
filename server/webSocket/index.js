const WebSocket = require('ws');
const url = require('url');
const Clients = require('./Clients');
const Rooms = require('./Rooms');
const detectDevice = require('device');
const connect = require('./connect');

// Load handlers
const offerWsHandler = require('./offerWsHandler');
const pickUpAgentWsHandler = require('./pickUpAgentWsHandler');
// const disconnect = require('./disconnect');

const clients = new Clients();
const rooms = new Rooms();

function initializeWS(server) {
    wsServer = new WebSocket.Server({
        server
    });

    wsServer.on('connection', async function (ws, req) {
        console.log(req.headers.cookie)
        let userAgent = req.headers['user-agent'];
        let device = detectDevice(userAgent);
        console.log("A " + device.type + " device just connected");

        // perform initial actions on connect
        connect(wsServer, ws, req, clients);

        // perform actions pertaining to offer
        offerWsHandler(wsServer, ws, req, clients);

        // Pick Up Agent Handler
        pickUpAgentWsHandler(wsServer, ws, req, clients, rooms)
        
        // perform actions on disconnect
        // disconnect(wsServer, ws, req, clients);

    });
}

module.exports = initializeWS;