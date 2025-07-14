import { IconButton, TableCell, TableRow } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import {
  FormBuilderRowProps,
  TableRowDataFormBuilder,
} from "../../../config/interfaces";
import DynamicField from "./DynamicField";
import { useState } from "react";
import { useAppSelector } from "../../../store";

function FormBuilderRow({
  row,
  path,
  tabId,
  headers,
  canEdit,
}: FormBuilderRowProps) {
  
  const [expanded, setExpanded] = useState(false);
  const [edited, setEdited] = useState(false);
  const levelColors = ["#ffffff", "#f5f7fa", "#eef3f8", "#e4ecf2", "#d6e0eb"];
  const backgroundColor = levelColors[path.length - 1] || "#d6e0eb";

  function getNestedRow(
    rows: TableRowDataFormBuilder[],
    path: number[]
  ): TableRowDataFormBuilder | null {
    let current: TableRowDataFormBuilder | undefined = undefined;
    let currentLevel: TableRowDataFormBuilder[] = rows;

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

    return current ?? null;
  }

  const originalRow = useAppSelector((state) => {
    const originals = state.formBuilder.tabForms[tabId]?.originalValues;
    return getNestedRow(originals, path);
  });

  const hasRowChanges = headers.some((col) => {
    const current = row[col.id];
    const original = originalRow?.[col.id];

    if (col.id === "breakingRules") {
      const currentChildren = Array.isArray(current) ? current : [];
      const originalChildren = Array.isArray(original) ? original : [];

      if (currentChildren.length !== originalChildren.length) return true;

      return currentChildren.some((child, index) => {
        const originalChild = originalChildren[index];
        if (!originalChild) return true;

        return (
          child.idBitmap !== originalChild.idBitmap ||
          child.displayName !== originalChild.displayName ||
          child.value !== originalChild.value ||
          child.function !== originalChild.function ||
          child.isRequired !== originalChild.isRequired
        );
      });
    }
    return current !== original;
  });

  return (
    <>
      <TableRow
        sx={{
          backgroundColor: hasRowChanges ? "#fff7d6" : backgroundColor,
          backgroundColor: hasRowChanges ? "#fff7d6" : backgroundColor,
          "&:hover": {
            backgroundColor: hasRowChanges ? "#ffefbf" : "#dce3e9",
            backgroundColor: hasRowChanges ? "#ffefbf" : "#dce3e9",
          },
          transition: "background-color 0.3s ease",
          transition: "background-color 0.3s ease",
        }}
      >
        {headers.map((col) => (
          <TableCell key={col.id}>
            {col.id === "breakingRules" ? (
              col.id === "breakingRules" &&
              Array.isArray(row.breakingRules) &&
              row.breakingRules.length > 0 ? (
                <IconButton onClick={() => setExpanded(!expanded)}>
                  {expanded ? (
                    <ExpandLessRoundedIcon />
                  ) : (
                    <ExpandMoreRoundedIcon />
                  )}
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    if (canEdit) {
                      setEdited(!edited);
                    }
                  }}
                  sx={{
                    cursor: canEdit ? "pointer" : "default",
                    "&:hover": {
                      backgroundColor: canEdit
                        ? "rgba(0, 0, 0, 0.04)"
                        : "transparent",
                    },
                  }}
                >
                  {edited ? (
                    <CheckOutlinedIcon
                      sx={{ color: canEdit ? "inherit" : "transparent" }}
                    />
                  ) : (
                    <EditNoteOutlinedIcon
                      sx={{ color: canEdit ? "inherit" : "transparent" }}
                    />
                  )}
                </IconButton>
              )
            ) : (
              <DynamicField
                column={col}
                value={row[col.id]}
                row={row}
                path={path}
                tabId={tabId}
                isEditable={edited}
                onlyRead={!canEdit}
              />
            )}
          </TableCell>
        ))}
      </TableRow>

      {expanded &&
        Array.isArray(row.breakingRules) &&
        row.breakingRules.map((child, childIndex) => (
          <FormBuilderRow
            isChild
            key={child._id}
            row={child}
            path={[...path, childIndex]}
            tabId={tabId}
            headers={headers}
            canEdit={canEdit}
          />
        ))}
    </>
  );
}
export default FormBuilderRow;
