import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  MenuServiceInterface,
  MenuSidebarState,
} from "../../../../config/interfaces/menu.interface";
import {
  createCollectionThunk,
  createTestCaseThunk,
  deleteTestCaseThunk,
} from "../../collections/collections.thunk";
import { updateTestCaseThunk } from "../../testCases/testCases.thunk";

export const initialState: MenuSidebarState = {
  isCollapsed: false,
  categoriesMenu: [],
  collectionsMenu: [],
  createCollectionMenu: false,
  updateTestCase: null,
  updateCollection: null,
  loading: false,
  idTestCase: "",
};

export const sidebarMenuSlice = createSlice({
  name: "menuSidebar",
  initialState,
  reducers: {
    setCategoriesData(state, action: PayloadAction<MenuServiceInterface[]>) {
      state.categoriesMenu = action.payload;
    },
    resetCategoriesMenuData(state) {
      state.categoriesMenu = [];
    },
    setCollectionsData(state, action: PayloadAction<MenuServiceInterface[]>) {
      state.collectionsMenu = action.payload;
    },
    resetCollectionsMenuData(state) {
      state.collectionsMenu = [];
    },
    toggleCreateCollectionMenu(state, action) {
      state.createCollectionMenu = action.payload;
    },
    setCollapsedState(state) {
      state.isCollapsed = !state.isCollapsed;
    },
    updateTestCase(state, action) {
      state.updateTestCase = action.payload;
    },
    removeUpdateTestCase(state) {
      state.updateTestCase = null;
    },
    updateCollection(state, action) {
      state.updateCollection = action.payload;
    },
    removeUpdateCollection(state) {
      state.updateCollection = null;
    },
  },
  extraReducers: (build) => {
    build.addCase(
      createCollectionThunk.fulfilled,
      (state) => {
        
        state.createCollectionMenu = false;
      }
    );
    build.addCase(deleteTestCaseThunk
      .fulfilled, (state) => {
        
        state.loading = false;
      });
    build.addCase(deleteTestCaseThunk.rejected, (state) => {
      state.loading = false;
    });
    build.addCase(deleteTestCaseThunk.pending, (state, action) => {
      state.idTestCase = action.meta.arg; // <- Aquí está el ID o datos que enviaste
      state.loading = true;
    });
    build.addCase(updateTestCaseThunk
      .pending, (state) => {
        state.loading = true;
      });
    build.addCase(updateTestCaseThunk.rejected, (state) => {
      state.loading = false;
    });
    build.addCase(
      updateTestCaseThunk.fulfilled,
      (state) => {
        
        state.updateTestCase = null;
        state.loading = false;
      }
    );
    build.addCase(
      createTestCaseThunk.fulfilled,
      (
        state
      ) => {
        
        state.loading = false;
      }
    );
  },
});

export const {
  setCategoriesData,
  resetCategoriesMenuData,
  setCollectionsData,
  resetCollectionsMenuData,
  setCollapsedState,
  toggleCreateCollectionMenu,
  updateTestCase,
  removeUpdateTestCase,
  updateCollection,
  removeUpdateCollection
} = sidebarMenuSlice.actions;