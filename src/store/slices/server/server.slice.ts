import { createSlice } from '@reduxjs/toolkit'
import { ServerState } from '../../../config/interfaces'
import { startClientThunk, startServerThunk, stopClientThunk, stopServerThunk } from './server.thunk';

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
        setServer: (state, action) => {
            state.server = action.payload
            state.status = 'success';
        },
        clearServer: (state) => {
            state.server = null;
            state.status = 'idle'
            state.stopServerStatus = 'success'
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
        },
        setEmmisorConfiguration: (state, action) => {
            state.configHost = action.payload.host
            state.configPort = +action.payload.port
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
                state.server = null
                state.stopServerResponse = action.payload
                state.stopServerStatus = 'success';
            })
            .addCase(stopServerThunk.rejected, (state, action) => {
                state.stopServererror = action.payload ?? "Error desconocido";
                state.stopServerStatus = 'error';
            })
            .addCase(startClientThunk.pending, (state) => {
                state.error = null;
                state.status = 'loading';
            })
            .addCase(startClientThunk.fulfilled, (state, action) => {
                state.server = action.payload
                state.status = 'success';
            })
            .addCase(startClientThunk.rejected, (state, action) => {
                state.error = action.payload ?? "Error desconocido";
                state.status = 'error';
            })
            .addCase(stopClientThunk.pending, (state) => {
                state.stopServererror = null;
                state.stopServerStatus = 'loading';
            })
            .addCase(stopClientThunk.fulfilled, (state, action) => {
                state.server = null
                state.stopServerResponse = action.payload
                state.stopServerStatus = 'success';
            })
            .addCase(stopClientThunk.rejected, (state, action) => {
                state.stopServererror = action.payload ?? "Error desconocido";
                state.stopServerStatus = 'error';
            })
    }
})

export const {clearServer, clearServerError, clearStopServer, clearStopServerError, setServer,  setEmmisorConfiguration} = serverSlice.actions