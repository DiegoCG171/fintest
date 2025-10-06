import { createAsyncThunk } from "@reduxjs/toolkit"
import { ClientsConection, StartServerSuccessResponse, StopServerSuccessResponse } from "../../../config/interfaces"
import { startServer, stopServer } from "../../../services/catalogs/server.service"
import { startClient, stopClient } from "../../../services";

export interface startServerPayload {
    processingMethod?: string;
    ip?: string;
    portNumber?: number;
}

export const startServerThunk = createAsyncThunk<
    StartServerSuccessResponse,
    startServerPayload,
    { rejectValue: string }
>(
    'server/startServer',
    async (startServerPayload, { rejectWithValue }) => {
        try {
            const server = await startServer(startServerPayload);
            return server;
        } catch (error) {
            return rejectWithValue(error as string)
        }
    }
);

export const startClientThunk = createAsyncThunk<
    StartServerSuccessResponse,
    ClientsConection,
    { rejectValue: string }
>(
    'server/startClient',
    async (startServerPayload, { rejectWithValue }) => {
        try {
            const server = await startClient(startServerPayload);
            return server;
        } catch (error) {
            return rejectWithValue(error as string)
        }
    }
);

export const stopServerThunk = createAsyncThunk<
    StopServerSuccessResponse,
    string,
    { rejectValue: string }
>(
    'server/stopServer',
    async (id, { rejectWithValue }) => {
        try {
            const response = await stopServer(id);
            return response;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);

export const stopClientThunk = createAsyncThunk<
    StopServerSuccessResponse,
    string,
    { rejectValue: string }
>(
    'server/stopClient',
    async (id, { rejectWithValue }) => {
        try {
            const response = await stopClient(id);
            return response;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);
