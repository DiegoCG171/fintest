import { useCallback, useEffect, useState } from "react";
import { useToast } from "../../../../config/hooks/useToast";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { addSubRule, addTopLevelRule, RuleRow, setTypeForm, setVersionForm } from "../../../../store/slices/extractionsRules/extractionRulesSlice";
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { activExtractionRules } from "../../../../store/slices/admin/admin.slice";
import { createExtractionRuleThunk, updateExtractionRulesThunk } from "../../../../store/slices/extractionsRules/extractionRules.thunk";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import { MODAL_STYLE } from "../../../../config/constants/extactionRulesPage";
import { getChildKey, getDisplayId } from "../../../../config/utils/extractionRules.utils";
import { CollapsibleRow } from "./CollapsibleRow";

export const RulesEditPage = () => {
  const dispatch = useAppDispatch();
  const { updateExtractionRule, updating, changes } = useAppSelector(
    (state) => state.extractionRules
  );
  const { showToast } = useToast();

  const [version, setVersion] = useState(updateExtractionRule?.version ?? "");
  const [type, setType] = useState(updateExtractionRule?.type ?? "");
  const [rows, setRows] = useState<RuleRow[]>(updateExtractionRule?.fields || []);

  const ruleId = updateExtractionRule?.uuid || "root";
  const hasVersionChanges = changes?.[ruleId]?.["version"] !== undefined;
  const hasTypeChanges = changes?.[ruleId]?.["type"] !== undefined;

  useEffect(() => {
    setVersion(updateExtractionRule?.version ?? "");
    setType(updateExtractionRule?.type ?? "");
  }, [updateExtractionRule?.version, updateExtractionRule?.type]);

  useEffect(() => {
    setRows(updateExtractionRule?.fields || []);
  }, [updateExtractionRule]);

  const findRuleById = useCallback(
    (rules: RuleRow[], id: string): RuleRow | null => {
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
    },
    []
  );

  const handleAddSubRule = useCallback(
    (parentId: string) => {
      const parent = findRuleById(rows, parentId);
      if (!parent) return;

      const level = getDisplayId(parent).split(".").length;
      const childKey = getChildKey(level);
      const siblings = parent[childKey] || [];
      const parentIdBitmap = getDisplayId(parent);

      const existingNumbers = siblings
        .map((s) => {
          const parts = getDisplayId(s).split(".");
          const lastPart = parts[parts.length - 1];
          return parseInt(lastPart, 10);
        })
        .filter((n) => !isNaN(n));

      const nextNumber =
        existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;

      const newSubRule: RuleRow = {
        _id: `new-${Date.now()}`,
        id: `${parentIdBitmap}.${nextNumber}`,
        displayName: "Nueva Subregla",
        field: "",
        length: 1,
        typeData: "other",
        ...(level < 2 && { specification: [] }),
      };

      dispatch(addSubRule({ parentId, newRule: newSubRule }));
    },
    [dispatch, findRuleById, rows]
  );

  const handleAddTopLevelRule = useCallback(() => {
    const existingNumbers = rows
      .map((r) => {
        const parts = getDisplayId(r).split(".");
        const match = parts[0].match(/-(\d+)$/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter((n) => !isNaN(n) && n > 0);

    const nextNumber =
      existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;

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
  }, [dispatch, rows, type]);

  const handleVersionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVersion(+e.target.value);
    },
    []
  );

  const handleTypeChange = useCallback((e: SelectChangeEvent<string>) => {
    setType(e.target.value);
  }, []);

  const handleRowUpdate = useCallback((index: number, updatedRow: RuleRow) => {
    setRows((prev) => {
      const newRows = [...prev];
      newRows[index] = updatedRow;
      return newRows;
    });
  }, []);

  const updateRules = useCallback(async () => {
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
  }, [dispatch, updating, updateExtractionRule, showToast]);

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
                backgroundColor:
                  hasVersionChanges && updating ? "#fff7d6" : "inherit",
              },
            }}
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
            onBlur={(e) => dispatch(setTypeForm(e.target.value))}
            sx={{
              "& .MuiSelect-select": {
                backgroundColor:
                  hasTypeChanges && updating ? "#fff7d6" : "inherit",
              },
            }}
          >
            <MenuItem value="pos">POS</MenuItem>
            <MenuItem value="atm">ATM</MenuItem>
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
