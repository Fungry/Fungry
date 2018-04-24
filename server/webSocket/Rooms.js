// For keeping track of all the clients

class Rooms {
    constructor() {
        this.roomsList = new Map();
        this.createRoom = this.createRoom.bind(this);
        this.addClientToRoom = this.addClientToRoom.bind(this);
        this.removeClientFromRoom = this.removeClientFromRoom.bind(this);
    }

    createRoom(roomName) {
        // Create a room with name roomName and 
        // set it to an empty object
        this.roomsList.set(roomName, {});
    }

    addClientToRoom(roomName, clientName, clients) {
        this.roomsList(roomName)[clientName] = clients[clientName];
    }

    removeClientFromRoom(roomName, clientName) {
        delete this.roomsList(roomName)[clientName];
    }

}

module.exports = Rooms;