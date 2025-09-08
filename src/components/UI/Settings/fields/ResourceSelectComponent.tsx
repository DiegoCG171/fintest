import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Action } from "../../../../config/interfaces/security.interface";
import { FieldComponentProps } from "../../../../config/interfaces/formSettings.interface";

interface ResourceSelectProps extends FieldComponentProps {
  resources: {
    data?: Action[];
  };
}

export const ResourceSelectComponent = ({ 
  field, 
  formData, 
  setFormData, 
  resources 
}: ResourceSelectProps) => (
  <FormControl key={field.name}>
    <InputLabel>{field.label}</InputLabel>
    <Select
      label={field.label}
      value={formData.resource ?? ""}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          resource: String(e.target.value),
        }))
      }
    >
      {resources.data?.map((resource) => (
        <MenuItem key={resource.id} value={String(resource.id)}>
          {resource.description}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);