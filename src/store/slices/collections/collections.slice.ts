import { createSlice } from "@reduxjs/toolkit";
import { collectionsInitialState } from "./collections.state";
import { getCollectionsThunk } from "./collections.thunk";


export const collectionSlice = createSlice({
    name: 'collections',
    initialState: collectionsInitialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(getCollectionsThunk.fulfilled, (state, action) => {
            state.collections = action.payload;
        })
    }
}) 