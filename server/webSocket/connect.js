// 
// 
// 
function connect(wsServer, ws, req, clients) {
    ws.on('message', function incoming(message) {
        console.log(JSON.parse(message));
    });

    // Create clients accessible using usernames
    clients.saveClient
}


module.exports = connect;