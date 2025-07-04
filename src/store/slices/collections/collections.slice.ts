import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCollectionsThunk } from "./collections.thunk";
import { CollectionResponse, CollectionsState } from "../../../config/interfaces/collections.interface";

const initialState: CollectionsState = {
  collections: null,
  status: 'idle',
  error: null,
}

export const collectionSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(
      getCollectionsThunk.pending,
      (state) => {
        state.error = null;
        state.status = 'loading'
      }
    );
    build.addCase(
      getCollectionsThunk.fulfilled,
      (state, action: PayloadAction<CollectionResponse[]>) => {
        state.collections = action.payload;
        state.status = 'success';
      }
    );
    build.addCase(
      getCollectionsThunk.rejected, (state, action) => {
        state.error = typeof action.payload === 'string' ? action.payload : 'Error desconocido';
        state.status = 'error';
      })
  },
});
