import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Institution } from "../../../../config/interfaces/institutions.interface";
import { FieldComponentProps } from "../../../../config/interfaces/formSettings.interface";
import { useAppSelector } from "../../../../store";

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
  const { institution } = useAppSelector((state) => state.auth.user!);
  const { type } = useAppSelector((state) => state.admin);
  const rawValue = institution ? institution : formData[field.name];
  const value =
    rawValue && typeof rawValue === "object" ? rawValue?.id : rawValue ?? "";

  const error = formErrors?.[field?.name] ?? "";

  return (
    <FormControl key={field.name} fullWidth error={Boolean(error)}>
      <InputLabel>{field.label}</InputLabel>
      <Select
        label={field?.label}
        value={value}
        disabled={!!institution}
        onChange={(e) => {
          const selectedValue =
            e.target.value === "null" ? null : e.target.value;
          setFormData((prev) => ({
            ...prev,
            [field?.name]: institution ? null : selectedValue,
          }));
        }}
      >
        <MenuItem value="null">Sin institución</MenuItem>
        {institutions.data.map((inst) => (
          <MenuItem key={inst?.id} value={inst?.id}>
            {inst?.name}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
