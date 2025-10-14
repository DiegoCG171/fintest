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
import { useState } from "react";

const MODAL_STYLE = {
  position: "relative",
  width: "100%",
  margin: "0 auto",
  p: 4,
  overflowY: "auto",
};

function createData(
  id: string,
  name: string,
  field: string,
  typeData: string,
  subRules?: RuleRow[]
): RuleRow {
  return { id, name, field, typeData, subRules };
}

interface RuleRow {
  id: string;
  name: string;
  field: string;
  typeData: string;
  subRules?: RuleRow[];
}

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
  const hasSubRules = row.subRules && row.subRules.length > 0;
  const canExpand = level < maxLevel;

  const [editableId, setEditableId] = useState(row.id);
  const [editableName, setEditableName] = useState(row.name);
  const [editableField, setEditableField] = useState(row.field);
  const [editableTypeData, setEditableTypeData] = useState(row.typeData);

  const [expresion, setExpresion] = useState("otra");
  const [isLongitudVariable, setIsLongitudVariable] = useState(false);
  const [posicionesLongitud, setPosicionesLongitud] = useState("");

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
    if (row.subRules && onUpdate) {
      const newSubRules = [...row.subRules];
      newSubRules[index] = updatedSubRule;
      onUpdate({
        ...row,
        id: editableId,
        name: editableName,
        field: editableField,
        typeData: editableTypeData,
        subRules: newSubRules,
      });
    }
  };

  return (
    <>
      <TableRow>
        <TableCell sx={{ fontSize: getFontSize(), pl: getMarginLeftFields() }}>
          {open ? (
            <OutlinedInput
              size="small"
              value={editableId}
              onChange={(e) => setEditableId(e.target.value)}
              sx={{ fontSize: getFontSize() }}
            />
          ) : (
            row.id
          )}
        </TableCell>
        <TableCell sx={{ fontSize: getFontSize() }}>
          {open ? (
            <OutlinedInput
              size="small"
              value={editableName}
              onChange={(e) => setEditableName(e.target.value)}
              sx={{ fontSize: getFontSize() }}
            />
          ) : (
            row.name
          )}
        </TableCell>
        <TableCell sx={{ fontSize: getFontSize() }}>
          {open ? (
            <OutlinedInput
              size="small"
              value={editableField}
              onChange={(e) => setEditableField(e.target.value)}
              sx={{ fontSize: getFontSize() }}
            />
          ) : (
            row.field
          )}
        </TableCell>
        <TableCell sx={{ fontSize: getFontSize() }}>
          {open ? (
            <OutlinedInput
              size="small"
              value={editableTypeData}
              onChange={(e) => setEditableTypeData(e.target.value)}
              sx={{ fontSize: getFontSize() }}
            />
          ) : (
            row.typeData
          )}
        </TableCell>
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
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 2,
                      }}
                    >
                      <FormControl size="small" fullWidth>
                        <InputLabel id="expresion-label">
                          Expresión Regular
                        </InputLabel>
                        <Select
                          labelId="expresion-label"
                          label="Expresión Regular"
                          value={expresion}
                          onChange={(e) => setExpresion(e.target.value)}
                          sx={{ fontSize: getFontSize() }}
                        >
                          <MenuItem sx={{ fontSize: getFontSize() }} value="alfanumerico">Alfanumérico</MenuItem>
                          <MenuItem sx={{ fontSize: getFontSize() }} value="alfanumerico_especial">
                            Alfanumérico con Caracteres Especiales
                          </MenuItem>
                          <MenuItem sx={{ fontSize: getFontSize() }} value="numerico">Numérico</MenuItem>
                          <MenuItem sx={{ fontSize: getFontSize() }} value="otra">Otra</MenuItem>
                        </Select>
                      </FormControl>
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
                      {isLongitudVariable && (
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
                          checked={isLongitudVariable}
                          onChange={(e) =>
                            setIsLongitudVariable(e.target.checked)
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
                      {expresion === "otra" && (
                        <FormControl
                          size="small"
                          fullWidth
                          sx={{
                            gridColumn: !isLongitudVariable
                              ? "span 1"
                              : "span 2",
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
                          />
                        </FormControl>
                      )}
                      {!isLongitudVariable && (
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
                            defaultValue="equals"
                            sx={{ fontSize: getFontSize() }}
                          >
                            <MenuItem
                              sx={{ fontSize: getFontSize() }}
                              value="equals"
                            >
                              Igual
                            </MenuItem>
                            <MenuItem
                              sx={{ fontSize: getFontSize() }}
                              value="not_includes"
                            >
                              Incluye
                            </MenuItem>
                            <MenuItem
                              sx={{ fontSize: getFontSize() }}
                              value="includes"
                            >
                              No validar
                            </MenuItem>
                            <MenuItem
                              sx={{ fontSize: getFontSize() }}
                              value="compare_to"
                            >
                              Comparar
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
                          Tipo de Dato
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {hasSubRules ? (
                        row.subRules!.map((subRule, idx) => (
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
                          Tipo de dato...
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
  const [version, setVersion] = useState<number>(1);
  const [type, setType] = useState<string>("pos");

  const [rows, setRows] = useState<RuleRow[]>([
    createData("HD-1", "Header ISO", "hdr.1", "Alfanúmerico", [
      {
        id: "HD-1.1",
        name: "Versión ISO",
        field: "hdr.1.1",
        typeData: "Numérico",
      },
      {
        id: "HD-1.2",
        name: "Longitud mensaje",
        field: "hdr.1.2",
        typeData: "Numérico",
      },
    ]),
    createData("HD-2", "Message Type", "hdr.2", "Numérico", [
      {
        id: "HD-2.1",
        name: "Código MTI",
        field: "hdr.2.1",
        typeData: "Numérico",
      },
    ]),
    createData("HD-3", "Bitmap", "hdr.3", "Hexadecimal", []),
  ]);

  const handleVersionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value));
    setVersion(value);
  };

  const handleTipoChange = (e: SelectChangeEvent<string>) => {
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
          <Button variant="outlined" startIcon={<SaveOutlinedIcon />}>
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
            onChange={handleTipoChange}
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
