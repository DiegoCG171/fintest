import { MenuItem, Select, TextField, Typography } from "@mui/material";
import { DynamicFieldProps } from "../../../config/interfaces";
import {
  updateFieldValue,
  updateNestedFieldValue,
  useAppDispatch,
} from "../../../store";

const fontSize = "0.75rem";

function DynamicField({ column, value, row, path, tabId }: DynamicFieldProps) {
  //console.log("Inicio de Dato");
  /* console.log(column);
  console.log(value);
  console.log(row);
  console.log(path);
  console.log(tabId); */

  const dispatch = useAppDispatch();
  const dependsOn = column?.dependsOn;
  const dependsValue = dependsOn ? row[dependsOn] : undefined;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const newValue = e.target.value;
    const fieldKey = column.id;

    if (path.length > 1) {
      dispatch(
        updateNestedFieldValue({
          tabId,
          path,
          fieldKey,
          value: newValue,
        })
      );
    } else {
      dispatch(
        updateFieldValue({
          tabId,
          rowIndex: path[0],
          fieldKey,
          value: newValue,
        })
      );
    }
  };

  function shouldDisableCheckbox(isChild: boolean, dependsValue: string | unknown): boolean {
  if (isChild) return false; 
  return !dependsValue; 
}


  if (column.dynamicRender && dependsValue !== undefined) {
    const dynamic = column.dynamicRender[dependsValue as string];
    if (!dynamic?.render) return null;

    if (dynamic.type === "select") {
      const options = dynamic.options ?? [];
      return (
        <Select
          value={value ?? ""}
          onChange={handleChange}
          size="small"
          variant="outlined"
          fullWidth
          sx={{
            height: "24px",
            fontSize,
            borderRadius: 2,
            "& .MuiSelect-select": {
              padding: "4px 8px",
            },
          }}
        >
          {options.map((opt) => (
            <MenuItem
              key={opt}
              value={opt}
              sx={{ fontSize }}
            >
              {opt}
            </MenuItem>
          ))}
        </Select>
      );
    }

    if (dynamic.type === "input") {
      return (
        <TextField
          value={value ?? ""}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          size="small"
          sx={{
            "& .MuiInputBase-root": {
              height: "24px",
              fontSize,
              borderRadius: 2,
            },
            "& input": {
              padding: "4px 8px",
              fontSize,
            },
          }}
        />
      );
    }
  }

  if (column.dependsOn) {
    if (column.type === "checkbox") {
      const isChild = path.length > 1;
      const isDisabled = shouldDisableCheckbox(isChild, dependsValue);

      console.log(isDisabled);

      return (
        <input
          disabled={Boolean(isDisabled)}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) =>
            handleChange({ target: { value: e.target.checked } })
          }
        />
      );
    }
  }

  if (!column.dependsOn && path.length === 1) {
    if (column.type === "checkbox") {
      return (
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) =>
            handleChange({ target: { value: e.target.checked } })
          }
        />
      );
    }
    if (column.type === "input") {
      return (
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          sx={{
            "& .MuiInputBase-root": {
              height: "24px",
              fontSize,
              borderRadius: 2,
            },
            "& input": {
              padding: "4px 8px",
              fontSize,
            },
          }}
        />
      );
    }
    if (column.type === "select") {
      return (
        <Select
          fullWidth
          value={value ?? ""}
          onChange={handleChange}
          size="small"
          variant="outlined"
          sx={{
            height: "24px",
            fontSize,
            borderRadius: 2,
            "& .MuiSelect-select": {
              padding: "4px 8px",
            },
          }}
        >
          <MenuItem
            value=""
            sx={{ fontSize }}
          >
            <em>Seleccione una opción</em>
          </MenuItem>
          {column.options?.map((opt) => (
            <MenuItem
              key={opt}
              value={opt}
              sx={{ fontSize }}
            >
              {opt}
            </MenuItem>
          ))}
        </Select>
      );
    }
  }

  return (
    <Typography
      variant="body2"
      fontSize={fontSize}
    >
      {typeof value === "string" ? value : ""}
    </Typography>
  );
}
export default DynamicField;
