import React, { useState } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    TextField,
    TextFieldProps,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, CheckCircle, Cancel } from "@mui/icons-material";

export type CustomTextFieldProps = TextFieldProps & {
    label: string;
    id: string;
    error?: boolean;
    helperText?: React.ReactNode;
    endIconType?: "password" | "validation";
    isValid?: boolean;
};

const CustomInputComponent: React.FC<CustomTextFieldProps> = ({
    label,
    id,
    error,
    helperText,
    endIconType,
    isValid,
    required,
    slotProps,
    type,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleFocus = () => {
        setIsTouched(true);
    };

    const renderEndIcon = () => {
        if (endIconType === "password") {
            return (
                <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            );
        }
        if (endIconType === "validation" && isTouched) {
            return isValid ? <CheckCircle style={{ color: "green" }} /> : <Cancel style={{ color: "red" }} />;
        }
        return null;
    };

    const mergedInputSlotProps = {
        ...slotProps?.input,
        ...(endIconType && {
            endAdornment: <InputAdornment position="end" sx={{ backgroundColor: "transparent", p: 0 }}>{renderEndIcon()} </InputAdornment>,
        }),
    };

    const mergedSlotProps = {
        ...slotProps,
        input: mergedInputSlotProps,
    };

    return (
        <Box>
            <FormLabel
                htmlFor={id}
                sx={{ mb: 1, fontSize: "14px", fontWeight: "bold" }}
            >
                {label}{required && <span style={{ color: "red" }}> *</span>}:
            </FormLabel>
            <FormControl fullWidth variant="outlined">
                <TextField
                    id={id}
                    variant="outlined"
                    error={error}
                    helperText={helperText}
                    size="small"
                    autoComplete="off"
                    onFocus={handleFocus}
                    slotProps={mergedSlotProps}
                    type={showPassword ? "text" : type}
                    {...rest}
                />
            </FormControl>
        </Box>
    );
};

export default CustomInputComponent;
