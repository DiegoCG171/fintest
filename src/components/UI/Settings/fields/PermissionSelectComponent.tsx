import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Checkbox, 
  ListItemText, 
  FormHelperText 
} from "@mui/material";
import { Permission } from "../../../../config/interfaces/security.interface";
import { TagSettingTable } from "../TagSettingTable";
import { FieldComponentProps } from "../../../../config/interfaces/formSettings.interface";
import { SELECT_MENU_PROPS } from "../../../../config/constants/formSettings";

interface PermissionSelectProps extends FieldComponentProps {
  permissions: {
    menuOptions: Permission[];
  };
  formErrors?: Record<string, string>;
}

export const PermissionSelectComponent = ({
  field,
  formData,
  setFormData,
  permissions,
  formErrors,
}: PermissionSelectProps) => {
  const value: string[] = formData[field.name] ?? [];
  const error = formErrors?.[field.name] ?? "";

  return (
    <FormControl key={field.name} fullWidth error={Boolean(error)}>
      <InputLabel>{field.label}</InputLabel>
      <Select
        multiple
        label={field.label}
        value={value}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            [field.name]: e.target.value,
          }))
        }
        renderValue={(selected) =>
          permissions.menuOptions
            .filter((perm) => (selected as string[]).includes(String(perm.id)))
            .map((perm) => <TagSettingTable key={perm.id} value={perm.description} />)
        }
        MenuProps={SELECT_MENU_PROPS}
      >
        {permissions.menuOptions.map((perm) => (
          <MenuItem key={perm.id} value={String(perm.id)}>
            <Checkbox checked={value.includes(String(perm.id))} />
            <ListItemText primary={perm.description} />
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
