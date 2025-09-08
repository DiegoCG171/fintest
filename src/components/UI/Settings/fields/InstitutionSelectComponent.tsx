import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Institution } from "../../../../config/interfaces/institutions.interface";
import { FieldComponentProps } from "../../../../config/interfaces/formSettings.interface";

interface InstitutionSelectProps extends FieldComponentProps {
  institutions: {
    data: Institution[];
  };
}

export const InstitutionSelectComponent = ({ 
  field, 
  formData, 
  setFormData, 
  institutions 
}: InstitutionSelectProps) => (
  <FormControl key={field.name}>
    <InputLabel>{field.label}</InputLabel>
    <Select
      label={field.label}
      value={formData.institutionId ?? ""}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          institutionId: String(e.target.value),
        }))
      }
    >
      {institutions.data.map((inst) => (
        <MenuItem key={inst.id} value={String(inst.id)}>
          {inst.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);