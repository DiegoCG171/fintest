/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createExtractionRuleThunk,
  getExtractionRuleByIdThunk,
  updateExtractionRulesThunk,
} from "./extractionRules.thunk";

export interface BreakingRule {
  id?: string;
  displayName?: string;
  length?: number;
  idToken?: string;
  specification?: BreakingRule[];
}

export interface PositionsLength {
  initPos: number;
  finalPos: number;
}

export interface Field {
  idBitmap: string;
  displayName: string;
  length: number;
  operator: string;
  field?: string;
  regex: string;
  regexType?: "alphanumeric" | "alphanumeric_special" | "numeric" | "other";
  isBreakeable?: boolean;
  breakingRules?: BreakingRule[];
  isLengthVariable?: boolean;
  positionsLength?: PositionsLength;
}

export interface RuleRow {
  _id?: string;
  id?: string;
  idBitmap?: string;
  displayName: string;
  field?: string;
  typeData?: string;
  length?: number;
  operator?: string;
  regex?: string;
  isBreakeable?: boolean;
  isLengthVariable?: boolean;
  breakingRules?: RuleRow[];
  specification?: RuleRow[];
  positionsLength?: PositionsLength;
}

export interface RuleState {
  uuid: string;
  version: number;
  type: string;
  fields: RuleRow[];
}

export interface ExtractionRulesState {
  updateExtractionRule: RuleState;
  originalExtractionRule: RuleState;
  updating: boolean;
  changes: Record<string, Record<string, { oldValue: any; newValue: any }>>;
}

export interface UpdateExtractionRulesPayload {
  id: string;
}

const initialState: ExtractionRulesState = {
  updateExtractionRule: {
    uuid: "",
    type: "",
    version: 0,
    fields: [],
  },
  originalExtractionRule: {
    uuid: "",
    type: "",
    version: 0,
    fields: [],
  },
  updating: false,
  changes: {},
};

