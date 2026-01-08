import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  MenuServiceInterface,
  MenuSidebarState,
} from "../../../../config/interfaces/menu.interface";
import { deleteCollectionThunk } from "../../collections/collections.thunk";

export const initialState: MenuSidebarState = {
  isCollapsed: false,
  menus: {
    category: [],
    collection: [],
    testCase: [],
  },
  loading: false,
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
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCollectionThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCollectionThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteCollectionThunk.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const {
  setRecursiveMenuData,
  resetRecursiveMenuData,
  setCollapsedState
} = sidebarMenuSlice.actions;