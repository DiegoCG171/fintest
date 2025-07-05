import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tab, TabsState } from "../../../../config/interfaces";

const initialState: TabsState = {
    dynamicTabs: [],
};

export const tabSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        addTab: (state, action: PayloadAction<Tab>) => {
            const exists = state.dynamicTabs.some(tab => tab.route === action.payload.route);
            if (!exists) state.dynamicTabs.push(action.payload);
        },
        removeTab: (state, action: PayloadAction<string>) => {
            state.dynamicTabs = state.dynamicTabs.filter(tab => tab.route !== action.payload);
        },
    }
})

export const { addTab, removeTab } = tabSlice.actions;