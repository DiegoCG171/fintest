import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { Institution } from "../../../../config/interfaces/institutions.interface";
import { FieldComponentProps } from "../../../../config/interfaces/formSettings.interface";

interface InstitutionSelectProps extends FieldComponentProps {
  institutions: {
    data: Institution[];
  };
  formErrors?: Record<string, string>;
}

export const InstitutionSelectComponent = ({
  field,
  formData,
  setFormData,
  institutions,
  formErrors,
}: InstitutionSelectProps) => {
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
        {institutions.data.map((inst) => (
          <MenuItem key={inst.id} value={inst.id}>
            {inst.name}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
