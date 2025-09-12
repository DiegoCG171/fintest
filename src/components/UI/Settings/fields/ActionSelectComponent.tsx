import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { Action } from "../../../../config/interfaces/security.interface";
import { FieldComponentProps } from "../../../../config/interfaces/formSettings.interface";

interface ActionSelectProps extends FieldComponentProps {
  actions: {
    data?: Action[];
  };
  formErrors?: Record<string, string>;
}

export const ActionSelectComponent = ({
  field,
  formData,
  setFormData,
  actions,
  formErrors,
}: ActionSelectProps) => {
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
            [field.name]: String(e.target.value),
          }))
        }
      >
        {actions.data?.map((action) => (
          <MenuItem key={action.id} value={String(action.id)}>
            {action.description}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
