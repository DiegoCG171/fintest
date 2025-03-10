import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const starServer = createAsyncThunk(
    'server/star-server',
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await api.post("/connection/start-tcp", {protocol: "TCP"});        
        return data;
      } catch (error) {
        console.error(error);
        return rejectWithValue(error);
      }
    }
  );


interface InitialState {
  server: string;
  port: number;
  status: string;
}

const initialState: InitialState = {
  server: "http://localhost",
  port: 0,
  status: ''
}

export const serverSlice = createSlice({
    name: "server",
    initialState,
    reducers: {
      onStopServer: (state,) => {
        state.status = ""
      }
    },
    extraReducers: (builder) => {
      builder.addCase(starServer.pending, (state) => {
        state.status = 'Conectando...';
      })
      .addCase(starServer.fulfilled, (state, action) => {
        state.status = `Escuchando ${action.payload.ip}:${action.payload.portNumber}`;
        state.port = action.payload.portNumber;
      })
      .addCase(starServer.rejected, (state) => {
        state.status = 'Coneccion fallida';
      });
    }
})

export const {onStopServer} = serverSlice.actions;
