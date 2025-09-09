import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Rol } from "../../../../config/interfaces/security.interface";
import { toCapitalCase } from "../../../../config/utils";
import { FieldComponentProps } from "../../../../config/interfaces/formSettings.interface";

interface RoleSelectProps extends FieldComponentProps {
  roles: {
    data: Rol[];
  };
}

export const RoleSelectComponent = ({ 
  field, 
  formData, 
  setFormData, 
  roles 
}: RoleSelectProps) => (
  <FormControl key={field.name}>
    <InputLabel>{field.label}</InputLabel>
    <Select
      label={field.label}
      value={formData.roleIds?.length ? formData.roleIds : ""}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          roleIds: [String(e.target.value)],
        }))
      }
    >
      {roles.data.map((role) => (
        <MenuItem key={role.id} value={String(role.id)}>
          {toCapitalCase(role.name)}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);