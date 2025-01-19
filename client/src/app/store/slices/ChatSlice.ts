import { TActiveUser, TChatMessage, typingUser } from "../../../shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type chatState = {
    messages: TChatMessage[];
    clientName: string;
    activeUsers: TActiveUser[];
    typingUsers: typingUser[];
    clientId: number | null;
};

const initialState: chatState = {
    messages: [],
    typingUsers: [],
    clientName: "",
    activeUsers: [],
    clientId: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.clientName = action.payload;
        },
        setActiveUsers(state, action: PayloadAction<TActiveUser[]>) {
            state.activeUsers = action.payload;
        },
        setTypingUsers(state, action: PayloadAction<typingUser[]>) {
            state.typingUsers = action.payload;
        },
        setMessages(state, action: PayloadAction<TChatMessage[]>) {
            state.messages = action.payload;
        },
        setClientId(state, action: PayloadAction<number>) {
            state.clientId = action.payload;
        },
    },
});

export const {
    setName,
    setActiveUsers,
    setMessages,
    setClientId,
    setTypingUsers,
} = chatSlice.actions;
export default chatSlice.reducer;
