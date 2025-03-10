import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message  } from "../../interfaces/";


interface InitialState {
    message: Message,
    messages: Message[],
}

const initialState: InitialState = {
    message: {
        uuid: '',
        userId: '',
        interfaceId: '',
        date: 123123,
        errorAt: '',
        value: '',
        schemaId: '',
        incremental: 0,
        typeMsg: '',
        typeTx: '',
        fields: []
    },
    messages: []
} 

export const messagesSlice =  createSlice({
   name: "messages",
   initialState,
   reducers: {
    onGetMessage: (state, action: PayloadAction<Message>) => {
        state.message = action.payload
    },
    onGetMessages: (state, action: PayloadAction<Message>) => {

        state.messages = [action.payload, ...state.messages]

    }
   },
}) 

export const {onGetMessage, onGetMessages} = messagesSlice.actions;