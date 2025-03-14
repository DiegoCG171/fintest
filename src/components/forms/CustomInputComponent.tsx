import React from "react";
import {
    Box,
    FormControl,
    FormLabel,
    TextField,
    TextFieldProps,
    InputAdornment,
} from "@mui/material";

export type CustomTextFieldProps = TextFieldProps & {
    label: string;
    id: string;
    error?: boolean;
    helperText?: React.ReactNode;
    endIcon?: React.ReactNode;
};

const CustomInputComponent: React.FC<CustomTextFieldProps> = ({
    label,
    id,
    error,
    helperText,
    endIcon,
    required,
    slotProps,
    ...rest
    }) => {

    const mergedInputSlotProps = {
        ...slotProps?.input,
        ...(endIcon && {
        endAdornment: <InputAdornment position="end">{endIcon}</InputAdornment>,
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
            slotProps={mergedSlotProps}
            {...rest}
            />
        </FormControl>
        </Box>
    );
};

export default CustomInputComponent;
