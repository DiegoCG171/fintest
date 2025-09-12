import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { Rol } from "../../../../config/interfaces/security.interface";
import { toCapitalCase } from "../../../../config/utils";
import { FieldComponentProps } from "../../../../config/interfaces/formSettings.interface";

interface RoleSelectProps extends FieldComponentProps {
  roles: {
    data: Rol[];
  };
  formErrors?: Record<string, string>;
}

export const RoleSelectComponent = ({
  field,
  formData,
  setFormData,
  roles,
  formErrors,
}: RoleSelectProps) => {
  const value = formData[field.name]?.length ? formData[field.name] : "";
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
            [field.name]: [String(e.target.value)],
          }))
        }
      >
        {roles.data.map((role) => (
          <MenuItem key={role.id} value={String(role.id)}>
            {toCapitalCase(role.name)}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
