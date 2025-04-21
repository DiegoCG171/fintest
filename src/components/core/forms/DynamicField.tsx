import {
  Checkbox,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import { DynamicFieldProps, FormValues } from "../../../config/interfaces";

const fontSize = "0.75rem";

const getFinalKey = (name: string): string => {
  const parts = name.split(".");
  const last = parts[parts.length - 1];
  return last.replace(/\["(.+?)"\]/g, "$1");
};

const DynamicField = ({ name, row, column, id }: DynamicFieldProps) => {
  const [field, meta, helpers] = useField(name);
  const formik = useFormikContext<FormValues>();
  const dependsOn = column?.dependsOn;
  const dependsValue = dependsOn
    ? formik.values.items?.[id]?.[dependsOn]
    : undefined;
  const key = getFinalKey(name);
  const value = row?.[key];
  console.log(column, "la columna");


  if (column) {
    if (column.type === "checkbox") {
      const isDisabled = dependsOn && !dependsValue;

      return (
        <Checkbox
          disabled={Boolean(isDisabled)}
          checked={Boolean(field.value)}
          onChange={(e) => helpers.setValue(e.target.checked)}
        />
      );
    }

    if (column.type === "select" && !column.dependsOn) {
      if (Array.isArray(value)) {
        if (dependsOn) {
          console.log(dependsOn, "demendiente");
        }
        const renderOptionLabel = (item: unknown) => {
          if (typeof item === "string" || typeof item === "number") {
            return item;
          } else return "";
        };

        const getOptionValue = (item: unknown) =>
          typeof item === "string" || typeof item === "number"
            ? item
            : JSON.stringify(item);

        return (
          <Select
            {...field}
            fullWidth
            value={field.value || ""}
            onChange={(e) => helpers.setValue(e.target.value)}
            size="small"
            variant="outlined"
            sx={{
              height: "28px",
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

            {value.map((item, idx) => (
              <MenuItem
                key={idx}
                value={getOptionValue(item)}
                sx={{ fontSize }}
              >
                {renderOptionLabel(item)}
              </MenuItem>
            ))}
          </Select>
        );
      }
    }

    if (column.type === "input" && !column.dependsOn) {
      <TextField
        sx={{
            height: "28px",
            fontSize,
            borderRadius: 2,
            "& .MuiSelect-select": {
            padding: "4px 8px",
            },
        }}/>;
    }

    if (column.type === "dynamic" && column.dependsOn) {
      console.log("Es dinámico");
    }
  }

  return (
    <Typography variant="body2">
      {typeof value === "string" ? value : "—"}
    </Typography>
  );
};

export default DynamicField;
