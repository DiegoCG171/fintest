import { TextField, IconButton, InputAdornment, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useState } from "react";
import { FieldComponentProps } from "../../../../config/interfaces/formSettings.interface";

interface PasswordFieldProps extends FieldComponentProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const PasswordFieldComponent = ({
  field,
  formData,
  setFormData,
}: PasswordFieldProps) => {
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleCopy = async () => {
    if (!copied && formData[field.name]) {
      await navigator.clipboard.writeText(formData[field.name]);
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

    // Garantizar al menos 1 de cada tipo
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

    // Mezclar aleatoriamente
    password = password.sort(() => Math.random() - 0.5);

    const newPassword = password.join("");

    setFormData((prev: any) => ({
      ...prev,
      [field.name]: newPassword,
    }));

    setCopied(false);
    setShowPassword(true); // 👁️ se revela al generar
  };

  return (
    <TextField
      key={field.name}
      label={field.label}
      type={showPassword ? "text" : "password"}
      value={formData[field.name] ?? ""}
      autoComplete="new-password"
      slotProps={{
        input: {
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              {/* Generar */}
              <Tooltip title="Generar nueva contraseña">
                <IconButton onClick={() => generatePassword(8)} edge="end">
                  <AutorenewIcon />
                </IconButton>
              </Tooltip>

              {/* Copiar */}
              <Tooltip title={copied ? "Ya copiada" : "Copiar"}>
                <span>
                  <IconButton
                    onClick={handleCopy}
                    disabled={copied || !formData[field.name]}
                    edge="end"
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
