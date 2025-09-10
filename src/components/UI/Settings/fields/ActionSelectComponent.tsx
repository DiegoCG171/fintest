import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Action } from "../../../../config/interfaces/security.interface";
import { FieldComponentProps } from "../../../../config/interfaces/formSettings.interface";

interface ActionSelectProps extends FieldComponentProps {
  actions: {
    data?: Action[];
  };
}

export const ActionSelectComponent = ({ 
  field, 
  formData, 
  setFormData, 
  actions 
}: ActionSelectProps) => (
  <FormControl key={field.name}>
    <InputLabel>{field.label}</InputLabel>
    <Select
      label={field.label}
      value={formData.action ?? ""}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          action: String(e.target.value),
        }))
      }
    >
      {actions.data?.map((action) => (
        <MenuItem key={action.id} value={String(action.id)}>
          {action.description}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);