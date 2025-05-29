import { createSlice } from '@reduxjs/toolkit'
import { ServerState } from '../../../config/interfaces'
import { startServerThunk, stopServerThunk } from './server.thunk';

const initialState: ServerState = {
    server: null,
    status: 'idle',
    error: null,
    stopServerResponse: null,
    stopServerStatus: 'idle',
    stopServererror: null
}

export const serverSlice = createSlice({
    name: 'server',
    initialState,
    reducers: {
        clearServer: (state) => {
            state.server = null;
            state.status = 'idle'
        },
        clearServerError: (state) => {
            state.error = null;
            state.stopServerStatus = 'idle'
        },
        clearStopServer: (state) => {
            state.stopServerResponse = null;
            state.stopServerStatus = 'idle'
        },
        clearStopServerError: (state) => {
            state.stopServererror = null;
            state.stopServerStatus = 'idle'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(startServerThunk.pending, (state) => {
                state.error = null;
                state.status = 'loading';
            })
            .addCase(startServerThunk.fulfilled, (state, action) => {
                state.server = action.payload
                state.status = 'success';
            })
            .addCase(startServerThunk.rejected, (state, action) => {
                state.error = action.payload ?? "Error desconocido";
                state.status = 'error';
            })
            .addCase(stopServerThunk.pending, (state) => {
                state.stopServererror = null;
                state.stopServerStatus = 'loading';
            })
            .addCase(stopServerThunk.fulfilled, (state, action) => {
                state.stopServerResponse = action.payload
                state.stopServerStatus = 'success';
            })
            .addCase(stopServerThunk.rejected, (state, action) => {
                state.stopServererror = action.payload ?? "Error desconocido";
                state.stopServerStatus = 'error';
            })
    }
})

export const {clearServer, clearServerError, clearStopServer, clearStopServerError} = serverSlice.actions