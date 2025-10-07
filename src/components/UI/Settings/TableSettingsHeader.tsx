import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from "@mui/material";
import { EntityType, TableColumn } from "../../../config/interfaces/tableSettings.interface";

interface TableHeaderProps {
  columns: TableColumn<EntityType>[];
  order: "asc" | "desc";
  sortBy: string;
  onRequestSort: (property: string) => void;
}

export const TableSettingsHeader = ({
  columns,
  order,
  sortBy,
  onRequestSort,
}: TableHeaderProps) => {
  const createSortHandler = (property: string) => () => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: "#f6f6f6" }}>
        {columns.map((col) => (
          <TableCell
            key={col.key as string}
            sx={{ fontWeight: "bold" }}
            sortDirection={sortBy === col.key ? order : false}
          >
            {col.sortable ? (
              <TableSortLabel
                active={sortBy === col.key}
                direction={sortBy === col.key ? order : "asc"}
                onClick={createSortHandler(col.key as string)}
              >
                {col.label}
              </TableSortLabel>
            ) : (
              col.label
            )}
          </TableCell>
        ))}
        <TableCell align="center" sx={{ fontWeight: "bold" }} />
      </TableRow>
    </TableHead>
  );
};
