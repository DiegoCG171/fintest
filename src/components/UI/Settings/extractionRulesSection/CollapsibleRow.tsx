import { useCallback } from "react";
import {
  EXPRESSION_MAP,
  ExpressionType,
  MAX_LEVEL,
} from "../../../../config/constants/extactionRulesPage";
import { useCollapsibleRowState } from "../../../../config/hooks/useCollapsibleRowState";
import {
  getChildKey,
  getDisplayId,
  getRegexFromExpression,
  getRuleId,
  getStyleByLevel,
} from "../../../../config/utils/extractionRules.utils";
import { useAppDispatch, useAppSelector } from "../../../../store";
import {
  RuleRow,
  updateRule,
} from "../../../../store/slices/extractionsRules/extractionRulesSlice";
import {
  Box,
  Collapse,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TableCell,
  TableRow,
} from "@mui/material";
import { openConfirmDeleteModal } from "../../../../store/slices/UI/confirmDeleteModal/confirmDeleteModal.slice";
import { LevelOneFields } from "./LevelOneFields";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { ChildRulesTable } from "./ChildRulesTable";

interface CollapsibleRowProps {
  row: RuleRow;
  level?: number;
  maxLevel?: number;
  onUpdate?: (updatedRow: RuleRow) => void;
  onAddSubRule?: (parentId: string) => void;
}

