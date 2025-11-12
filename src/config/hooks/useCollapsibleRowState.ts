import { useEffect, useState } from "react";
import { RuleRow } from "../../store/slices/extractionsRules/extractionRulesSlice";
import { detectExpressionType, getDisplayId } from "../utils/extractionRules.utils";
import { ExpressionType } from "../constants/extactionRulesPage";

export const useCollapsibleRowState = (row: RuleRow) => {
  const [open, setOpen] = useState(false);
  const [editableId, setEditableId] = useState(getDisplayId(row));
  const [editableName, setEditableName] = useState(row.displayName);
  const [editableField, setEditableField] = useState(row.field);
  const [editableLength, setEditableLength] = useState(row.length);
  const [editableOperator, setEditableOperator] = useState(row.operator);
  const [expression, setExpression] = useState<ExpressionType>(
    detectExpressionType(row.regex)
  );
  const [isLengthVariable, setIsLengthVariable] = useState(
    row.isLengthVariable ?? false
  );
  const [positionsLength, setPositionsLength] = useState(
    row.positionsLength?.finalPos.toString() || ""
  );
  const [regex, setRegex] = useState(row.regex || "");

  useEffect(() => {
    setExpression(detectExpressionType(row.regex));
    setIsLengthVariable(row.isLengthVariable ?? false);
    setPositionsLength(row.positionsLength?.finalPos.toString() || "");
  }, [row.regex, row.isLengthVariable, row.positionsLength]);

  useEffect(() => {
    if (isLengthVariable) {
      setEditableOperator("<=");
    }
  }, [isLengthVariable]);

  return {
    open,
    setOpen,
    editableId,
    setEditableId,
    editableName,
    setEditableName,
    editableField,
    setEditableField,
    editableLength,
    setEditableLength,
    editableOperator,
    setEditableOperator,
    expression,
    setExpression,
    isLengthVariable,
    setIsLengthVariable,
    positionsLength,
    setPositionsLength,
    regex,
    setRegex,
  };
};