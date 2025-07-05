import { createAsyncThunk } from "@reduxjs/toolkit"
import { StartServerSuccessResponse, StopServerSuccessResponse } from "../../../config/interfaces"
import { startServer, stopServer } from "../../../services/catalogs/server.service"

export const startServerThunk = createAsyncThunk<
    StartServerSuccessResponse,
    void,
    { rejectValue: string }
>(
    'server/startServer',
    async (_, { rejectWithValue }) => {
        try {
            const server = await startServer();
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
