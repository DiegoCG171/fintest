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
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { activExtractionRules } from "../../../../store/slices/admin/admin.slice";
import { RuleRow } from "../../../../store/slices/extractionsRules/extractionRulesSlice";

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
}: {
  row: RuleRow;
  level?: number;
  maxLevel?: number;
  onUpdate?: (updatedRow: RuleRow) => void;
}) => {
  const [open, setOpen] = useState(false);
  const hasSubRules = row.breakingRules && row.breakingRules.length > 0;
  const canExpand = level < maxLevel;

  const [editableId, setEditableId] = useState(row.idBitmap || row.id || "");
  const [editableName, setEditableName] = useState(row.displayName);
  const [editableField, setEditableField] = useState(row.field);

  const [expresion, setExpresion] = useState("other");
  const [isLenghtVariable, setIsLenghtVariable] = useState(row.isLengthVariable);
  const [posicionesLongitud, setPosicionesLongitud] = useState(row.positionsLength?.finalPos.toString() || "");
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

    setIsLenghtVariable(row.isLengthVariable);
    setPosicionesLongitud(row.positionsLength?.finalPos.toString() || "");
    setExpresion("other");
  }, [row.regex, row.isLengthVariable, row.positionsLength]);

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
    if (row.breakingRules && onUpdate) {
      const newSubRules = [...row.breakingRules];
      newSubRules[index] = updatedSubRule;
      onUpdate({
        ...row,
        idBitmap: editableId,
        displayName: editableName,
        field: editableField,
        typeData: expresion,
        breakingRules: newSubRules,
      });
    }
  };

  return (
    <>
      <TableRow>
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
              sx={{ fontSize: getFontSize(), width: "100%" }}
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
                onChange={(e) => setExpresion(e.target.value)}
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
                value={editableName}
                onChange={(e) => setEditableName(e.target.value)}
                sx={{ fontSize: getFontSize(), width: "100%" }}
              />
            ) : (
              row.length
            )}
          </TableCell>
        )}
        <TableCell align="center">
          {canExpand ? (
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
                            value={posicionesLongitud}
                            onChange={(e) =>
                              setPosicionesLongitud(e.target.value)
                            }
                            label="Posiciones de Longitud"
                            sx={{ fontSize: getFontSize() }}
                          />
                        </FormControl>
                      )}

                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Checkbox
                          size="small"
                          checked={isLenghtVariable}
                          onChange={(e) =>
                            setIsLenghtVariable(e.target.checked)
                          }
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
                      {hasSubRules ? (
                        row.breakingRules!.map((subRule, idx) => (
                          <CollapsibleRow
                            key={idx}
                            row={subRule}
                            level={level + 1}
                            maxLevel={maxLevel}
                            onUpdate={(updated) =>
                              handleSubRuleUpdate(idx, updated)
                            }
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
                          <IconButton color="primary" size="small">
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
  const { updateExtractionRule } = useAppSelector(
    (state) => state.extractionRules
  );

  const [version, setVersion] = useState(updateExtractionRule?.version ?? "");
  const [type, setType] = useState(updateExtractionRule?.type ?? "");
  const [rows, setRows] = useState<RuleRow[]>(
    updateExtractionRule?.fields || []
  );

  useEffect(() => {
    setVersion(updateExtractionRule?.version ?? "");
    setType(updateExtractionRule?.type ?? "");
  }, [updateExtractionRule?.version, updateExtractionRule?.type]);

  useEffect(() => {
    setRows(updateExtractionRule?.fields || []);
  }, [updateExtractionRule]);

  const handleVersionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVersion(e.target.value);
  };

  const handleTypeChange = (e: SelectChangeEvent<string>) => {
    setType(e.target.value);
  };

  const handleRowUpdate = (index: number, updatedRow: RuleRow) => {
    const newRows = [...rows];
    newRows[index] = updatedRow;
    setRows(newRows);
  };

  return (
    <Box sx={MODAL_STYLE}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 500, mb: 1 }}>
            Creación de Reglas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Creación de Reglas / {type.toUpperCase()} V{version}
          </Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            onClick={() => dispatch(activExtractionRules(false))}
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
            inputProps={{ min: 1 }}
          />
        </FormControl>

        <FormControl sx={{ flex: 1 }}>
          <InputLabel id="select-label">Tipo</InputLabel>
          <Select
            labelId="select-label"
            id="select-tipo"
            value={type}
            label="Tipo"
            onChange={handleTypeChange}
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
                <IconButton color="primary">
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
