import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Paper,
  Box,
  Tab,
  Checkbox,
  Breadcrumbs,
  Typography,
  TextField,
  IconButton,
  Collapse,
  Snackbar,
  Alert,
  SnackbarCloseReason,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import LoadingButton from "@mui/lab/LoadingButton";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { BreakingRule } from "../../interfaces/rule.interface";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import { startUpdateTemplate } from "../../store/templates/templatesSlice";
import { onToggleGeneralLoading } from "../../store/ui/uiSlice";
// import { TableComponents, TableVirtuoso } from "react-virtuoso";

interface Row {
  id: string;
  function: string;
  isActive: boolean;
  parameter: string;
  isRequired: boolean;
  name: string;
  breakingRules?: BreakingRule[] | null;
  fields?: any[];
}

const options = {
  idOptions: ["DE-3", "DE-63.Q2", "DE-63.Request"],
  functionOptions: ["value", "echo", "calculated", "De Request"],
  parameterOptions: ["Valor Directo", "DE-37"],
};

const cellStyles = { fontSize: "0.6rem", padding: "0px 8px" };
const selectStyles = {
  fontSize: "0.6rem",
  width: "100%",
  padding: "0px",
  height: "24px",
};

const sxStyles = {
  cellSmall: { padding: "2px 8px", fontSize: "0.6rem" },
  cellContent: { padding: "8px", fontSize: "0.6rem" },
  tableContainer: { height: "50vh" },
  iconSmall: { width: 12, height: 12 },
};

export interface FieldField {
  idBitmap?: string;
  value: string;
  displayName?: string;
  id?: string;
}

interface SubFieldTableProps {
  fields: any[] | undefined;
  breakingRules: BreakingRule[];
  isOpen: boolean;
  parentId?: string;
  setParentRows?: Dispatch<SetStateAction<Row[]>>;
}

type FieldsState = {
  [key: string]: boolean;
};

const tabList = [
  {
    key: "validationTransaction",
    label: "Validación",
    columns: ["", "Campo", "Nombre", "Requerido", "Función", "Parámetro", ""],
  },
  {
    key: "generationTransaction",
    label: "Generación",
    columns: ["", "Campo", "Nombre", "Función", "Parámetro", ""],
  },
];


