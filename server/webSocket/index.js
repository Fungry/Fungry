const WebSocket = require('ws');
const url = require('url');
const Clients = require('./Clients');
const detectDevice = require('device');

const clients = new Clients();

function initializeWS(server) {
    wsServer = new WebSocket.Server({ server });

    wsServer.on('connection', async function (ws, req) {
        let userAgent = req.headers['user-agent'];
        let device = detectDevice(userAgent);
        // console.log(device)
        console.log("A " + device.type + " device just connected")
    });
}

module.exports = initializeWS;