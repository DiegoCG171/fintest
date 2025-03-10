import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { Rule } from "../../interfaces/rule.interface";

interface InitialState {
    rules: Rule[];
}

const initialState: InitialState = {
    rules: [],
}

export const startGetAllRules = createAsyncThunk('rules/get-all-rules', async(_, { rejectWithValue}) => {
    try {
        const {data} = await api.get('/rules');
        return data;
    } catch (error) {
        console.error(error)
        return rejectWithValue(error)
    }
});

export const rulesSlice = createSlice({
    name: 'rules',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(startGetAllRules.fulfilled, (state, action) => {
            state.rules = action.payload
        })
    }
})