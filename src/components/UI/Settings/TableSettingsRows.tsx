// components/TableRows.tsx
import React from "react";
import { TableRow, TableCell } from "@mui/material";
import { ActionsCell } from "./ActionsCell";
import { EntityType, TableColumn } from "../../../config/interfaces/tableSettings.interface";
import { renderCell } from "../../../config/utils/tableSettings.utils";

interface TableSettingsRowsProps {
  data: EntityType[];
  columns: TableColumn<EntityType>[];
  searchTerm?: string;
  onMenuClick: (e: React.MouseEvent<HTMLButtonElement>, item: EntityType) => void;
  pathname: string;
}

export const TableSettingsRows = ({ data, columns, searchTerm = "", onMenuClick, pathname }: TableSettingsRowsProps) => {
  if (data.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={columns.length + 1} align="center">
          Sin datos
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {data.map((row, idx) => (
        <TableRow key={row.id || idx}>
          {columns.map((col) => (
            <TableCell key={col.key as string}>
              {renderCell(col, row, searchTerm)}
            </TableCell>
          ))}
          <ActionsCell 
            item={row} 
            onMenuClick={onMenuClick} 
            pathname={pathname} 
          />
        </TableRow>
      ))}
    </>
  );
};