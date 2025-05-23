import { TableCell, TableHead, TableRow } from "@mui/material";

export const TableHeader = ({ keys }: { keys: string[] }) => (
  <TableHead>
    <TableRow>
      {keys.map((key) => (
        <TableCell
          key={key}
          sx={{
            fontWeight: "bold",
            padding: "4px",
            paddingLeft: 4,
            width: key === "fields" ? "40px" : "150px",
            whiteSpace: "nowrap",
          }}
        >
          {key !== "fields" && key.toUpperCase()}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);
