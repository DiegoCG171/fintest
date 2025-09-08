
import {
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { EntityType, TableColumn } from "../../../config/interfaces/tableSettings.interface";

interface TableHeaderProps {
  columns: TableColumn<EntityType>[];
}

export const TableSettingsHeader = ({ columns }: TableHeaderProps) => (
  <TableHead>
    <TableRow sx={{ backgroundColor: "#f6f6f6" }}>
      {columns.map((col) => (
        <TableCell key={col.key as string} sx={{ fontWeight: "bold" }}>
          {col.label}
        </TableCell>
      ))}
      <TableCell align="center" sx={{ fontWeight: "bold" }}></TableCell>
    </TableRow>
  </TableHead>
);