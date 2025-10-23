import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRuleByIdThunk } from "../rules/rules.thunk";
import {
  createExtractionRuleThunk,
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
  updating: boolean;
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
  updating: false,
};

export const extractionRulesSlice = createSlice({
  name: "rules",
  initialState,
  reducers: {
    setVersionForm: (state, action: PayloadAction<number>) => {
      state.updateExtractionRule.version = action.payload;
    },
    setTypeForm: (state, action: PayloadAction<string>) => {
      state.updateExtractionRule.type = action.payload;
    },
    setFields: (state, action: PayloadAction<RuleRow[]>) => {
      state.updateExtractionRule.fields = action.payload;
    },
    updateRule: (
      state,
      action: PayloadAction<{ _id: string; updatedRow: RuleRow }>
    ) => {
      const { _id, updatedRow } = action.payload;

      function mutateRuleById(
        rules: RuleRow[],
        targetId: string,
        updatedRow: RuleRow
      ): RuleRow | undefined {
        for (let i = 0; i < rules.length; i++) {
          const rule = rules[i];

          if (rule._id === targetId || rule.id === targetId) {
            rules[i] = { ...updatedRow };
            return rules[i];
          }

          if (rule.breakingRules && rule.breakingRules.length > 0) {
            const updated = mutateRuleById(
              rule.breakingRules,
              targetId,
              updatedRow
            );
            if (updated) return updated;
          }

          if (rule.specification && rule.specification.length > 0) {
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

      mutateRuleById(state.updateExtractionRule.fields, _id, updatedRow);
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
            // Si ya tiene specification, agregamos ahí
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRuleByIdThunk.fulfilled, (state, action) => {
        state.updateExtractionRule = action.payload;
        state.updating = true;
      })
      .addCase(updateExtractionRulesThunk.fulfilled, (state) => {
        state.updateExtractionRule = initialState.updateExtractionRule;
        state.updating = false;
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
  addTopLevelRule,
  removeTopLevelRule,
} = extractionRulesSlice.actions;

export default extractionRulesSlice.reducer;
