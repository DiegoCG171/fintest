import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  MenuServiceInterface,
  MenuSidebarState,
} from "../../../../config/interfaces/menu.interface";

export const initialState: MenuSidebarState = {
  isCollapsed: false,
  menus: {
    category: [],
    collection: [],
    testCase: [],
  },
};

export const sidebarMenuSlice = createSlice({
  name: "menuSidebar",
  initialState,
  reducers: {
    setRecursiveMenuData(
      state,
      action: PayloadAction<{ type: string; items: MenuServiceInterface[] }>
    ) {
      state.menus[action.payload.type] = action.payload.items;
    },
    resetRecursiveMenuData(state, action: PayloadAction<{ type: string }>) {
      state.menus[action.payload.type] = [];
    },
    setCollapsedState(state) {
      state.isCollapsed = !state.isCollapsed;
    },
  }
});

export const {
  setRecursiveMenuData,
  resetRecursiveMenuData,
  setCollapsedState
} = sidebarMenuSlice.actions;