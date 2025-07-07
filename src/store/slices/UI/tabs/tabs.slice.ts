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
            const index = state.dynamicTabs.findIndex(tab => tab.route === action.payload.route);

            if (index === -1) {
                state.dynamicTabs.push(action.payload);
            } else {
                state.dynamicTabs[index] = action.payload;
            }
        },
        removeTab: (state, action: PayloadAction<string>) => {
            state.dynamicTabs = state.dynamicTabs.filter(tab => tab.route !== action.payload);
        },
    }
})

export const { addTab, removeTab } = tabSlice.actions;