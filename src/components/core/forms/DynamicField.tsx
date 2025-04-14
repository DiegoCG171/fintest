import { useField } from "formik";
import {
    TextField,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { DynamicFieldProps } from "../../../config/interfaces";

const DynamicField: React.FC<DynamicFieldProps> = ({
    name,
    type,
    label,
    options,
    }) => {
    const [field, meta] = useField(name);
    const error = Boolean(meta.touched && meta.error);

    if (type === "select" && options) {
        return (
        <Select
            fullWidth
            {...field}
            error={error}
            displayEmpty
            variant="outlined"
        >
            <MenuItem
            value=""
            disabled
            >
            {label}
            </MenuItem>
            {options.map((opt) => (
            <MenuItem
                key={opt.value}
                value={opt.value}
            >
                {opt.label}
            </MenuItem>
            ))}
        </Select>
        );
    }

    if (type === "checkbox") {
        return (
        <FormControlLabel
            control={
            <Checkbox
                {...field}
                checked={field.value}
            />
            }
            label={label}
        />
        );
    }

    // default: text
    return (
        <TextField
        fullWidth
        {...field}
        label={label}
        error={error}
        helperText={error ? meta.error : ""}
        variant="outlined"
        />
    );
};

export default DynamicField;
