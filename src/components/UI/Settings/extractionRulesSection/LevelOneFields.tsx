import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { useCollapsibleRowState } from "../../../../config/hooks/useCollapsibleRowState";
import { getStyleByLevel } from "../../../../config/utils/extractionRules.utils";
import { RuleRow } from "../../../../store/slices/extractionsRules/extractionRulesSlice";
import { useAppSelector } from "../../../../store";
import { useEffect } from "react";

interface LevelOneFieldsProps {
  id: string;
  state: ReturnType<typeof useCollapsibleRowState>;
  styles: ReturnType<typeof getStyleByLevel>;
  handleUpdate: (changes: Partial<RuleRow>) => void;
}

export const LevelOneFields = ({
  id,
  state,
  styles,
  handleUpdate,
}: LevelOneFieldsProps) => {
  const { changes } = useAppSelector((state) => state.extractionRules);
  const hasChanges = changes[id];
  useEffect(() => {
    console.log(hasChanges);
  }, [hasChanges]);

  return (
    <Box sx={{ display: "grid", gap: 2, px: styles.marginLeft, py: 2 }}>
      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}
      >
        <FormControl size="small" fullWidth>
          <InputLabel
            htmlFor="longitud-input"
            sx={{ fontSize: styles.fontSize }}
          >
            Longitud de Campo
          </InputLabel>
          <OutlinedInput
            id="longitud-input"
            type="number"
            placeholder="5"
            label="Longitud de Campo"
            value={state.editableLength}
            onChange={(e) => state.setEditableLength(+e.target.value)}
            onBlur={() => handleUpdate({ length: state.editableLength })}
            sx={{
              fontSize: styles.fontSize,
              "& .MuiOutlinedInput-input": {
                backgroundColor: hasChanges?.length ? "#fff7d6" : "inherit",
              },
            }}
          />
        </FormControl>

        {state.isLengthVariable && (
          <FormControl size="small" fullWidth>
            <InputLabel
              htmlFor="posiciones-input"
              sx={{ fontSize: styles.fontSize }}
            >
              Posiciones de Longitud
            </InputLabel>
            <OutlinedInput
              id="posiciones-input"
              placeholder="1-3,5-7"
              type="number"
              value={state.positionsLength}
              onChange={(e) => state.setPositionsLength(e.target.value)}
              label="Posiciones de Longitud"
              sx={{
                fontSize: styles.fontSize,
                "& .MuiOutlinedInput-input": {
                  backgroundColor: hasChanges?.positionsLength
                    ? "#fff7d6"
                    : "inherit",
                },
              }}
              onBlur={() =>
                handleUpdate({
                  positionsLength: {
                    initPos: 0,
                    finalPos: +state.positionsLength,
                  },
                })
              }
            />
          </FormControl>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Checkbox
            size="small"
            checked={state.isLengthVariable}
            onChange={(e) => {
              const newValue = e.target.checked;
              state.setIsLengthVariable(newValue);
              handleUpdate({ isLengthVariable: newValue });
            }}
            sx={{ fontSize: styles.fontSize }}
          />
          <Typography
            variant="body2"
            sx={{ whiteSpace: "nowrap", fontSize: styles.fontSize }}
          >
            Longitud variable
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}
      >
        {state.expression === "other" && (
          <FormControl
            size="small"
            fullWidth
            sx={{ gridColumn: !state.isLengthVariable ? "span 1" : "span 2" }}
          >
            <InputLabel
              sx={{ fontSize: styles.fontSize }}
              htmlFor="regex-input"
            >
              Regex
            </InputLabel>
            <OutlinedInput
              id="regex-input"
              placeholder="^ISO\\d{3}$"
              label="Regex"
              sx={{
                fontSize: styles.fontSize,
                "& .MuiOutlinedInput-input": {
                  backgroundColor: hasChanges?.regex ? "#fff7d6" : "inherit",
                },
              }}
              value={state.regex}
              onChange={(e) => state.setRegex(e.target.value)}
              onBlur={() => handleUpdate({ regex: state.regex })}
            />
          </FormControl>
        )}

        {!state.isLengthVariable && (
          <FormControl size="small" fullWidth>
            <InputLabel sx={{ fontSize: styles.fontSize }} id="operador-label">
              Operador
            </InputLabel>
            <Select
              labelId="operador-label"
              label="Operador"
              defaultValue="=="
              sx={{
                fontSize: styles.fontSize,
                "& .MuiSelect-select": {
                  backgroundColor: hasChanges?.operator ? "#fff7d6" : "inherit",
                },
              }}
              value={state.editableOperator}
              onChange={(e) => state.setEditableOperator(e.target.value)}
              onBlur={() => handleUpdate({ operator: state.editableOperator })}
            >
              <MenuItem sx={{ fontSize: styles.fontSize }} value="==">
                Exactamente Igual
              </MenuItem>
              <MenuItem sx={{ fontSize: styles.fontSize }} value="<=">
                Menor o Igual que
              </MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>
    </Box>
  );
};
