import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { Action } from "../../../../config/interfaces/security.interface";
import { FieldComponentProps } from "../../../../config/interfaces/formSettings.interface";

interface ResourceSelectProps extends FieldComponentProps {
  resources: {
    data?: Action[];
  };
  formErrors?: Record<string, string>;
}

export const ResourceSelectComponent = ({
  field,
  formData,
  setFormData,
  resources,
  formErrors,
}: ResourceSelectProps) => {
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
        {resources.data?.map((resource) => (
          <MenuItem key={resource.id} value={String(resource.id)}>
            {resource.description}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
