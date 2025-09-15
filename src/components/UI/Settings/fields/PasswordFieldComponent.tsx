import { TextField, IconButton, InputAdornment, Tooltip, FormHelperText } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Dispatch, SetStateAction, useState } from "react";
import { FieldComponentProps } from "../../../../config/interfaces/formSettings.interface";

interface PasswordFieldProps extends FieldComponentProps {
  formErrors?: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFormData: Dispatch<SetStateAction<Record<string, any>>>;
}

export const PasswordFieldComponent = ({
  field,
  formData,
  setFormData,
  formErrors,
}: PasswordFieldProps) => {
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const value = formData[field.name] ?? "";
  const error = formErrors?.[field.name] ?? "";

  const handleCopy = async () => {
    if (!copied && value) {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setShowPassword(false);
    }
  };

  const generatePassword = (length = 16) => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
    const all = upper + lower + numbers + symbols;

    const getRandom = (chars: string) =>
      chars.charAt(Math.floor(Math.random() * chars.length));

    let password = [
      getRandom(upper),
      getRandom(lower),
      getRandom(numbers),
      getRandom(symbols),
    ];

    for (let i = password.length; i < length; i++) {
      password.push(getRandom(all));
    }

    password = password.sort(() => Math.random() - 0.5);

    const newPassword = password.join("");

    setFormData((prev) => ({
      ...prev,
      [field.name]: newPassword,
    }));

    setCopied(false);
    setShowPassword(true);
  };

  return (
    <>
      <TextField
        key={field.name}
        label={field.label}
        type={showPassword ? "text" : "password"}
        value={value}
        autoComplete="new-password"
        error={Boolean(error)}
        fullWidth
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              {/* Generar */}
              <Tooltip title="Generar nueva contraseña">
                <IconButton onClick={() => generatePassword(8)} edge="end">
                  <AutorenewIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title={copied ? "Ya copiada" : "Copiar"}>
                <span>
                  <IconButton
                    onClick={handleCopy}
                    disabled={copied || !value}
                    edge="end"
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </>
  );
};
