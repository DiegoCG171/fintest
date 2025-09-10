import { TextField } from "@mui/material";
import { FieldComponentProps } from "../../../../config/interfaces/formSettings.interface";

export const TextFieldComponent = ({ field, formData, setFormData }: FieldComponentProps) => (
  <TextField
    key={field.name}
    label={field.label}
    autoComplete={`new--${field.name}`}
    value={formData[field.name] ?? ""}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        [field.name]: e.target.value,
      }))
    }
  />
);