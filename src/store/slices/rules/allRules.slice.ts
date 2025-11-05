import { createSlice } from "@reduxjs/toolkit";
import { AsyncStatus, AllRulesState } from "../../../config/interfaces";
import { getRulesThunk } from "./rules.thunk";

const initialState: AllRulesState = {
    allRulles: [],
    page: 1,
    hasMore: true,
    status: "idle" as AsyncStatus,
    error: null,
};

export const allRulesSlice = createSlice({
    name: "rules",
    initialState,
    reducers: {
        clearAllRules: (state) => {
            state.allRulles = [];
            state.page = 1;
            state.hasMore = true;
            state.status = "idle";
        },
        clearAllRulesError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRulesThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getRulesThunk.fulfilled, (state, action) => {
                const { data, page, pages } = action.payload;
                state.allRulles = [
                    ...state.allRulles,
                    ...data.filter(
                        (newRule) => !state.allRulles.some((existing) => existing._id === newRule._id)
                    ),
                ];
                state.page = page;
                state.hasMore = page < pages;
                state.status = "success";
            })
            .addCase(getRulesThunk.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload ?? "Error desconocido";
            });
    },
});

export const { clearAllRules, clearAllRulesError } = allRulesSlice.actions;
export default allRulesSlice.reducer;
