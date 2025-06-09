import { IconButton, TableCell, TableRow } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { FormBuilderRowProps } from "../../../config/interfaces";
import DynamicField from "./DynamicField";
import { useState } from "react";

function FormBuilderRow({
  row,
  path,
  tabId,
  headers,
  isChild,
  canEdit,
}: FormBuilderRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [edited, setEdited] = useState(false);

  return (
    <>
      <TableRow
        sx={{
          backgroundColor: isChild ? "#fafbfd" : null,
          "&:hover": {
            backgroundColor: "#eaeaea",
          },
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
                  onClick={canEdit ? () => setEdited(!edited) : () => {}}
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
