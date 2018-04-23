// 
// 
// Doesn't work for now.....
// function disconnect(wsServer, ws, req, clients) {
//     ws.on('message', function incoming(message) {
//         // Parse the incoming message
//         let parsedMessage = JSON.parse(message);
//         if (parsedMessage.type == 'remove-wsclient') {
//             clients.removeClient(parsedMessage.clientName, ws)
//             console.log("Websocket client removed for: ", parsedMessage.clientName)
//             console.log("List of clients currently connected", clients.listClientsKeys())
//         }
//     });

// }


module.exports = disconnect;