import { TextField } from "@mui/material";
import { FieldComponentProps } from "../../../../config/interfaces/formSettings.interface";

interface TextFieldProps extends FieldComponentProps {
  formErrors?: Record<string, string>;
}

export const TextFieldComponent = ({ field, formData, setFormData, formErrors }: TextFieldProps) => {
  const value = formData[field.name] ?? "";
  const error = formErrors?.[field.name] ?? "";

  return (
    <TextField
      key={field.name}
      label={field.label}
      autoComplete={`new--${field.name}`}
      value={value}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          [field.name]: e.target.value,
        }))
      }
      error={Boolean(error)}
      helperText={error}
      fullWidth
    />
  );
};
