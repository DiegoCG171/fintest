import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import {
  PropsComplexFormSubTable,
  TableRowData,
} from "../../../config/interfaces";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import { useState } from "react";
import React from "react";
import DynamicField from "../forms/DynamicField";

export default function ComplexFormSubTable({
  data,
  columns,
  parentPath = "items",
}: PropsComplexFormSubTable) {
  const [openRows, setOpenRows] = useState<Set<string>>(new Set());

  const decisionSwitch = (index: string, canEdit?: boolean) => {
    if(canEdit) {
      console.log(index, 'Seleccionar para ediatr')
    } else toggleRow(index)
  }
  
  const toggleRow = (index: string) => {
    setOpenRows((prev) => {
      const updated = new Set(prev);
      if (updated.has(index)) {
        updated.delete(index);
      } else {
        updated.add(index);
      }
      return updated;
    });
  };

  return (
    <>
      {Object.entries(data).map(([id, row]) => {
        const isOpen = openRows.has(id);

        const childColumn = columns.find(
          (col) => col.id === "breakingRules" && row[col.id] && typeof row[col.id] === "object"
        );

        return (
          <React.Fragment key={id}>
            <TableRow>
              {columns.map((col) => {
                const fieldPath = `${parentPath}["${id}"].${col.id}`;
                const isExpandable =
                  col.id === "breakingRules" &&
                  row[col.id] &&
                  typeof row[col.id] === "object";

                return (
                  <TableCell
                    key={col.id}
                    colSpan={isExpandable ? columns.length : 1}
                    sx={{ width: col.width }}
                  >
                    {isExpandable ? (
                      <IconButton size="small">
                        {Object.keys(row[col.id] || {}).length > 0 ? (
                          isOpen ? (
                            <KeyboardArrowUpRoundedIcon onClick={() => decisionSwitch(id)}/>
                          ) : (
                            <KeyboardArrowDownRoundedIcon onClick={() => decisionSwitch(id)} />
                          )
                        ) : <EditNoteRoundedIcon onClick={() => decisionSwitch(id, true)}/>}
                      </IconButton>
                    ) : (
                      <DynamicField name={fieldPath} label={col.label} row={row} column={col} id={id}/>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>

            {isOpen && childColumn && row[childColumn.id] && (
              <TableRow sx={{ p: 0, m: 0 }}>
                <TableCell colSpan={columns.length} sx={{ p: 0 }}>
                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <Table sx={{ p: 0 }}>
                      <TableBody>
                        <ComplexFormSubTable
                          data={row[childColumn.id] as unknown as Record<string, TableRowData>}
                          columns={columns}
                          parentPath={`${parentPath}["${id}"]["${childColumn.id}"]`}
                        />
                      </TableBody>
                    </Table>
                  </Collapse>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}