export const CollapsibleRow = ({
  row,
  level = 1,
  maxLevel = MAX_LEVEL,
  onUpdate,
  onAddSubRule,
}: CollapsibleRowProps) => {
  const dispatch = useAppDispatch();
  const { changes, updating } = useAppSelector(
    (state) => state.extractionRules
  );

  const rowId = getRuleId(row);
  const hasChanges = Boolean(changes[rowId]);
  const rowChanges = changes[rowId];
  const childKey = getChildKey(level);
  const canExpand = level < maxLevel;
  const styles = getStyleByLevel(level);

  const state = useCollapsibleRowState(row);

  const handleUpdate = useCallback(
    (changes: Partial<RuleRow>) => {
      const updatedRow: RuleRow = { ...row, ...changes };
      dispatch(updateRule({ _id: row._id ?? "", updatedRow }));
    },
    [dispatch, row]
  );

  const handleExpressionChange = useCallback(
    (e: SelectChangeEvent) => {
      const newExpression = e.target.value as ExpressionType;
      const newRegex = getRegexFromExpression(newExpression);

      state.setExpression(newExpression);
      state.setRegex(newRegex);

      handleUpdate({
        typeData: newExpression,
        regex: newRegex,
      });
    },
    [handleUpdate, state]
  );

  const handleSubRuleUpdate = useCallback(
    (index: number, updatedSubRule: RuleRow) => {
      if (!onUpdate) return;

      const children = row[childKey] || [];
      const newChildren = [...children];
      newChildren[index] = updatedSubRule;

      onUpdate({
        ...row,
        idBitmap: state.editableId,
        displayName: state.editableName,
        field: state.editableField,
        typeData: state.expression,
        [childKey]: newChildren,
      });
    },
    [onUpdate, row, childKey, state]
  );

  const handleOpenDeleteModal = useCallback(() => {
    const resource = level > 1 ? "subRule" : "topRule";
    dispatch(openConfirmDeleteModal({ id: row._id, resource }));
  }, [dispatch, level, row._id]);

  return (
    <>
      <TableRow
        sx={{
          backgroundColor: hasChanges && updating ? "#fff7d6" : "inherit",
        }}
      >
        <TableCell
          sx={{
            fontSize: styles.fontSize,
            pl: styles.fieldMarginLeft,
            width: "20%",
          }}
        >
          {state.open ? (
            <OutlinedInput
              size="small"
              value={state.editableId}
              onChange={(e) => state.setEditableId(e.target.value)}
              onBlur={() => {
                const payload: Partial<RuleRow> =
                  level < 2
                    ? { idBitmap: state.editableId }
                    : { id: state.editableId };
                handleUpdate(payload);
              }}
              sx={{
                fontSize: styles.fontSize,
                width: "100%",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    rowChanges?.id || rowChanges?.idBitmap
                      ? "#f1c232"
                      : "rgba(0, 0, 0, 0.23)",
                  borderRadius: "8px",
                  borderWidth: "2px",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    rowChanges?.id || rowChanges?.idBitmap
                      ? "#d6a300"
                      : "rgba(0, 0, 0, 0.87)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    rowChanges?.id || rowChanges?.idBitmap
                      ? "#f1c232"
                      : "#1976d2",
                },
              }}
            />
          ) : (
            getDisplayId(row)
          )}
        </TableCell>

        <TableCell sx={{ fontSize: styles.fontSize, width: "20%" }}>
          {state.open ? (
            <OutlinedInput
              size="small"
              value={state.editableName}
              onChange={(e) => state.setEditableName(e.target.value)}
              onBlur={() => handleUpdate({ displayName: state.editableName })}
              sx={{
                fontSize: styles.fontSize,
                width: "100%",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: rowChanges?.displayName
                    ? "#f1c232"
                    : "rgba(0, 0, 0, 0.23)",
                  borderRadius: "8px",
                  borderWidth: "2px",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: rowChanges?.displayName
                    ? "#d6a300"
                    : "rgba(0, 0, 0, 0.87)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: rowChanges?.displayName ? "#f1c232" : "#1976d2",
                },
              }}
            />
          ) : (
            row.displayName
          )}
        </TableCell>

        <TableCell sx={{ fontSize: styles.fontSize, width: "20%" }}>
          {state.open ? (
            <OutlinedInput
              size="small"
              value={state.editableField}
              onChange={(e) => state.setEditableField(e.target.value)}
              onBlur={() => handleUpdate({ field: state.editableField })}
              sx={{ fontSize: styles.fontSize, width: "100%" }}
            />
          ) : (
            row.field
          )}
        </TableCell>

        {level === 1 ? (
          <TableCell sx={{ fontSize: styles.fontSize, width: "20%" }}>
            {state.open ? (
              <Select
                size="small"
                value={state.expression}
                onChange={handleExpressionChange}
                sx={{
                  fontSize: styles.fontSize,
                  width: "100%",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: rowChanges?.typeData
                      ? "#f1c232"
                      : "rgba(0, 0, 0, 0.23)",
                    borderRadius: "8px",
                    borderWidth: "2px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: rowChanges?.typeData
                      ? "#d6a300"
                      : "rgba(0, 0, 0, 0.87)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: rowChanges?.typeData ? "#f1c232" : "#1976d2",
                  },
                  "& .MuiSelect-icon": {
                    color: rowChanges?.typeData ? "#a67c00" : "inherit",
                  },
                }}
              >
                {Object.entries(EXPRESSION_MAP).map(([key, label]) => (
                  <MenuItem
                    key={key}
                    value={key}
                    sx={{ fontSize: styles.fontSize }}
                  >
                    {label}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              EXPRESSION_MAP[state.expression]
            )}
          </TableCell>
        ) : (
          <TableCell sx={{ fontSize: styles.fontSize, width: "20%" }}>
            {state.open ? (
              <OutlinedInput
                size="small"
                type="number"
                value={state.editableLength}
                onChange={(e) => state.setEditableLength(+e.target.value)}
                onBlur={() => handleUpdate({ length: state.editableLength })}
                sx={{ fontSize: styles.fontSize, width: "100%" }}
              />
            ) : (
              row.length
            )}
          </TableCell>
        )}

        <TableCell align="center">
          <IconButton
            color="primary"
            onClick={() => state.setOpen(!state.open)}
            size="small"
            disabled={level >= 4}
          >
            {state.open ? (
              <CheckOutlinedIcon
                style={{ color: level < 4 ? "gray" : "#ccc" }}
              />
            ) : (
              <EditNoteOutlinedIcon
                style={{
                  color: level < 4 ? "gray" : "#ccc",
                  fontSize: level >= 4 ? 18 : undefined,
                }}
              />
            )}
          </IconButton>
          {level < 4 && state.open && (
            <IconButton
              color="primary"
              size="small"
              onClick={handleOpenDeleteModal}
            >
              <DeleteOutlinedIcon style={{ color: "gray" }} />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      {canExpand && (
        <TableRow style={{ padding: 0 }}>
          <TableCell style={{ padding: 0 }} colSpan={5}>
            <Collapse in={state.open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 0 }}>
                {level === 1 && (
                  <LevelOneFields
                    id={rowId}
                    state={state}
                    styles={styles}
                    handleUpdate={handleUpdate}
                  />
                )}

                <ChildRulesTable
                  row={row}
                  level={level}
                  maxLevel={maxLevel}
                  childKey={childKey}
                  styles={styles}
                  onSubRuleUpdate={handleSubRuleUpdate}
                  onAddSubRule={onAddSubRule}
                />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
