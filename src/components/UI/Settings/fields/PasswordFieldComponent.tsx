import { TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FieldComponentProps } from "../../../../config/interfaces/formSettings.interface";

interface PasswordFieldProps extends FieldComponentProps {
  showPassword: boolean;
  setShowPassword: (value: (prev: boolean) => boolean) => void;
}

export const PasswordFieldComponent = ({ 
  field, 
  formData, 
  setFormData, 
  showPassword, 
  setShowPassword 
}: PasswordFieldProps) => (
  <TextField
    key={field.name}
    label={field.label}
    type={showPassword ? "text" : "password"}
    value={formData[field.name] ?? ""}
    autoComplete="new-password"
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        [field.name]: e.target.value,
      }))
    }
    slotProps={{
      input: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      },
    }}
  />
);