const SubFieldTable: React.FC<SubFieldTableProps> = ({
  fields,
  breakingRules,
  isOpen,
  parentId,
  setParentRows,
}) => {
  const [rows, setRows] = useState<Row[]>(
    breakingRules.map((rule) => {
      const dataRow = fields?.find((field) => field.idBitmap === rule.id);
      return {
        isRequired: dataRow?.isRequired || false,
        isActive: dataRow ? true : false,
        function: dataRow?.function || "echo",
        parameter: dataRow?.value || "",
        id: rule.id,
        name: rule.displayName,
      };
    })
  );

  const handleChange = <K extends keyof Row>(
    index: number,
    field: K,
    value: Row[K]
  ) => {
    setRows(
      rows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  useEffect(() => {
    if (setParentRows) {
      setParentRows((prevRows) =>
        prevRows.map((row) =>
          row.id === parentId
            ? {
                ...row,
                fields: rows.map((row) => ({
                  isRequired: row.isRequired,
                  isActive: row.isActive,
                  function: row.function,
                  value: row.function === "echo" ? "" : row.parameter,
                  idBitmap: row.id,
                  displayName: row.name,
                })),
              }
            : row
        )
      );
    }
  }, [rows, parentId]);

  useEffect(() => {
    const newRows = breakingRules.map((rule) => {
      const dataRow = fields?.find((field) => field.idBitmap === rule.id);
      return {
        isRequired: dataRow?.isRequired || false,
        isActive: dataRow ? true : false,
        function: dataRow?.function || "echo",
        parameter: dataRow?.value || "",
        id: rule.id,
        name: rule.displayName,
      };
    });
    setRows(newRows);
  }, [isOpen]);

  const renderSelectOptions = (options: string[]) =>
    options.map((option) => (
      <MenuItem key={option} value={option} sx={{ fontSize: "0.6rem" }}>
        {option}
      </MenuItem>
    ));

  return (
    <Collapse in={isOpen} sx={{ padding: isOpen ? "12px" : "0px" }}>
      <TableContainer style={{ overflowY: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow>
              {["Campo", "Nombre", "Función", "Parámetro"].map((header) => (
                <TableCell align="center" key={header} sx={sxStyles.cellSmall}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell
                  align="center"
                  sx={{ width: "10%", ...sxStyles.cellContent }}
                >
                  {field.id}
                </TableCell>
                <TableCell sx={{ width: "20%", ...sxStyles.cellContent }}>
                  {field.name}
                </TableCell>
                <TableCell sx={{ ...cellStyles, width: "30%" }}>
                  <Select
                    value={field.function}
                    onChange={(e) =>
                      handleChange(index, "function", e.target.value)
                    }
                    displayEmpty
                    sx={selectStyles}
                  >
                    <MenuItem value="">
                      <em style={{ fontSize: "0.6rem" }}>
                        Selecciona una Función
                      </em>
                    </MenuItem>
                    {renderSelectOptions(["value", "echo", "De Request"])}
                  </Select>
                </TableCell>
                <TableCell sx={cellStyles}>
                  {field.function === "value" ? (
                    <TextField
                      value={field.parameter}
                      onChange={(e) =>
                        handleChange(index, "parameter", e.target.value)
                      }
                      variant="outlined"
                      size="small"
                      sx={{
                        ...selectStyles,
                        height: "24px",
                        "& .MuiInputBase-root": {
                          height: "24px",
                          fontSize: "0.6rem",
                        },
                      }}
                    />
                  ) : (
                    <Select
                      value={field.parameter}
                      displayEmpty
                      disabled={field.function === "echo"}
                      sx={selectStyles}
                    >
                      <MenuItem value="">
                        <em style={{ fontSize: "0.6rem" }}>
                          Selecciona un Parámetro
                        </em>
                      </MenuItem>
                      {renderSelectOptions(options.parameterOptions)}
                    </Select>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Collapse>
  );
};

const TableComponent = ({ breadcrumbs }: { breadcrumbs: string[] }) => {
  const dispatch: AppDispatch = useDispatch();
  const { rules } = useSelector((state: RootState) => state.rules);
  const { templates } = useSelector((state: RootState) => state.templates);
  const [openFields, setOpenFields] = useState<FieldsState>({});
  const [tabValue, setTabValue] = useState("validationTransaction");
  const [loadingButton, setLoadingButton] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleToggle = (id: string) =>
    setOpenFields((prev) => ({ ...prev, [id]: !prev[id] }));

  const [rows, setRows] = useState<Row[]>(
    rules[0].fields.map((rule) => ({
      isRequired: false,
      isActive: false,
      function: "echo",
      parameter: "",
      id: rule.idBitmap,
      name: rule.displayName,
      breakingRules: rule.breakingRules,
    }))
  );

  const handleChange = <K extends keyof Row>(
    index: number,
    field: K,
    value: Row[K]
  ) => {
    setRows(
      rows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const renderSelectOptions = useMemo(
    () => (options: string[]) =>
      options.map((option) => (
        <MenuItem key={option} value={option} sx={{ fontSize: "0.6rem" }}>
          {option}
        </MenuItem>
      )),
    [options]
  );

  useEffect(() => {
    const selectedTransition =
      tabValue === "validationTransaction"
        ? templates[0].validationTransaction
        : templates[0].generationTransaction;

    const newRows = rules[0].fields.map((field) => {
      const dataRow = selectedTransition.find(
        (row) => row.idBitmap === field.idBitmap
      );
      return {
        isRequired: dataRow ? true : false,
        isActive: dataRow ? true : false,
        function: dataRow?.function || "echo",
        parameter: dataRow?.value || "",
        id: field.idBitmap,
        name: field.displayName,
        breakingRules: field.breakingRules || [],
        fields: dataRow?.fields || [],
      };
    });
    setRows(newRows);
    setTimeout(() => {
      dispatch(onToggleGeneralLoading(false));
    }, 3000);
  }, [tabValue]);

  useEffect(() => {
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        parameter: row.function === "echo" ? "" : row.parameter,
      }))
    );
  }, [rules]);

  const handleSaveRules = () => {
    setLoadingButton(true);
    const activeRows = rows.filter((row) => row.isActive);

    const updatedTransaction = activeRows.map((row) => ({
      isRequired: row.isRequired,
      isActive: row.isActive,
      function: row.function,
      value: row.parameter,
      idBitmap: row.id,
      fields: row.fields,
    }));

    const transactionKey =
      tabValue === "validationTransaction"
        ? "validationTransaction"
        : "generationTransaction";
    dispatch(
      startUpdateTemplate({
        id: templates[0]._id,
        template: {
          [transactionKey]: updatedTransaction,
        },
      })
    );

    setTimeout(() => {
      setLoadingButton(false);
      setOpen(true);
    }, 3000);
  };

  const handleClose = (
    _?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      sx={{ border: "1px solid #ccc", borderRadius: "4px" }}
    >
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Los cambios han sido guardados exitosamente.
        </Alert>
      </Snackbar>
      <div
        style={{
          padding: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ my: 0, mx: 0.5 }}>
          {breadcrumbs?.map((breadcrumb, i) => (
            <Typography key={breadcrumb} sx={{ fontSize: "0.8rem" }}>
              {breadcrumbs.length - 1 === i ? (
                <p style={{ color: "#cd201b", fontWeight: "500" }}>
                  {breadcrumb}
                </p>
              ) : (
                breadcrumb
              )}
            </Typography>
          ))}
        </Breadcrumbs>
        <div>
          <LoadingButton
            size="small"
            sx={{
              fontSize: "0.7rem",
            }}
            onClick={handleSaveRules}
            startIcon={<SaveIcon sx={{ width: "0.8rem" }} />}
            variant="contained"
            loading={loadingButton}
            loadingPosition="start"
          >
            Guardar
          </LoadingButton>
        </div>
      </div>
      <TabContext value={tabValue}>
        <Box sx={{ borderColor: "divider" }}>
          <TabList
            onChange={(_, newValue) => {
              dispatch(onToggleGeneralLoading(true));
              setOpenFields((prev) => {
                const allFalse = Object.keys(prev).reduce((acc, key) => {
                  acc[key] = false;
                  return acc;
                }, {} as FieldsState);
                return allFalse;
              });
              setTabValue(newValue);
            }}
            sx={{ minHeight: 20 }}
          >
            {tabList.map((tab) => (
              <Tab
                key={tab.key}
                sx={{ minHeight: 8, padding: 1, fontSize: "0.6rem" }}
                label={tab.label}
                value={tab.key}
              />
            ))}
          </TabList>
        </Box>
        {tabList.map((tab) => (
          <TabPanel key={tab.key} sx={{ padding: 0 }} value={tab.key}>
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: { xl: "calc(60vh + 2px)", lg: "calc(50vh + 2px)" },
                overflowY: "auto",
              }}
            >
              <Table stickyHeader aria-label="table">
                <TableHead>
                  <TableRow>
                    {tab.columns.map((column) => (
                      <TableCell
                        align="center"
                        sx={{
                          width: "5%",
                          padding: "1px 10px",
                          fontSize: "0.6rem",
                        }}
                      >
                        {column}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <React.Fragment key={row.id}>
                      <TableRow>
                        <TableCell align="center" sx={{ padding: 0 }}>
                          <Checkbox
                            sx={{
                              "& .MuiCheckbox-root": {
                                height: "8px !important",
                              },
                            }}
                            checked={row.isActive}
                            onChange={(e) =>
                              handleChange(index, "isActive", e.target.checked)
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center" sx={cellStyles}>
                          {row.id}
                        </TableCell>
                        <TableCell sx={cellStyles}>{row.name}</TableCell>
                        {tab.columns.includes("Requerido") && (
                          <TableCell align="center" sx={{ padding: 0 }}>
                            <Checkbox
                              disabled={!row.isActive}
                              checked={row.isRequired}
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "isRequired",
                                  e.target.checked
                                )
                              }
                              size="small"
                            />
                          </TableCell>
                        )}
                        <TableCell sx={{ ...cellStyles, width: "10%" }}>
                          {row.breakingRules &&
                            row.breakingRules!.length === 0 && (
                              <Select
                                disabled={!row.isActive}
                                value={row.function}
                                onChange={(e) =>
                                  handleChange(
                                    index,
                                    "function",
                                    e.target.value
                                  )
                                }
                                displayEmpty
                                sx={selectStyles}
                              >
                                <MenuItem value="">
                                  <em style={{ fontSize: "0.6rem" }}>
                                    Selecciona una Función
                                  </em>
                                </MenuItem>
                                {renderSelectOptions(options.functionOptions)}
                              </Select>
                            )}
                        </TableCell>
                        <TableCell sx={cellStyles}>
                          {row.breakingRules &&
                            row.breakingRules!.length === 0 && (
                              <>
                                {row.function === "value" ? (
                                  <TextField
                                    disabled={!row.isActive}
                                    variant="outlined"
                                    value={row.parameter}
                                    onChange={(e) =>
                                      handleChange(
                                        index,
                                        "parameter",
                                        e.target.value
                                      )
                                    }
                                    size="small"
                                    sx={{
                                      ...selectStyles,
                                      height: "24px",
                                      "& .MuiInputBase-root": {
                                        height: "24px",
                                        fontSize: "0.6rem",
                                      },
                                    }}
                                  />
                                ) : (
                                  <Select
                                    value={row.parameter}
                                    onChange={(e) =>
                                      handleChange(
                                        index,
                                        "parameter",
                                        e.target.value
                                      )
                                    }
                                    displayEmpty
                                    disabled={row.function === "echo"}
                                    sx={selectStyles}
                                  >
                                    <MenuItem value="">
                                      <em style={{ fontSize: "0.6rem" }}>
                                        Selecciona un Parámetro
                                      </em>
                                    </MenuItem>
                                    {renderSelectOptions(
                                      options.parameterOptions
                                    )}
                                  </Select>
                                )}
                              </>
                            )}
                        </TableCell>
                        <TableCell style={{ padding: 0 }}>
                          {row.breakingRules &&
                            row.breakingRules.length > 0 && (
                              <IconButton onClick={() => handleToggle(row.id)}>
                                {openFields[row.id] ? (
                                  <ExpandLessIcon sx={sxStyles.iconSmall} />
                                ) : (
                                  <ExpandMoreIcon sx={sxStyles.iconSmall} />
                                )}
                              </IconButton>
                            )}
                        </TableCell>
                      </TableRow>
                      {row.breakingRules && row.breakingRules.length > 0 && (
                        <TableRow>
                          <TableCell colSpan={12} sx={{ padding: "0px" }}>
                            {openFields[row.id] && (
                              <SubFieldTable
                                fields={row.fields}
                                breakingRules={row.breakingRules}
                                isOpen={!!openFields[row.id]}
                                parentId={row.id}
                                setParentRows={setRows}
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default TableComponent;
