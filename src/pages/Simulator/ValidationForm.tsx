import {
  Button,
  Checkbox,
  Collapse,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BreakingRule } from "../../interfaces/rule.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { capitalizeFirstLetter } from "../../helper/capitalizeString";

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

const columns = [
  "",
  "Campo",
  "Nombre",
  "Requerido",
  "Función",
  "Parámetro",
  "",
];

const options = {
  idOptions: ["DE-3", "DE-63.Q2", "DE-63.Request"],
  functionOptions: ["Value", "Echo", "Calculated", "De Request"],
  parameterOptions: ["Valor Directo", "DE-37"],
};

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

const SubFieldTable: React.FC<SubFieldTableProps> = ({
  fields,
  breakingRules,
  isOpen,
  parentId,
  setParentRows,
}) => {
  const [editingRow, setEditingRow] = useState<string | null>(null);
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
      <MenuItem
        key={option}
        value={option.toLocaleLowerCase()}
        sx={{ fontSize: "0.6rem" }}
      >
        {option}
      </MenuItem>
    ));

  const handleEdit = (id: string) => {
    setEditingRow(id);
  };

  const handleSave = () => {
    setEditingRow(null);
  };

  return (
    <Collapse in={isOpen} sx={{ padding: isOpen ? "12px" : "0px" }}>
      <TableContainer style={{ overflowY: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow>
              {["Campo", "Nombre", "Función", "Parámetro", ""].map((header) => (
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
                <TableCell
                  align="center"
                  sx={{ width: "20%", ...sxStyles.cellContent }}
                >
                  {field.name}
                </TableCell>
                <TableCell
                  align={editingRow === field.id ? "left" : "center"}
                  sx={{ ...cellStyles, width: "20%" }}
                >
                  {editingRow === field.id ? (
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
                      {renderSelectOptions(options.functionOptions)}
                    </Select>
                  ) : (
                    capitalizeFirstLetter(field.function)
                  )}
                </TableCell>
                <TableCell
                  align={editingRow === field.id ? "left" : "center"}
                  sx={{...cellStyles, width: '20%'}}
                >
                  {editingRow === field.id ? (
                    field.function === "value" ? (
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
                    )
                  ) : (
                    field.parameter
                  )}
                </TableCell>
                <TableCell align="center" sx={{...cellStyles, width: '10%'}}>
                  {editingRow === field.id ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleSave}
                      sx={{
                        // ...selectStyles,
                        fontSize: "0.5rem",
                        width: "auto",
                        height: "16px",
                      }}
                    >
                      Guardar
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEdit(field.id)}
                      sx={{
                        // ...selectStyles,
                        fontSize: "0.5rem",
                        width: "auto",
                        height: "16px",
                        margin: 0,
                      }}
                    >
                      Editar
                    </Button>
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

interface Props {
  setParentRows: Dispatch<SetStateAction<Row[]>>;
}

export const ValidationForm = ({ setParentRows }: Props) => {
  const { rules } = useSelector((state: RootState) => state.rules);
  const { templates } = useSelector((state: RootState) => state.templates);
  const [openFields, setOpenFields] = useState<FieldsState>({});
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

  useEffect(() => {
    const newRows = rules[0].fields.map((field) => {
      const dataRow = templates[0].validationTransaction.find(
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
  }, []);

  useEffect(() => {
    setParentRows(rows);
  }, [rows]);

  const handleChange = <K extends keyof Row>(
    index: number,
    field: K,
    value: Row[K]
  ) => {
    setRows(
      rows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const handleToggle = (id: string) =>
    setOpenFields((prev) => ({ ...prev, [id]: !prev[id] }));

  const renderSelectOptions = (options: string[]) =>
    options.map((option) => (
      <MenuItem
        key={option}
        value={option.toLocaleLowerCase()}
        sx={{ fontSize: "0.6rem" }}
      >
        {option}
      </MenuItem>
    ));

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: {
          xs: "calc(50vh + 2px)",
          xl: "calc(60vh + 2px)",
          lg: "calc(50vh + 2px)",
        },
        overflowY: "auto",
      }}
    >
      <Table stickyHeader aria-label="table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
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
                {columns.includes("Requerido") && (
                  <TableCell align="center" sx={{ padding: 0 }}>
                    <Checkbox
                      disabled={!row.isActive}
                      checked={row.isRequired}
                      onChange={(e) =>
                        handleChange(index, "isRequired", e.target.checked)
                      }
                      size="small"
                    />
                  </TableCell>
                )}
                <TableCell sx={{ ...cellStyles, width: "10%" }}>
                  {row.breakingRules && row.breakingRules!.length === 0 && (
                    <Select
                      disabled={!row.isActive}
                      value={row.function}
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
                      {renderSelectOptions(options.functionOptions)}
                    </Select>
                  )}
                </TableCell>
                <TableCell sx={cellStyles}>
                  {row.breakingRules && row.breakingRules!.length === 0 && (
                    <>
                      {row.function === "value" ? (
                        <TextField
                          disabled={!row.isActive}
                          variant="outlined"
                          value={row.parameter}
                          onChange={(e) =>
                            handleChange(index, "parameter", e.target.value)
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
                            handleChange(index, "parameter", e.target.value)
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
                          {renderSelectOptions(options.parameterOptions)}
                        </Select>
                      )}
                    </>
                  )}
                </TableCell>
                <TableCell style={{ padding: 0 }}>
                  {row.breakingRules && row.breakingRules.length > 0 && (
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
  );
};
