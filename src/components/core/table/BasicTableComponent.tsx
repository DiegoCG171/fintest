import {
  Fragment,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  IconButton,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  BasicTableProps,
  FieldError,
  TableRowData,
} from "../../../config/interfaces";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setActiveMessage } from "../../../store/slices/messages/messages.slice";
import { getBackgroundColorForLevel } from "../../../config/utils/getBackgroundColorForLevel";
import { NestedTable } from "./NestedTable";
import { insertWordBreaks } from "../../../config/utils/table";

function BasicTable({
  initialRows,
  showPagination = false,
  customRenderers = {},
  type = "events",
}: BasicTableProps) {
  const dispatch = useAppDispatch();
  const { activeMessage } = useAppSelector((state) => state.messagesReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [keys, setKeys] = useState<string[]>([]);
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (id: string) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChangePage = (
    _event: unknown,
    newPage: SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSetActiveMessage = (
    id: number | string | undefined,
    message: TableRowData[] | ReactNode | FieldError
  ) => {
    if (type === "events" && Array.isArray(message)) {
      dispatch(setActiveMessage({ data: message, id }));
    }
  };

  const rowsToShow = showPagination
    ? initialRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : initialRows;

  useEffect(() => {
    const dynamicKeys = Object.keys(initialRows[0] || {});
    const filteredKeys =
      type === "events"
        ? dynamicKeys.filter((key) => key !== "fields")
        : dynamicKeys;

    setKeys(filteredKeys);
  }, [initialRows, type]);

  return (
    <Paper sx={{ width: "100%", boxShadow: "none" }}>
      <TableContainer sx={{ height: type === "events" ? "9vh" : "50vh" }}>
        <Table stickyHeader>
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
          <TableBody>
            {rowsToShow.map((row: TableRowData, rowIndex: number) => {
              const rowId = `main-row-${rowIndex}`;
              const fields = row.fields || [];
              const hasFields = Array.isArray(fields) && fields.length > 0;
              const isExpanded = openRows[rowId] || false;

              return (
                <Fragment key={rowIndex}>
                  <TableRow
                    hover={type === "events"}
                    onClick={() =>
                      handleSetActiveMessage(row["ID"], row.fields)
                    }
                    sx={{
                      cursor: type === "events" ? "pointer" : "default",
                      background:
                        activeMessage.id === row["ID"]
                          ? "#efefef"
                          : "transparent",
                    }}
                  >
                    {keys.map((key) => {
                      const cellValue = row[key];
                      const normalizedValue =
                        typeof cellValue === "string" ||
                        typeof cellValue === "number" ||
                        cellValue === null ||
                        cellValue === undefined
                          ? cellValue
                          : typeof cellValue === "bigint"
                          ? Number(cellValue)
                          : String(cellValue);

                      const cellText =
                        normalizedValue != null ? String(normalizedValue) : "";

                      let renderedValue;

                      if (key === "fields" && hasFields) {
                        renderedValue = (
                          <Box display="flex" alignItems="center">
                            <IconButton
                              onClick={() => handleToggle(rowId)}
                              sx={{ p: 0 }}
                            >
                              {isExpanded ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                          </Box>
                        );
                      } else {
                        renderedValue =
                          customRenderers[key]?.(normalizedValue) ??
                          (cellText.length > 25
                            ? insertWordBreaks(cellText)
                            : cellText);
                      }

                      return (
                        <TableCell
                          key={`${rowId}-${key}`}
                          sx={{
                            padding: "8px",
                            paddingLeft: 4,
                            verticalAlign: "center",
                            width: key === "fields" ? "40px" : "20%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 1,
                              whiteSpace: "normal",
                              overflowWrap: "break-word",
                            }}
                          >
                            {renderedValue}
                          </Box>
                        </TableCell>
                      );
                    })}
                  </TableRow>

                  {hasFields && (
                    <TableRow>
                      <TableCell
                        colSpan={keys.length}
                        sx={{
                          py: 0,
                          pl: 0,
                          pr: 0,
                          background: getBackgroundColorForLevel(1),
                        }}
                      >
                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 0 }}>
                            <NestedTable
                              data={fields}
                              customRenderers={customRenderers}
                              level={1}
                            />
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {showPagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
          component="div"
          count={initialRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage=""
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}

export default BasicTable;
