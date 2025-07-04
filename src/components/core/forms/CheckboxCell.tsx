import { useState } from 'react';
import { Box, Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import { CustomCheckboxProps } from '../../../config/interfaces';

const CustomCheckbox = ({
    id,
    label,
    checked = false,
    onChange,
    color = 'primary',
    size = 'medium',
    required = false,
    errorMessage = 'Este campo es obligatorio',
}: CustomCheckboxProps ) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = event.target.checked;
        setIsChecked(newChecked);

        if (required && !newChecked) {
            setError(errorMessage);
        } else {
            setError(null);
        }

        if (onChange) onChange(event);
    };

    return (
        <Box>
            {label ? (
                <FormControlLabel
                    control={
                        <Checkbox
                            id={id}
                            checked={isChecked}
                            onChange={handleChange}
                            color={color}
                            size={size}
                        />
                    }
                    label={label}
                />
            ) : (
                <Checkbox
                    id={id}
                    checked={isChecked}
                    onChange={handleChange}
                    color={color}
                    size={size}
                />
            )}
            {error && (
                <FormHelperText error sx={{ ml: 2 }}>
                    {error}
                </FormHelperText>
            )}
        </Box>
    );
};

export default CustomCheckbox;