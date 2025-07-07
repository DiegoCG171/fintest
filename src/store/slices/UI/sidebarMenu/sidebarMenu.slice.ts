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
import { mapCollections } from "../../../../config/utils/collections.utils";
import { CollectionResponse } from "../../../../config/interfaces/collections.interface";
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
      (state, action: PayloadAction<CollectionResponse>) => {
        const newCollectionMapped = mapCollections([action.payload]);
        state.collectionsMenu.push(newCollectionMapped[0]);
        state.createCollectionMenu = false;
      }
    );
    build.addCase(deleteTestCaseThunk
      .fulfilled, (state, action) => {
        state.collectionsMenu = state.collectionsMenu.map((group) => {
          const filteredItems = group.items?.filter(
            (item) => item.id !== action.payload
          );
          return { ...group, items: filteredItems };
        });
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
      (state, action) => {
        const { uuid, name } = action.payload;

        state.collectionsMenu = state.collectionsMenu.map((group) => {
          const updatedItems = group.items?.map((item) => {
            if (item.id === uuid) {
              return {
                ...item,
                name,
                linkMenu: `collections/${uuid}`,
              };
            }
            return item;
          });

          return { ...group, items: updatedItems };
        });
        state.updateTestCase = null;
        state.loading = false;
      }
    );
    build.addCase(
      createTestCaseThunk.fulfilled,
      (
        state,
        action: PayloadAction<{
          id: string;
          name: string;
          collectionId: string;
        }>
      ) => {
        const { id, name, collectionId } = action.payload

        state.collectionsMenu = state.collectionsMenu.map((group) => {
          if (group.id === collectionId) {
            const newItem = {
              id,
              name,
              linkMenu: `collections/${id}`, // Ajusta el prefijo si lo necesitas distinto
            };
            return {
              ...group,
              items: group.items ? [...group.items, newItem] : [newItem],
            };
          }
          return group;
        });
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