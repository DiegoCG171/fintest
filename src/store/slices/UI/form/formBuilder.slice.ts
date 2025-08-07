import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ColumnConfigFormBuilder,
  FormBuilderState,
  TableRowDataFormBuilder,
} from "../../../../config/interfaces";

const initialState: FormBuilderState = {
  config: [],
  tabForms: {},
};

function getNestedRow(
  values: TableRowDataFormBuilder[],
  path: number[]
): TableRowDataFormBuilder | null {
  let current: TableRowDataFormBuilder | undefined;
  let currentLevel: TableRowDataFormBuilder[] = values;

  for (let i = 0; i < path.length; i++) {
    const index = path[i];
    current = currentLevel[index];
    if (!current) return null;
    if (i < path.length - 1) {
      currentLevel = Array.isArray(current.breakingRules)
        ? current.breakingRules
        : [];
    }
  }
  return current || null;
}

export const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<ColumnConfigFormBuilder[]>) {
      state.config = action.payload;
    },

    setValuesForTab: (
      state,
      action: PayloadAction<{
        tabId: string;
        values: TableRowDataFormBuilder[];
        originalValues: TableRowDataFormBuilder[];
      }>
    ) => {
      const { tabId, values, originalValues } = action.payload;
      state.tabForms[tabId] = {
        ...(state.tabForms[tabId] || {}),
        values,
        originalValues,
      };
    },

    setOriginalValuesForTab: (
      state,
      action: PayloadAction<{
        tabId: string;
        originalValues: TableRowDataFormBuilder[];
      }>
    ) => {
      const { tabId, originalValues } = action.payload;
      if (state.tabForms[tabId]) {
        state.tabForms[tabId].originalValues = originalValues;
      }
    },

    resetOriginalValues: (state, action: PayloadAction<{ tabId: string }>) => {
      const { tabId } = action.payload;
      const tab = state.tabForms[tabId];
      if (tab) {
        tab.originalValues = JSON.parse(JSON.stringify(tab.values));
      }
    },

    updateFieldValue(
      state,
      action: PayloadAction<{
        tabId: string;
        rowIndex: number;
        fieldKey: string;
        value: string | number | boolean;
      }>
    ) {
      const { tabId, rowIndex, fieldKey, value } = action.payload;
      const tab = state.tabForms[tabId];
      if (tab && tab.values[rowIndex]) {
        tab.values[rowIndex][fieldKey] = value;
      }
    },
    updateNestedFieldValue(
      state,
      action: PayloadAction<{
        tabId: string;
        path: number[];
        fieldKey: string;
        value: string | number | boolean;
      }>
    ) {
      const { tabId, path, fieldKey, value } = action.payload;
      const tab = state.tabForms[tabId];
      if (!tab) return;
      const targetRow = getNestedRow(tab.values, path);
      if (targetRow) {
        targetRow[fieldKey] = value;
      }
    },
    updateIsRequiredRecursive(
      state,
      action: PayloadAction<{
        tabId: string;
        path: number[];
        value: boolean;
      }>
    ) {
      const { tabId, path, value } = action.payload;
      const tab = state.tabForms[tabId];
      if (!tab) return;

      function updateRecursive(
        rows: TableRowDataFormBuilder[],
        currentPathIndex = 0
      ) {
        const index = path[currentPathIndex];
        if (!rows || !rows[index]) return;

        if (currentPathIndex === path.length - 1) {
          rows[index].isRequired = value;

          if (Array.isArray(rows[index].breakingRules)) {
            rows[index].breakingRules.forEach((child) => {
              if (
                !Array.isArray(child.breakingRules) ||
                child.breakingRules.length === 0
              ) {
                child.isRequired = value;
              }
            });
          }
          return;
        }
        if (Array.isArray(rows[index].breakingRules)) {
          updateRecursive(rows[index].breakingRules, currentPathIndex + 1);
        }
      }

      updateRecursive(tab.values);
    },
    updateIsActiveRecursive(
      state,
      action: PayloadAction<{
        tabId: string;
        path: number[];
        value: boolean;
      }>
    ) {
      const { tabId, path, value } = action.payload;
      const tab = state.tabForms[tabId];
      if (!tab) return;

      function updateRecursive(
        rows: TableRowDataFormBuilder[],
        currentPathIndex = 0
      ) {
        const index = path[currentPathIndex];
        if (!rows || !rows[index]) return;
        if (currentPathIndex === path.length - 1) {
          rows[index].isActive = value;

          if (Array.isArray(rows[index].breakingRules)) {
            rows[index].breakingRules.forEach((child) => {
              if (
                !Array.isArray(child.breakingRules) ||
                child.breakingRules.length === 0
              ) {
                child.isActive = value;
              }
            });
          }
          return;
        }
        if (Array.isArray(rows[index].breakingRules)) {
          updateRecursive(rows[index].breakingRules, currentPathIndex + 1);
        }
      }

      updateRecursive(tab.values);
    },
    setVisibility(
      state,
      action: PayloadAction<{
        tabId: string;
        visibility: Record<string, boolean>;
      }>
    ) {
      const { tabId, visibility } = action.payload;
      if (!state.tabForms[tabId]) {
        state.tabForms[tabId] = {
          values: [],
          originalValues: [],
          visibility: {},
        };
      }
      state.tabForms[tabId].visibility = visibility;
    },
  },
});

export const {
  setConfig,
  setValuesForTab,
  setOriginalValuesForTab,
  updateFieldValue,
  updateNestedFieldValue,
  updateIsRequiredRecursive,
  updateIsActiveRecursive,
  setVisibility,
  resetOriginalValues,
} = formBuilderSlice.actions;

export default formBuilderSlice;
