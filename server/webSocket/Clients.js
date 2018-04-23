// For keeping track of all the clients

class Clients {
    constructor() {
        this.clientList = {};
        this.saveClient = this.saveClient.bind(this);
        this.removeClient = this.removeClient.bind(this);
    }

    saveClient(username, client) {
        this.clientList[username] = client;
    }

    removeClient(username) {
        delete this.clientList[username];
    }

    listClientsKeys() {
        return Object.keys(this.clientList);
    }
}

module.exports = Clients;