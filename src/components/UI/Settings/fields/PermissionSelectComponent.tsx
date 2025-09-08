import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Checkbox, 
  ListItemText 
} from "@mui/material";
import { Permission } from "../../../../config/interfaces/security.interface";
import { TagSettingTable } from "../TagSettingTable";
import { FieldComponentProps } from "../../../../config/interfaces/formSettings.interface";
import { SELECT_MENU_PROPS } from "../../../../config/constants/formSettings";

interface PermissionSelectProps extends FieldComponentProps {
  permissions: {
    menuOptions: Permission[];
  };
}

export const PermissionSelectComponent = ({ 
  field, 
  formData, 
  setFormData, 
  permissions 
}: PermissionSelectProps) => (
  <FormControl key={field.name}>
    <InputLabel>{field.label}</InputLabel>
    <Select
      multiple
      label={field.label}
      value={formData.permissionId ?? []}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          permissionId: e.target.value,
        }))
      }
      renderValue={(selected: any) =>
        permissions.menuOptions
          .filter((perm) =>
            (selected as string[]).includes(String(perm.id))
          )
          .map((perm) => (
            <TagSettingTable key={perm.id} value={perm.description} />
          ))
      }
      MenuProps={SELECT_MENU_PROPS}
    >
      {permissions.menuOptions.map((perm) => (
        <MenuItem key={perm.id} value={String(perm.id)}>
          <Checkbox
            checked={(formData.permissionId ?? []).includes(String(perm.id))}
          />
          <ListItemText primary={perm.description} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);