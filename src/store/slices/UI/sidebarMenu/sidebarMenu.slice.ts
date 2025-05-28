import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuServiceRoot, MenuSidebarState } from "../../../../config/interfaces/menu.interface";
import { mockCategories } from "../../../../config/mock";

const initialState: MenuSidebarState = {
    data: mockCategories
}

export const sidebarMenuSlice = createSlice({
    name: 'menuSidebar',
    initialState,
    reducers: {
        setMenuData(state, action: PayloadAction<MenuServiceRoot>) {
            state.data = action.payload;
        },
        resetMenuData(state) {
            state.data = []
        }
    }
})

export const { setMenuData, resetMenuData } = sidebarMenuSlice.actions;