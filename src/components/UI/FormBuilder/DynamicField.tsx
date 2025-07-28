import { MenuItem, Select, TextField, Typography } from "@mui/material";
import { DynamicFieldProps } from "../../../config/interfaces";
import {
  updateFieldValue,
  updateNestedFieldValue,
  useAppDispatch
} from "../../../store";

function DynamicField({
  column,
  value,
  row,
  path,
  tabId,
  isEditable,
  onlyRead,
}: DynamicFieldProps) {
  const dispatch = useAppDispatch();
  const dependsOn = column?.dependsOn;
  const dependsValue = dependsOn ? row[dependsOn] : undefined;
  const isChild = path.length > 1;
  const isParent = row.breakingRules ? row.breakingRules.length > 0 : false;
  const getStyles = () => {
    if (isChild) {
      return {
        fontSize: "0.65rem",
      };
    } else if (!isParent) {
      return {
        fontSize: "0.75rem",
      };
    } else {
      return {
        fontSize: "0.75rem",
        fontWeight: "600",
      };
    }
  };

  const handleChange = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const newValue = e.target.value;
    const fieldKey = column.id;

    if (path.length > 1) {
      dispatch(
        updateNestedFieldValue({
          tabId,
          path,
          fieldKey,
          value: newValue,
        })
      );
    } else {
      dispatch(
        updateFieldValue({
          tabId,
          rowIndex: path[0],
          fieldKey,
          value: newValue,
        })
      );
    }

    if (fieldKey === "function" && newValue === "not_validate") {
      const valueFieldKey = "value";

      if (path.length > 1) {
        dispatch(
          updateNestedFieldValue({
            tabId,
            path,
            fieldKey: valueFieldKey,
            value: "",
          })
        );
      } else {
        dispatch(
          updateFieldValue({
            tabId,
            rowIndex: path[0],
            fieldKey: valueFieldKey,
            value: "",
          })
        );
      }
    }
  };

  function shouldDisableCheckbox(
    isChild: boolean,
    dependsValue: string | unknown
  ): boolean {
    if (isChild) return false;
    return !dependsValue;
  }

  if (onlyRead && column.type === "checkbox") {
    const realValue = value !== undefined ? value : row.isRequired;
    return (
      <input
        disabled={true}
        type="checkbox"
        checked={Boolean(realValue)}
        onChange={(e) => handleChange({ target: { value: e.target.checked } })}
      />
    );
  }

  if (
    (isParent && column.id === "value") ||
    (isParent && column.id === "function")
  ) {
    return null;
  }

  if (
    (!isEditable && column.id === "value") ||
    (!isEditable && column.id === "function")
  ) {
    return (
      <Typography sx={getStyles()}>
        {typeof value === "string" ? value : ""}
      </Typography>
    );
  }

  if (column.dynamicRender && dependsValue !== undefined) {
    const dynamic = column.dynamicRender[dependsValue as string];
    if (!dynamic?.render) return null;

    if (dynamic.type === "select") {
      const options = dynamic.options ?? [];
      return (
        <Select
          value={value ?? ""}
          onChange={handleChange}
          size="small"
          variant="outlined"
          fullWidth
          sx={{
            height: "24px",
            ...getStyles(),
            borderRadius: 2,
            "& .MuiSelect-select": {
              padding: "4px 8px",
            },
          }}
        >
          {options.map((opt) => (
            <MenuItem
              key={opt}
              value={opt}
              sx={getStyles()}
            >
              {opt}
            </MenuItem>
          ))}
        </Select>
      );
    }

    if (dynamic.type === "input") {
      return (
        <TextField
          value={value ?? ""}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          size="small"
          sx={{
            "& .MuiInputBase-root": {
              height: "24px",
              ...getStyles(),
              borderRadius: 2,
            },
            "& input": {
              padding: "4px 8px",
              ...getStyles(),
            },
          }}
        />
      );
    }
  }

  if (column.dependsOn) {
    if (column.type === "checkbox") {
      const isDisabled = shouldDisableCheckbox(isChild, dependsValue);
      const realValue = value !== undefined ? value : row.isRequired;
      return (
        <input
          disabled={Boolean(isDisabled)}
          type="checkbox"
          checked={Boolean(realValue)}
          onChange={(e) =>
            handleChange({ target: { value: e.target.checked } })
          }
        />
      );
    }
  }

  if (!column.dependsOn) {
    if (column.type === "checkbox" && path.length === 1) {
      const realValue = value !== undefined ? value : row.isRequired;
      return (
        <input
          type="checkbox"
          checked={Boolean(realValue)}
          onChange={(e) =>
            handleChange({ target: { value: e.target.checked } })
          }
        />
      );
    }
    if (column.type === "input") {
      return (
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          sx={{
            "& .MuiInputBase-root": {
              height: "24px",
              ...getStyles(),
              borderRadius: 2,
            },
            "& input": {
              padding: "4px 8px",
              ...getStyles(),
            },
          }}
        />
      );
    }
    if (column.type === "select" && !isParent) {
      return (
        <Select
          fullWidth
          value={value ?? ""}
          onChange={handleChange}
          size="small"
          variant="outlined"
          sx={{
            height: "24px",
            ...getStyles(),
            borderRadius: 2,
            "& .MuiSelect-select": {
              padding: "4px 8px",
            },
          }}
        >
          <MenuItem
            value=""
            sx={getStyles()}
          >
            <em>Seleccione una opción</em>
          </MenuItem>
          {column.options?.map((opt) => (
            <MenuItem
              key={opt}
              value={opt}
              sx={getStyles()}
            >
              {opt}
            </MenuItem>
          ))}
        </Select>
      );
    }
  }

  return (
    <Typography
      variant="body2"
      style={{
        ...getStyles(),
        padding: isChild ? 6 : 0,
      }}
    >
      {typeof value === "string" ? value : ""}
    </Typography>
  );
}
export default DynamicField;
