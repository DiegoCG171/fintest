import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuServiceInterface, MenuSidebarState } from "../../../../config/interfaces/menu.interface";

export const initialState: MenuSidebarState = {
    isCollapsed: false,
    categoriesMenu: [],
    collectionsMenu: [],
}

export const sidebarMenuSlice = createSlice({
    name: 'menuSidebar',
    initialState,
    reducers: {
        setCategoriesData(state, action: PayloadAction<MenuServiceInterface[]>) {
            state.categoriesMenu = action.payload;
        },
        resetCategoriesMenuData(state) {
            state.categoriesMenu = []
        },
        setCollectionsData(state, action: PayloadAction<MenuServiceInterface[]>) {
            state.collectionsMenu = action.payload;
        },
        resetCollectionsMenuData(state) {
            state.collectionsMenu = []
        },
        setCollapsedState(state) {
            state.isCollapsed =!state.isCollapsed
        }
    }
})

export const { setCategoriesData, resetCategoriesMenuData, setCollectionsData, resetCollectionsMenuData, setCollapsedState } = sidebarMenuSlice.actions;