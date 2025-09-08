import { Table, TableBody, TableContainer, Paper } from "@mui/material";
import { TableSettingsHeader } from "./TableSettingsHeader";
import { TableSettingsRows } from "./TableSettingsRows";
import { TableSettingsFooter } from "./TableSettingsFooter";
import { ActionMenu } from "./ActionMenu";
import { useDynamicTable } from "../../../config/hooks/useDynamicTable";

export const DynamicSettingTable = () => {
  const {
    config,
    columns,
    searchTerm,
    pathname,
    anchorEl,
    handleMenuClick,
    handleMenuClose,
    handleEdit,
    handleDelete,
    pagination,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useDynamicTable();

  if (!config || !columns) {
    return <p>No table config for this route</p>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table stickyHeader>
        <TableSettingsHeader columns={columns} />
        <TableBody>
          <TableSettingsRows
            data={config.data}
            columns={columns}
            searchTerm={searchTerm}
            onMenuClick={handleMenuClick}
            pathname={pathname}
          />
        </TableBody>
      </Table>
      <TableSettingsFooter
        pagination={pagination}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ActionMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onEdit={handleEdit}
        onDelete={handleDelete}
        pathname={pathname}
      />
    </TableContainer>
  );
};
