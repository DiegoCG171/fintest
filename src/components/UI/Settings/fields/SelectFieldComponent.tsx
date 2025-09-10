import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FieldComponentProps } from "../../../../config/interfaces/formSettings.interface";

export const SelectFieldComponent = ({ field, formData, setFormData }: FieldComponentProps) => (
  <FormControl key={field.name}>
    <InputLabel>{field.label}</InputLabel>
    <Select
      label={field.label}
      value={formData[field.name] ?? ""}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          [field.name]: e.target.value,
        }))
      }
    >
      {field.options?.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);