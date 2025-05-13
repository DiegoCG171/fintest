import { IconButton, TableCell, TableRow } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import {
  FormBuilderRowProps,
} from "../../../config/interfaces";
import DynamicField from "./DynamicField";
import { useState } from "react";

function FormBuilderRow({ row, path, tabId, headers }: FormBuilderRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [edited, setEdited] = useState(false)


  return (
    <>
      <TableRow>
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
                <IconButton onClick={() => setEdited(!edited)}>
                  {edited ? (
                    <CheckOutlinedIcon />
                    
                  ) : (
                    <EditNoteOutlinedIcon />
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
              />
            )}
          </TableCell>
        ))}
      </TableRow>

      {expanded && Array.isArray(row.breakingRules) &&
        row.breakingRules.map((child, childIndex) => (
          <FormBuilderRow
            key={child._id}
            row={child}
            path={[...path, childIndex]}
            tabId={tabId}
            headers={headers}
          />
        ))}
    </>
  );
}
export default FormBuilderRow;
