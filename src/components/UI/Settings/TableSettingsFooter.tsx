
import { Box, Typography, TablePagination } from "@mui/material";
import { PaginationData } from "../../../config/interfaces/tableSettings.interface";
import { PAGINATION_OPTIONS } from "../../../config/constants/tableSettings";

interface TableSettingsFooterProps {
  pagination: PaginationData;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TableSettingsFooter = ({ pagination, onPageChange, onRowsPerPageChange }: TableSettingsFooterProps) => (
  <Box
    sx={{
      position: "sticky",
      bottom: 0,
      left: 0,
      right: 0,
      bgcolor: "background.paper",
      borderTop: "1px solid #e0e0e0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      px: 2,
    }}
  >
    <Typography variant="body2" sx={{ fontWeight: "500" }}>
      Resultados por búsqueda: {pagination.total} de {pagination.totalAll}
    </Typography>
    <TablePagination
      rowsPerPageOptions={PAGINATION_OPTIONS}
      component="div"
      count={pagination.total}
      rowsPerPage={pagination.limit}
      page={pagination.page - 1}
      onPageChange={onPageChange}
      showFirstButton
      showLastButton
      onRowsPerPageChange={onRowsPerPageChange}
      labelRowsPerPage="Filas por página:"
      labelDisplayedRows={({ from, to, count }) =>
        `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`
      }
      sx={{
        borderTop: "1px solid #e0e0e0",
        "& .MuiTablePagination-toolbar": {
          paddingLeft: 2,
          paddingRight: 2,
        },
      }}
    />
  </Box>
);