export const extractionRulesSlice = createSlice({
  name: "rules",
  initialState,
  reducers: {
    setVersionForm: (state, action: PayloadAction<number>) => {
      const newVersion = action.payload;
      const originalVersion = state.originalExtractionRule.version;
      const ruleId = state.updateExtractionRule.uuid || "root";

      state.updateExtractionRule.version = newVersion;

      if (newVersion !== originalVersion) {
        const existingChanges = state.changes?.[ruleId] || {};

        const oldValue = existingChanges["version"]
          ? existingChanges["version"].oldValue
          : originalVersion;

        state.changes = {
          ...state.changes,
          [ruleId]: {
            ...existingChanges,
            version: {
              oldValue: oldValue,
              newValue: newVersion,
            },
          },
        };
      } else {
        if (state.changes?.[ruleId]?.["version"]) {
          const { version, ...restChanges } = state.changes[ruleId];

          if (Object.keys(restChanges).length > 0) {
            state.changes = {
              ...state.changes,
              [ruleId]: restChanges,
            };
          } else {
            const { [ruleId]: _, ...rest } = state.changes;
            state.changes = rest;
          }
        }
      }
    },

    setTypeForm: (state, action: PayloadAction<string>) => {
      const newType = action.payload;
      const originalType = state.originalExtractionRule.type;
      const ruleId = state.updateExtractionRule.uuid || "root";

      state.updateExtractionRule.type = newType;

      if (newType !== originalType) {
        const existingChanges = state.changes?.[ruleId] || {};

        const oldValue = existingChanges["type"]
          ? existingChanges["type"].oldValue
          : originalType;

        state.changes = {
          ...state.changes,
          [ruleId]: {
            ...existingChanges,
            type: {
              oldValue: oldValue,
              newValue: newType,
            },
          },
        };
      } else {
        if (state.changes?.[ruleId]?.["type"]) {
          const { type, ...restChanges } = state.changes[ruleId];

          if (Object.keys(restChanges).length > 0) {
            state.changes = {
              ...state.changes,
              [ruleId]: restChanges,
            };
          } else {
            const { [ruleId]: _, ...rest } = state.changes;
            state.changes = rest;
          }
        }
      }
    },
    setFields: (state, action: PayloadAction<RuleRow[]>) => {
      state.updateExtractionRule.fields = action.payload;
    },
    updateRule: (
      state,
      action: PayloadAction<{ _id: string; updatedRow: RuleRow }>
    ) => {
      const { _id, updatedRow } = action.payload;

      const IGNORED_FIELDS = ["isLengthVariable"];

      const deepEqual = (a: any, b: any) => {
        try {
          return JSON.stringify(a) === JSON.stringify(b);
        } catch {
          return a === b;
        }
      };

      // Nueva función para buscar la regla original por ID en cualquier nivel
      function findOriginalRuleById(
        rules: RuleRow[],
        targetId: string
      ): RuleRow | undefined {
        for (const rule of rules) {
          if (rule._id === targetId || rule.id === targetId) {
            return rule;
          }

          if (rule.breakingRules?.length) {
            const found = findOriginalRuleById(rule.breakingRules, targetId);
            if (found) return found;
          }

          if (rule.specification?.length) {
            const found = findOriginalRuleById(rule.specification, targetId);
            if (found) return found;
          }
        }
        return undefined;
      }

      function mutateRuleById(
        rules: RuleRow[],
        targetId: string,
        updatedRow: RuleRow
      ): RuleRow | undefined {
        for (let i = 0; i < rules.length; i++) {
          const rule = rules[i];

          if (rule._id === targetId || rule.id === targetId) {
            // Buscar la regla original específica para este targetId
            const originalRule = findOriginalRuleById(
              state.originalExtractionRule.fields,
              targetId
            );

            const existingChanges = state.changes?.[targetId] || {};
            const newChanges: Record<string, { oldValue: any; newValue: any }> =
              {};

            for (const key of Object.keys(updatedRow) as (keyof RuleRow)[]) {
              if (IGNORED_FIELDS.includes(key as string)) {
                continue;
              }

              const newVal = updatedRow[key];
              const fieldExistsInOriginal = originalRule && key in originalRule;

              // Si ya existe un cambio previo, mantener el oldValue original
              // Si no, tomar el valor de la regla original
              const originalVal = existingChanges[key as string]
                ? existingChanges[key as string].oldValue
                : fieldExistsInOriginal
                ? originalRule[key]
                : undefined;

              if (!deepEqual(newVal, originalVal)) {
                if (
                  !fieldExistsInOriginal &&
                  (newVal === undefined || newVal === null || newVal === "")
                ) {
                  continue;
                }

                newChanges[key as string] = {
                  oldValue: originalVal,
                  newValue: newVal,
                };
              }
            }

            // Actualizar la regla actual
            for (const key of Object.keys(updatedRow) as (keyof RuleRow)[]) {
              (rule as any)[key] = updatedRow[key];
            }

            // Guardar o limpiar cambios
            if (Object.keys(newChanges).length > 0) {
              state.changes = {
                ...state.changes,
                [targetId]: newChanges,
              };
            } else {
              if (state.changes?.[targetId]) {
                const { [targetId]: _, ...rest } = state.changes;
                state.changes = rest;
              }
            }

            return rule;
          }

          if (rule.breakingRules?.length) {
            const updated = mutateRuleById(
              rule.breakingRules,
              targetId,
              updatedRow
            );
            if (updated) return updated;
          }

          if (rule.specification?.length) {
            const updated = mutateRuleById(
              rule.specification,
              targetId,
              updatedRow
            );
            if (updated) return updated;
          }
        }

        return undefined;
      }

      mutateRuleById(
        state.updateExtractionRule.fields,
        _id,
        updatedRow
      );
    },

    addSubRule: (
      state,
      action: PayloadAction<{ parentId: string; newRule: RuleRow }>
    ) => {
      function addSubRuleById(
        rules: RuleRow[],
        parentId: string,
        newRule: RuleRow
      ): RuleRow[] {
        return rules.map((rule) => {
          if (rule.id === parentId || rule._id === parentId) {
            if (rule.specification && rule.specification.length >= 0) {
              return {
                ...rule,
                specification: [...(rule.specification || []), newRule],
              };
            }

            return {
              ...rule,
              breakingRules: [...(rule.breakingRules || []), newRule],
            };
          }

          if (rule.breakingRules && rule.breakingRules.length > 0) {
            return {
              ...rule,
              breakingRules: addSubRuleById(
                rule.breakingRules,
                parentId,
                newRule
              ),
            };
          }

          if (rule.specification && rule.specification.length > 0) {
            return {
              ...rule,
              specification: addSubRuleById(
                rule.specification,
                parentId,
                newRule
              ),
            };
          }

          return rule;
        });
      }

      state.updateExtractionRule.fields = addSubRuleById(
        state.updateExtractionRule.fields,
        action.payload.parentId,
        action.payload.newRule
      );
    },
    addTopLevelRule: (state, action: PayloadAction<RuleRow>) => {
      state.updateExtractionRule.fields.push(action.payload);
    },
    removeTopLevelRule: (state, action: PayloadAction<string>) => {
      state.updateExtractionRule.fields =
        state.updateExtractionRule.fields.filter(
          (rule) => rule.id !== action.payload && rule._id !== action.payload
        );
    },
    removeSubRule: (state, action: PayloadAction<string>) => {
      function removeRuleById(
        rules: RuleRow[] = [],
        targetId: string
      ): RuleRow[] {
        return rules
          .map((rule) => {
            const newRule: RuleRow = { ...rule };

            if (rule.breakingRules) {
              newRule.breakingRules = removeRuleById(
                rule.breakingRules,
                targetId
              );
            }

            if (rule.specification) {
              newRule.specification = removeRuleById(
                rule.specification,
                targetId
              );
            }

            return newRule;
          })
          .filter((rule) => rule.id !== targetId && rule._id !== targetId);
      }

      state.updateExtractionRule.fields = removeRuleById(
        state.updateExtractionRule.fields,
        action.payload
      );
    },
    resetForm: (state) => {
      state.updateExtractionRule = initialState.updateExtractionRule;
      state.originalExtractionRule = initialState.originalExtractionRule;
      state.updating = false;
      state.changes = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExtractionRuleByIdThunk.fulfilled, (state, action) => {
        state.updateExtractionRule = action.payload;
        state.originalExtractionRule = JSON.parse(
          JSON.stringify(action.payload)
        );
        state.updating = true;
        state.changes = {};
      })
      .addCase(updateExtractionRulesThunk.fulfilled, (state) => {
        state.updateExtractionRule = initialState.updateExtractionRule;
        state.originalExtractionRule = initialState.originalExtractionRule;
        state.updating = false;
        state.changes = {};
      })
      .addCase(createExtractionRuleThunk.fulfilled, (state) => {
        state.updateExtractionRule = initialState.updateExtractionRule;
        state.updating = false;
      });
  },
});

export const {
  addSubRule,
  removeSubRule,
  setFields,
  setTypeForm,
  setVersionForm,
  updateRule,
  resetForm,
  addTopLevelRule,
  removeTopLevelRule,
} = extractionRulesSlice.actions;

export default extractionRulesSlice.reducer;