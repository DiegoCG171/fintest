/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Autocomplete,
  TextField,
  Checkbox,
  FormControl,
  FormHelperText,
  Box,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Permission } from "../../../../config/interfaces/security.interface";
import { TagSettingTable } from "../TagSettingTable";
import { FieldComponentProps } from "../../../../config/interfaces/formSettings.interface";
import { useMemo } from "react";

interface PermissionSelectProps extends FieldComponentProps {
  permissions: {
    menuOptions: Permission[];
  };
  formErrors?: Record<string, string>;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const PermissionSelectComponent = ({
  field,
  formData,
  setFormData,
  permissions,
  formErrors,
}: PermissionSelectProps) => {
  const error = formErrors?.[field.name] ?? "";

  const selectedPermissions = useMemo(() => {
    const fieldValue = formData[field.name];
    
    if (!fieldValue || !Array.isArray(fieldValue) || fieldValue.length === 0) {
      return [];
    }

    const selected = fieldValue
      .map((id: number | string) => {
        const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
        const found = permissions.menuOptions.find((perm) => perm.id === numericId);
        return found;
      })
      .filter((perm): perm is Permission => perm !== undefined);
    
    return selected;
  }, [formData, permissions.menuOptions, field.name]);

  return (
    <FormControl fullWidth error={Boolean(error)}>
      <Autocomplete
        multiple
        options={permissions.menuOptions}
        disableCloseOnSelect
        getLimitTagsText={(more) => `+${more}`}
        value={selectedPermissions}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(_, newValue) => {
          const newIds = newValue.map((perm) => perm.id);
          
          setFormData((prev) => ({
            ...prev,
            [field.name]: newIds,
          }));
        }}
        getOptionLabel={(option) => option?.description || ''}
        renderOption={(props, option, { selected }) => {
          const { key, ...otherProps } = props;
          return (
            <li key={option.id} {...otherProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.description}
            </li>
          );
        }}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => {
            const { key, ...restProps } = getTagProps({ index });
            return (
              <TagSettingTable
                key={option.id}
                value={option.description}
                {...restProps}
              />
            );
          })
        }
        slotProps={{
          paper: { sx: { maxHeight: 180, overflow: "visible" } },
          listbox: { sx: { maxHeight: 180, overflowY: "auto" } },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={field.label}
            error={Boolean(error)}
            placeholder="Buscar permisos..."
            slotProps={{
              input: {
                ...params.InputProps,
                startAdornment: (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                      maxHeight: 72,
                      overflowY: "auto",
                    }}
                  >
                    {params.InputProps.startAdornment}
                  </Box>
                ),
              },
            }}
          />
        )}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};