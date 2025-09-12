import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { FieldComponentProps } from "../../../../config/interfaces/formSettings.interface";

interface SelectFieldProps extends FieldComponentProps {
  formErrors?: Record<string, string>;
}

export const SelectFieldComponent = ({
  field,
  formData,
  setFormData,
  formErrors,
}: SelectFieldProps) => {
  const value = formData[field.name] ?? "";
  const error = formErrors?.[field.name] ?? "";

  return (
    <FormControl key={field.name} fullWidth error={Boolean(error)}>
      <InputLabel>{field.label}</InputLabel>
      <Select
        label={field.label}
        value={value}
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
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
