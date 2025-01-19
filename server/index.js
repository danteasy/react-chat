const WebSocket = require("ws");

const PORT = 8080;

const wss = new WebSocket.Server({ port: PORT });

console.log(`Server is running on port ${PORT}`);

let nextClientId = 1;
const clients = new Map();
let typingUsers = [];

wss.on("connection", function connection(ws) {
    const clientId = nextClientId++;

    clients.set(clientId, {
        socket: ws,
        name: null,
    });

    const activeUsers = Array.from(clients.entries())
        .filter(([_, client]) => client.name)
        .map(([id, client]) => ({
            id,
            name: client.name,
        }));

    ws.send(
        JSON.stringify({
            type: "ACTIVE_USERS",
            data: activeUsers,
        })
    );

    ws.send(
        JSON.stringify({
            type: "CLIENT_ID",
            data: clientId,
        })
    );

    ws.on("message", function incoming(message) {
        console.log("received: %s", message);

        try {
            const event = JSON.parse(message);
            handleMessage(event, clientId);
        } catch (error) {
            console.error("Error parsing message:", error);
        }
    });

    ws.on("close", function () {
        typingUsers = typingUsers.filter(user => user.id !== clientId);
        clients.delete(clientId);
        broadcastActiveUsers();
        broadcastTypingUpdate();
    });

    function handleMessage(event, senderId) {
        const data = event.data;
        switch (event.type) {
            case "SET_NAME":
                handleSetName(data, senderId);
                break;
            case "TYPING":
                handleTyping(data, senderId);
                break;
            case "MESSAGE":
                handleMessageBroadcast(data, senderId);
                break;
            default:
                console.warn("Unknown message type:", event.type);
        }
    }

    function handleSetName(data, senderId) {
        const client = clients.get(senderId);
        if (client) {
            client.name = data.name;
        }
        broadcastActiveUsers();
    }

    function handleTyping(data, senderId) {
        if (data.isTyping) {
            typingUsers.push({
                id: senderId,
                name: clients.get(senderId).name,
            });
        } else {
            typingUsers = typingUsers.filter(user => user.id !== senderId);
        }
        broadcastTypingUpdate();
    }

    function handleMessageBroadcast(data, senderId) {
        const message = {
            type: "MESSAGE",
            data: {
                id: senderId,
                name: clients.get(senderId).name,
                message: data.message,
                date: data.date,
            },
        };

        clients.forEach((client, clientId) => {
            client.socket.send(JSON.stringify(message));
        });
    }

    function broadcastTypingUpdate() {
        const typingUpdate = {
            type: "TYPING_USERS",
            data: typingUsers,
        };

        clients.forEach(client => {
            client.socket.send(JSON.stringify(typingUpdate));
        });
    }

    function broadcastActiveUsers() {
        const activeUsers = Array.from(clients.entries())
            .filter(([_, client]) => client.name)
            .map(([id, client]) => ({
                id,
                name: client.name,
            }));

        clients.forEach(client => {
            client.socket.send(
                JSON.stringify({
                    type: "ACTIVE_USERS",
                    data: activeUsers,
                })
            );
        });
    }
});
