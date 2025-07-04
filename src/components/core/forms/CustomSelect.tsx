import { Box, FormControl, FormLabel, Select, MenuItem, SelectChangeEvent, FormHelperText } from "@mui/material";
import { CustomSelectProps } from "../../../config/interfaces";
import { useState } from "react";

const optionsExample = {
  cry: 12,
  key: 13,
  data: "dfdsfsd"
};

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  required = false,
  id,
  defaultValue = "Seleccione una opción",
  options = optionsExample,
  helperText = "Campo requerido",
  ...rest
}) => {
  // Estado para manejar el valor seleccionado
  const [selectedValue, setSelectedValue] = useState<string | "">("");
  const [isError, setIsError] = useState<boolean>(false);

  // Manejador de cambio para el Select
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string;
    setSelectedValue(value);

    // Validación: si es requerido y está vacío, marcar error
    if (required && value === "") {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const optionEntries = Object.entries(options);

  return (
    <Box>
      <FormControl fullWidth variant="outlined" error={isError}>
        {label && (
          <FormLabel
            htmlFor={id}
            sx={{
              color: isError ? "red" : "black",     
              "&.Mui-focused": {
                color: isError ? "red" : "black",
              },
              "&.MuiFormLabel-filled": {
                color: isError ? "red" : "black",
              }
            }}
          >
            {label}
            {required && <span style={{ color: "red" }}> *</span>}
          </FormLabel>
        )}
        <Select
          labelId={`${id}-label`}
          id={id}
          value={selectedValue}
          onChange={handleChange}
          displayEmpty
          fullWidth
          {...rest}
          sx={{ 
            marginTop: 1,
            fontSize: "12px",
            height: "32px",
            "& .MuiSelect-select": { 
              padding: "4px 8px",
              minHeight: "unset",
            },
            "& .MuiOutlinedInput-input": {
              padding: "4px 8px",
              minHeight: "unset",
            },
            "& .MuiInputBase-input": {
              fontSize: "12px",
              height: "24px",
              lineHeight: "1.2",
            }
          }}
        >
          {/* Opción por defecto como marcador de posición */}
          <MenuItem value="" sx={{ fontSize: "12px", padding: "4px 8px" }}>
            <em>{defaultValue}</em>
          </MenuItem>
          {optionEntries.map(([key, value]) => (
            <MenuItem key={key} value={String(value)} sx={{ fontSize: "12px", padding: "4px 8px" }}>
              {key}
            </MenuItem>
          ))}
        </Select>
        {/* Mostrar mensaje de error si el campo está vacío y es requerido */}
        {isError && (
          <FormHelperText error sx={{ marginTop: "4px" }}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
