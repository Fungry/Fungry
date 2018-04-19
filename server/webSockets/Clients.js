// For keeping track of all the clients

class Clients {
    constructor() {
        this.clientList = {};
        this.saveClient = this.saveClient.bind(this);
    }

    saveClient(username, client) {
        this.clientList[username] = client;
    }
}

module.exports = Clients;