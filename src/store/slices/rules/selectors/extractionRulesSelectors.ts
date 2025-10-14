import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

export const selectRules = (state: RootState) => state.extractionRules;

export const selectVersion = (state: RootState) => state.extractionRules.version;

export const selectType = (state: RootState) => state.extractionRules.type;

export const selectFields = (state: RootState) => state.extractionRules.fields;

export const selectFieldById = (fieldIndex: number) =>
  createSelector([selectFields], (fields) => fields[fieldIndex]);

export const selectBreakingRules = (fieldIndex: number) =>
  createSelector(
    [selectFields],
    (fields) => fields[fieldIndex]?.breakingRules || []
  );

export const selectExportJSON = createSelector(
  [selectRules],
  (rules) => JSON.stringify(rules, null, 2)
);
