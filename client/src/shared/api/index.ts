import { TActiveUser, typingUser } from "../types";
import {
    setActiveUsers,
    setClientId,
    setMessages,
    setTypingUsers,
} from "../../app/store/slices/ChatSlice";
import store from "../../app/store";
import { TChatMessage } from "../types";

enum WebSocketAction {
    typing = "TYPING",
    typingUsers = "TYPING_USERS",
    setName = "SET_NAME",
    activeUsers = "ACTIVE_USERS",
    message = "MESSAGE",
    clientId = "CLIENT_ID",
}

const API_URL = process.env.REACT_APP_API_URL;

if (typeof API_URL !== "string") {
    throw new Error("REACT_APP_API_URL is not defined or not a string");
}

class webSocket {
    private socket!: WebSocket;
    private isConnected: boolean;
    private clientId: number | null;
    public readonly initSocket: () => void;
    public readonly sendMessage: (msg: string) => void;
    public readonly setName: (name: string) => void;
    public readonly setTyping: (isTyping: boolean) => void;

    constructor() {
        this.isConnected = false;
        this.clientId = null;

        this.initSocket = () => {
            this.socket = new WebSocket(API_URL as string);

            this.socket.onopen = () => {
                console.log("connection established");
                this.isConnected = true;
            };

            this.socket.onerror = () => {
                throw new Error(
                    "Something is wrong with WebSocket. Connection failed"
                );
            };

            this.socket.onclose = () => {
                console.log("Connection closed");
                this.isConnected = false;
            };

            this.socket.onmessage = event => {
                const res = JSON.parse(event.data);
                switch (res.type) {
                    case WebSocketAction.clientId: {
                        this.clientId = res.data;
                        store.dispatch(setClientId(res.data));
                        break;
                    }
                    case WebSocketAction.activeUsers: {
                        const activeUsersData = res.data as TActiveUser[];

                        const clientIdx = activeUsersData.findIndex(
                            i => i.id === this.clientId
                        );

                        store.dispatch(
                            setActiveUsers([
                                ...activeUsersData.slice(
                                    clientIdx,
                                    clientIdx + 1
                                ),
                                ...activeUsersData.filter(
                                    i => i.id !== this.clientId
                                ),
                            ])
                        );
                        break;
                    }
                    case WebSocketAction.message: {
                        const storedMessages = store.getState().chat.messages;
                        const message = res.data;
                        store.dispatch(
                            setMessages([...storedMessages, message])
                        );
                        break;
                    }
                    case WebSocketAction.typingUsers: {
                        store.dispatch(
                            setTypingUsers(
                                res.data.filter(
                                    (user: typingUser) =>
                                        user.id !== this.clientId
                                )
                            )
                        );
                        break;
                    }
                    default: {
                        throw new Error(
                            "Check your code! You might not be handling all the types server sends you"
                        );
                    }
                }
            };
        };

        this.sendMessage = (msg: string) => {
            if (this.isConnected) {
                const message: Omit<TChatMessage, "name"> = {
                    id: this.clientId!,
                    message: msg,
                    date: Date.now() / 1000,
                };
                this.socket.send(
                    JSON.stringify({
                        type: WebSocketAction.message,
                        data: message,
                    })
                );
            } else {
                throw new Error(
                    "Your message wasnt sent. Something is wrong with the connection."
                );
            }
        };
        this.setName = (name: string) => {
            if (this.isConnected) {
                this.socket.send(
                    JSON.stringify({
                        type: WebSocketAction.setName,
                        data: {
                            name,
                        },
                    })
                );
            } else {
                throw new Error(
                    "Name wasnt set. Something is wrong with the connection."
                );
            }
        };
        this.setTyping = (isTyping: boolean) => {
            if (this.isConnected) {
                this.socket.send(
                    JSON.stringify({
                        type: WebSocketAction.typing,
                        data: {
                            isTyping,
                        },
                    })
                );
            }
        };
    }
}

const appWebSocket = new webSocket();
export default appWebSocket;
