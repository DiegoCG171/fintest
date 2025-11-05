import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Collapse,
  Checkbox,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { activExtractionRules } from "../../../../store/slices/admin/admin.slice";
import {
  RuleRow,
  updateRule,
  addSubRule,
  addTopLevelRule,
  setVersionForm,
  setTypeForm,
} from "../../../../store/slices/extractionsRules/extractionRulesSlice";
import {
  createExtractionRuleThunk,
  updateExtractionRulesThunk,
} from "../../../../store/slices/extractionsRules/extractionRules.thunk";
import { useToast } from "../../../../config/hooks/useToast";
import { openConfirmDeleteModal } from "../../../../store/slices/UI/confirmDeleteModal/confirmDeleteModal.slice";

const MODAL_STYLE = {
  position: "relative",
  width: "100%",
  margin: "0 auto",
  p: 4,
  overflowY: "auto",
};

const ExpresionMap: Record<
  "alphanumeric" | "alphanumeric_special" | "numeric" | "other",
  string
> = {
  alphanumeric: "Alfanumérico",
  alphanumeric_special: "Alfanumérico con Caracteres Especiales",
  numeric: "Numérico",
  other: "Otra",
};

const CollapsibleRow = ({
  row,
  level = 1,
  maxLevel = 3,
  onUpdate,
  onAddSubRule,
}: {
  row: RuleRow;
  level?: number;
  maxLevel?: number;
  onUpdate?: (updatedRow: RuleRow) => void;
  onAddSubRule?: (parentId: string) => void;
}) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { changes, updating } = useAppSelector((state) => state.extractionRules);
  const hasChanges = Boolean(changes[row._id || row.id || ""]);
  const childKey = level === 2 ? "specification" : "breakingRules";
  const canExpand = level < maxLevel;

  const [editableId, setEditableId] = useState(row.idBitmap || row.id || "");
  const [editableName, setEditableName] = useState(row.displayName);
  const [editableField, setEditableField] = useState(row.field);
  const [editableLenght, setEditableLenght] = useState(row.length);
  const [editableOperator, setEditableOperator] = useState(row.operator);

  const [expresion, setExpresion] = useState("other");
  const [isLenghtVariable, setIsLenghtVariable] = useState(
    row.isLengthVariable ?? false
  );
  const [positionsLength, setPositionsLength] = useState(
    row.positionsLength?.finalPos.toString() || ""
  );
  const [regex, setRegex] = useState(row.regex || "");

  useEffect(() => {
    if (row.regex === "^[a-zA-Z0-9]+$") {
      setExpresion("alphanumeric");
      return;
    }

    if (row.regex === "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$") {
      setExpresion("alphanumeric_special");
      return;
    }

    if (row.regex === "^[0-9]+$") {
      setExpresion("numeric");
      return;
    }

    setIsLenghtVariable(row.isLengthVariable ?? false);
    setPositionsLength(row.positionsLength?.finalPos.toString() || "");
  }, [row.regex, row.isLengthVariable, row.positionsLength]);

  useEffect(() => {
    if (isLenghtVariable) {
      setEditableOperator("<=");
    }
  }, [isLenghtVariable]);

  const handleChangeExpresion = (e: SelectChangeEvent) => {
    const newExpresion = e.target.value;
    let newRegex = regex;

    if (newExpresion === "alphanumeric") {
      newRegex = "^[a-zA-Z0-9]+$";
    } else if (newExpresion === "alphanumeric_special") {
      newRegex = "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$";
    } else if (newExpresion === "numeric") {
      newRegex = "^[0-9]+$";
    }

    setExpresion(newExpresion);
    setRegex(newRegex);

    handleUpdate({
      typeData: newExpresion,
      regex: newRegex,
    });
  };

  const getFontSize = () => {
    const sizes = ["0.8rem", "0.75rem", "0.7rem", "0.65rem"];
    return sizes[Math.min(level - 1, sizes.length - 1)];
  };

  const getMarginLeft = () => {
    return level * 6;
  };

  const getMarginLeftFields = () => {
    return level * 3;
  };

  const handleSubRuleUpdate = (index: number, updatedSubRule: RuleRow) => {
    if (onUpdate) {
      const childKey = level === 2 ? "specification" : "breakingRules";
      const children = row[childKey] || [];
      const newChildren = [...children];
      newChildren[index] = updatedSubRule;

      onUpdate({
        ...row,
        idBitmap: editableId,
        displayName: editableName,
        field: editableField,
        typeData: expresion,
        [childKey]: newChildren,
      });
    }
  };

  const handleUpdate = (changes: Partial<RuleRow>) => {
    const updatedRow: RuleRow = { ...row, ...changes };
    dispatch(updateRule({ _id: row._id ?? "", updatedRow }));
  };

  const handleOpenDeleteModal = () => {
    if (level > 1) {
      dispatch(openConfirmDeleteModal({ id: row._id, resource: "subRule" }));
      return;
    }

    dispatch(openConfirmDeleteModal({ id: row._id, resource: "topRule" }));
  };

  return (
    <>
      <TableRow
        sx={{
          backgroundColor: hasChanges && updating ? "#fff7d6" : "inherit",
        }}
      >
        <TableCell
          sx={{
            fontSize: getFontSize(),
            pl: getMarginLeftFields(),
            width: "20%",
          }}
        >
          {open ? (
            <OutlinedInput
              size="small"
              value={editableId}
              onChange={(e) => setEditableId(e.target.value)}
              onBlur={() => {
                const payload: Partial<RuleRow> =
                  level < 2 ? { idBitmap: editableId } : { id: editableId };

                handleUpdate(payload);
              }}
              sx={{ fontSize: getFontSize(), width: "100%" }}
            />
          ) : (
            row.idBitmap || row.id
          )}
        </TableCell>
        <TableCell sx={{ fontSize: getFontSize(), width: "20%" }}>
          {open ? (
            <OutlinedInput
              size="small"
              value={editableName}
              onChange={(e) => setEditableName(e.target.value)}
              onBlur={() => handleUpdate({ displayName: editableName })}
              sx={{
                fontSize: getFontSize(),
                width: "100%",
              }}
            />
          ) : (
            row.displayName
          )}
        </TableCell>
        <TableCell sx={{ fontSize: getFontSize(), width: "20%" }}>
          {open ? (
            <OutlinedInput
              size="small"
              value={editableField}
              onChange={(e) => setEditableField(e.target.value)}
              onBlur={() => handleUpdate({ field: editableField })}
              sx={{ fontSize: getFontSize(), width: "100%" }}
            />
          ) : (
            row.field
          )}
        </TableCell>
        {level == 1 && (
          <TableCell sx={{ fontSize: getFontSize(), width: "20%" }}>
            {open ? (
              <Select
                labelId="expresion-label"
                size="small"
                value={expresion}
                onChange={handleChangeExpresion}
                sx={{ fontSize: getFontSize(), width: "100%" }}
              >
                <MenuItem sx={{ fontSize: getFontSize() }} value="alphanumeric">
                  Alfanumérico
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: getFontSize() }}
                  value="alphanumeric_special"
                >
                  Alfanumérico con Caracteres Especiales
                </MenuItem>
                <MenuItem sx={{ fontSize: getFontSize() }} value="numeric">
                  Numérico
                </MenuItem>
                <MenuItem sx={{ fontSize: getFontSize() }} value="other">
                  Otra
                </MenuItem>
              </Select>
            ) : (
              ExpresionMap[expresion as keyof typeof ExpresionMap]
            )}
          </TableCell>
        )}
        {level > 1 && (
          <TableCell sx={{ fontSize: getFontSize(), width: "20%" }}>
            {open ? (
              <OutlinedInput
                size="small"
                type="number"
                value={editableLenght}
                onChange={(e) => setEditableLenght(+e.target.value)}
                onBlur={() => handleUpdate({ length: editableLenght })}
                sx={{ fontSize: getFontSize(), width: "100%" }}
              />
            ) : (
              row.length
            )}
          </TableCell>
        )}
        <TableCell align="center">
          {level < 4 ? (
            <IconButton
              color="primary"
              onClick={() => setOpen(!open)}
              size="small"
            >
              {open ? (
                <CheckOutlinedIcon style={{ color: "gray" }} />
              ) : (
                <EditNoteOutlinedIcon style={{ color: "gray" }} />
              )}
            </IconButton>
          ) : (
            <IconButton color="primary" size="small" disabled>
              <EditNoteOutlinedIcon style={{ color: "#ccc", fontSize: 18 }} />
            </IconButton>
          )}
          {level < 4 && open && (
            <IconButton
              color="primary"
              onClick={() => setOpen(!open)}
              size="small"
            >
              <DeleteOutlinedIcon
                onClick={handleOpenDeleteModal}
                style={{ color: "gray" }}
              />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      {canExpand && (
        <TableRow style={{ paddingBottom: 0, paddingTop: 0, padding: 0 }}>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0, padding: 0 }}
            colSpan={5}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 0 }}>
                {level === 1 && (
                  <Box
                    sx={{ display: "grid", gap: 2, px: getMarginLeft(), py: 2 }}
                  >
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 2,
                      }}
                    >
                      <FormControl size="small" fullWidth>
                        <InputLabel
                          htmlFor="longitud-input"
                          sx={{ fontSize: getFontSize() }}
                        >
                          Longitud de Campo
                        </InputLabel>
                        <OutlinedInput
                          id="longitud-input"
                          type="number"
                          placeholder="5"
                          label="Longitud de Campo"
                          value={editableLenght}
                          onChange={(e) => setEditableLenght(+e.target.value)}
                          onBlur={() =>
                            handleUpdate({ length: editableLenght })
                          }
                          sx={{ fontSize: getFontSize() }}
                        />
                      </FormControl>
                      {isLenghtVariable && (
                        <FormControl size="small" fullWidth>
                          <InputLabel
                            htmlFor="posiciones-input"
                            sx={{ fontSize: getFontSize() }}
                          >
                            Posiciones de Longitud
                          </InputLabel>
                          <OutlinedInput
                            id="posiciones-input"
                            placeholder="1-3,5-7"
                            type="number"
                            value={positionsLength}
                            onChange={(e) => setPositionsLength(e.target.value)}
                            label="Posiciones de Longitud"
                            sx={{ fontSize: getFontSize() }}
                            onBlur={() =>
                              handleUpdate({
                                positionsLength: {
                                  initPos: 0,
                                  finalPos: +positionsLength,
                                },
                              })
                            }
                          />
                        </FormControl>
                      )}

                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Checkbox
                          size="small"
                          checked={isLenghtVariable}
                          onChange={(e) => {
                            const newValue = e.target.checked;
                            setIsLenghtVariable(newValue);
                            handleUpdate({ isLengthVariable: newValue });
                          }}
                          sx={{ fontSize: getFontSize() }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ whiteSpace: "nowrap", fontSize: getFontSize() }}
                        >
                          Longitud variable
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 2,
                      }}
                    >
                      {expresion === "other" && (
                        <FormControl
                          size="small"
                          fullWidth
                          sx={{
                            gridColumn: !isLenghtVariable ? "span 1" : "span 2",
                          }}
                        >
                          <InputLabel
                            sx={{ fontSize: getFontSize() }}
                            htmlFor="regex-input"
                          >
                            Regex
                          </InputLabel>
                          <OutlinedInput
                            id="regex-input"
                            placeholder="^ISO\\d{3}$"
                            label="Regex"
                            sx={{ fontSize: getFontSize() }}
                            value={regex}
                            onChange={(e) => setRegex(e.target.value)}
                            onBlur={() => handleUpdate({ regex: regex })}
                          />
                        </FormControl>
                      )}
                      {!isLenghtVariable && (
                        <FormControl size="small" fullWidth>
                          <InputLabel
                            sx={{ fontSize: getFontSize() }}
                            id="operador-label"
                          >
                            Operador
                          </InputLabel>
                          <Select
                            labelId="operador-label"
                            label="Operador"
                            defaultValue="=="
                            sx={{ fontSize: getFontSize() }}
                            value={editableOperator}
                            onChange={(e) =>
                              setEditableOperator(e.target.value)
                            }
                            onBlur={() =>
                              handleUpdate({ operator: editableOperator })
                            }
                          >
                            <MenuItem
                              sx={{ fontSize: getFontSize() }}
                              value="=="
                            >
                              Exactamente Igual
                            </MenuItem>
                            <MenuItem
                              sx={{ fontSize: getFontSize() }}
                              value="<="
                            >
                              Menor o Igual que
                            </MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    </Box>
                  </Box>
                )}

                <TableContainer
                  sx={{
                    tableLayout: "fixed",
                    width: "100%",
                    borderRadius: 0,
                    py: 2,
                  }}
                >
                  <Table
                    size="small"
                    sx={{ tableLayout: "fixed", width: "100%" }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            fontSize: getFontSize(),
                            pl: getMarginLeft(),
                          }}
                        >
                          Id
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", fontSize: getFontSize() }}
                        >
                          Nombre
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", fontSize: getFontSize() }}
                        >
                          Campo
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", fontSize: getFontSize() }}
                        >
                          Longitud
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(row[childKey] || []).length > 0 ? (
                        row[childKey]!.map((subRule, idx) => (
                          <CollapsibleRow
                            key={idx}
                            row={subRule}
                            level={level + 1}
                            maxLevel={maxLevel}
                            onUpdate={(updated) =>
                              handleSubRuleUpdate(idx, updated)
                            }
                            onAddSubRule={onAddSubRule}
                          />
                        ))
                      ) : (
                        <TableRow></TableRow>
                      )}
                      <TableRow>
                        <TableCell
                          sx={{
                            color: "gray",
                            fontStyle: "italic",
                            fontSize: getFontSize(),
                            px: getMarginLeft(),
                          }}
                        >
                          Id...
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "gray",
                            fontStyle: "italic",
                            fontSize: getFontSize(),
                          }}
                        >
                          Nombre...
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "gray",
                            fontStyle: "italic",
                            fontSize: getFontSize(),
                          }}
                        >
                          Campo...
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "gray",
                            fontStyle: "italic",
                            fontSize: getFontSize(),
                          }}
                        >
                          Longitud...
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() =>
                              onAddSubRule?.(row._id || row.id || "")
                            }
                          >
                            <LibraryAddOutlinedIcon
                              style={{
                                color: "gray",
                                fontSize: level === 1 ? 20 : 18,
                              }}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default function RulesEditPage() {
  const dispatch = useAppDispatch();
  const { updateExtractionRule, updating, changes } = useAppSelector(
    (state) => state.extractionRules
  );
  const { showToast } = useToast();

  const [version, setVersion] = useState(updateExtractionRule?.version ?? "");
  const [type, setType] = useState(updateExtractionRule?.type ?? "");
  const [rows, setRows] = useState<RuleRow[]>(
    updateExtractionRule?.fields || []
  );

  const ruleId = updateExtractionRule?.uuid || "root";
  const hasVersionChanges = changes?.[ruleId]?.["version"] !== undefined;
  const hasTypeChanges = changes?.[ruleId]?.["type"] !== undefined;

  const findRuleById = (rules: RuleRow[], id: string): RuleRow | null => {
    for (const rule of rules) {
      if (rule._id === id || rule.id === id) return rule;

      const breakingFound =
        rule.breakingRules && findRuleById(rule.breakingRules, id);
      if (breakingFound) return breakingFound;

      const specificationFound =
        rule.specification && findRuleById(rule.specification, id);
      if (specificationFound) return specificationFound;
    }
    return null;
  };

  const handleAddSubRule = (parentId: string) => {
    const parent = findRuleById(rows, parentId);
    if (!parent) return;

    const level = (parent.idBitmap || parent.id || "").split(".").length;
    const childKey = level >= 2 ? "specification" : "breakingRules";

    const siblings = parent[childKey] || [];

    const parentIdBitmap = parent.idBitmap || parent.id || "";
    let nextNumber = 1;

    if (siblings.length > 0) {
      const existingNumbers = siblings
        .map((s) => {
          const parts = (s.idBitmap || s.id || "").split(".");
          const lastPart = parts[parts.length - 1];
          return parseInt(lastPart, 10);
        })
        .filter((n) => !isNaN(n));

      nextNumber =
        existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
    }

    const newSubRuleBreakingRules: RuleRow = {
      _id: `new-${Date.now()}`,
      id: `${parentIdBitmap}.${nextNumber}`,
      displayName: "Nueva Subregla",
      field: "",
      length: 1,
      typeData: "other",
      specification: [],
    };

    const newSubRuleSpecification: RuleRow = {
      _id: `new-${Date.now()}`,
      id: `${parentIdBitmap}.${nextNumber}`,
      displayName: "Nueva Subregla",
      field: "",
      length: 1,
      typeData: "other",
    };

    dispatch(
      addSubRule({
        parentId,
        newRule: level >= 2 ? newSubRuleSpecification : newSubRuleBreakingRules,
      })
    );
  };

  const handleAddTopLevelRule = () => {
    let nextNumber = 1;
    if (rows.length > 0) {
      const existingNumbers = rows
        .map((r) => {
          const parts = (r.idBitmap || r.id || "").split(".");
          const firstPart = parts[0];
          const match = firstPart.match(/-(\d+)$/);
          return match ? parseInt(match[1], 10) : 0;
        })
        .filter((n) => !isNaN(n) && n > 0);

      nextNumber =
        existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
    }

    const prefix = type === "pos" ? "HD" : "DE";

    const newRule: RuleRow = {
      _id: `new-${Date.now()}`,
      idBitmap: `${prefix}-${nextNumber}`,
      displayName: "Nueva Regla",
      field: "",
      typeData: "other",
      length: 0,
      isLengthVariable: false,
      regex: "",
      operator: "==",
      breakingRules: [],
    };

    dispatch(addTopLevelRule(newRule));
  };

  useEffect(() => {
    setVersion(updateExtractionRule?.version ?? "");
    setType(updateExtractionRule?.type ?? "");
  }, [updateExtractionRule?.version, updateExtractionRule?.type]);

  useEffect(() => {
    setRows(updateExtractionRule?.fields || []);
  }, [updateExtractionRule]);

  const handleVersionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVersion(+e.target.value);
  };

  const handleTypeChange = (e: SelectChangeEvent<string>) => {
    setType(e.target.value);
  };

  const handleRowUpdate = (index: number, updatedRow: RuleRow) => {
    const newRows = [...rows];
    newRows[index] = updatedRow;
    setRows(newRows);
  };

  const updateRules = async () => {
    dispatch(activExtractionRules(false));

    try {
      if (updating) {
        await dispatch(
          updateExtractionRulesThunk(updateExtractionRule.uuid)
        ).unwrap();
        showToast("Regla actualizada correctamente", "success");
      } else {
        await dispatch(createExtractionRuleThunk()).unwrap();
        showToast("Regla creada correctamente", "success");
      }
    } catch (error) {
      console.error("Error al guardar la regla:", error);
      showToast(
        typeof error === "string"
          ? error
          : "Ocurrió un error al guardar la regla",
        "error"
      );
    }
  };

  return (
    <Box sx={MODAL_STYLE}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 500, mb: 1 }}>
            {updating ? "Actualización de Reglas" : "Creación de Reglas"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {updating ? "Actualización de Reglas" : "Creación de Reglas"} /{" "}
            {type.toUpperCase()} V{version}
          </Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            onClick={updateRules}
            startIcon={<SaveOutlinedIcon />}
          >
            Guardar
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
        <FormControl sx={{ flex: 1 }}>
          <InputLabel htmlFor="input-number">Versión</InputLabel>
          <OutlinedInput
            id="input-number"
            type="number"
            label="Versión"
            value={version}
            onChange={handleVersionChange}
            onBlur={(e) => dispatch(setVersionForm(+e.target.value))}
            inputProps={{ min: 1 }}
            sx={{
              "& .MuiOutlinedInput-input": {
                backgroundColor: hasVersionChanges && updating
                  ? "#fff7d6"
                  : "inherit",
              },
            }}
          />
        </FormControl>
        <FormControl
          sx={{
            flex: 1,
          }}
        >
          <InputLabel id="select-label">Tipo</InputLabel>
          <Select
            labelId="select-label"
            id="select-tipo"
            value={type}
            label="Tipo"
            onChange={handleTypeChange}
            onBlur={(e) => dispatch(setTypeForm(e.target.value))}
            sx={{
              "& .MuiSelect-select": {
                backgroundColor: hasTypeChanges && updating
                  ? "#fff7d6"
                  : "inherit",
              },
            }}
          >
            <MenuItem value={"pos"}>POS</MenuItem>
            <MenuItem value={"atm"}>ATM</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f6f6f6" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Campo</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tipo de Dato</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <CollapsibleRow
                key={index}
                row={row}
                onUpdate={(updated) => handleRowUpdate(index, updated)}
                onAddSubRule={handleAddSubRule}
              />
            ))}
            <TableRow>
              <TableCell sx={{ color: "gray", fontStyle: "italic" }}>
                Id...
              </TableCell>
              <TableCell sx={{ color: "gray", fontStyle: "italic" }}>
                Nombre...
              </TableCell>
              <TableCell sx={{ color: "gray", fontStyle: "italic" }}>
                Campo...
              </TableCell>
              <TableCell sx={{ color: "gray", fontStyle: "italic" }}>
                Tipo de dato...
              </TableCell>
              <TableCell align="center">
                <IconButton color="primary" onClick={handleAddTopLevelRule}>
                  <LibraryAddOutlinedIcon style={{ color: "gray" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
