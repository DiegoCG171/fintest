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
  name: 'formBuilder',
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<ColumnConfigFormBuilder[]>) {
      state.config = action.payload;
    },

    setValuesForTab: (
      state,
      action: PayloadAction<{ tabId: string; values: TableRowDataFormBuilder[]; originalValues?: TableRowDataFormBuilder[] }>
    ) => {
      const { tabId, values, originalValues } = action.payload;
      const currentTab = state.tabForms[tabId];
      state.tabForms[tabId] = {
        ...currentTab,
        values,
        originalValues: currentTab?.originalValues ?? originalValues ?? values,
        visibility: currentTab?.visibility ?? {},
      };
    },

    setOriginalValuesForTab: (
      state,
      action: PayloadAction<{ tabId: string; originalValues: TableRowDataFormBuilder[] }>
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

    setVisibility(
      state,
      action: PayloadAction<{ tabId: string; visibility: Record<string, boolean> }>
    ) {
      const { tabId, visibility } = action.payload;
      if (!state.tabForms[tabId]) {
        state.tabForms[tabId] = { values: [], originalValues: [], visibility: {} };
      }
      state.tabForms[tabId].visibility = visibility;
    },
  },
})

export const {
  setConfig,
  setValuesForTab,
  setOriginalValuesForTab,
  updateFieldValue,
  updateNestedFieldValue,
  setVisibility,
  resetOriginalValues
} = formBuilderSlice.actions

export default formBuilderSlice
