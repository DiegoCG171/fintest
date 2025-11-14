import React, { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  DynamicFieldProps,
  TableRowDataFormBuilder,
} from "../../../config/interfaces";
import {
  updateFieldValue,
  updateNestedFieldValue,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import {
  updateIsActiveRecursive,
  updateIsRequiredRecursive,
} from "../../../store/slices/UI/form/formBuilder.slice";

type Primitive = string | number | boolean;

function extractIdBitMap(arr: TableRowDataFormBuilder[]): string[] {
  const result = arr.flatMap((item) => {
    const current = [item.idBitmap];

    let children: string[] = [];
    if (Array.isArray(item.breakingRules)) {
      children = extractIdBitMap(item.breakingRules);
    }

    return [...current, ...children];
  });

  return Array.from(new Set(result));
}

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
  const dependsOnForm = column?.dependsOn;
  const dependsValue = dependsOnForm ? row[dependsOnForm] : undefined;
  const isChild = path.length > 1;
  const isParent =
    Array.isArray(row.breakingRules) && row.breakingRules.length > 0;
  const { generation, validation, selection, dependsOn } = useAppSelector(
    (state) => state.functionSelect
  );
  const { values } = useAppSelector(
    (state) => state.formBuilder.tabForms[tabId]
  );

  const [localValue, setLocalValue] = useState<Primitive | "">("");

  const localValueRef = useRef(localValue);

  useEffect(() => {
    localValueRef.current = localValue;
  }, [localValue]);

  function isPrimitive(val: unknown): val is Primitive {
    return (
      typeof val === "string" ||
      typeof val === "number" ||
      typeof val === "boolean"
    );
  }

  useEffect(() => {
    if (isPrimitive(value) && value !== localValueRef.current) {
      setLocalValue(value);
    } else if (
      (value === undefined || value === null || value === "") &&
      column.id === "function"
    ) {
      if (
        tabId.includes("generationTransaction") &&
        localValueRef.current !== "echo"
      ) {
        setLocalValue("echo");
      } else if (
        tabId.includes("validationTransaction") &&
        localValueRef.current !== "not_validate"
      ) {
        setLocalValue("not_validate");
      } else if (
        tabId.includes("selectionTransaction") &&
        localValueRef.current !== "ignore"
      ) {
        setLocalValue("ignore");
      }
    }
  }, [value, column.id, tabId]);

  const getStyles = () => ({
    fontSize: isChild ? "0.65rem" : "0.75rem",
    fontWeight: isParent ? "600" : undefined,
  });

  const handleChange = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const newValue = e.target.value;
    const fieldKey = column.id;
    const boolValue = newValue === "true" || newValue === true;
    const hasChildren =
      Array.isArray(row.breakingRules) && row.breakingRules.length > 0;

    if (fieldKey === "isActive") {
      if (hasChildren) {
        dispatch(
          updateIsActiveRecursive({
            tabId,
            path,
            value: boolValue,
          })
        );
      }

      if (path.length > 1) {
        dispatch(
          updateNestedFieldValue({
            tabId,
            path,
            fieldKey,
            value: boolValue,
          })
        );
      } else {
        dispatch(
          updateFieldValue({
            tabId,
            rowIndex: path[0],
            fieldKey,
            value: boolValue,
          })
        );
      }
    }
    if (fieldKey === "isRequired") {
      if (hasChildren) {
        dispatch(
          updateIsRequiredRecursive({
            tabId,
            path,
            value: boolValue,
          })
        );
      }

      if (path.length > 1) {
        dispatch(
          updateNestedFieldValue({
            tabId,
            path,
            fieldKey,
            value: boolValue,
          })
        );
      } else {
        dispatch(
          updateFieldValue({
            tabId,
            rowIndex: path[0],
            fieldKey,
            value: boolValue,
          })
        );
      }
    } else {
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

  function shouldDisableCheckbox(dependsValue: string | unknown): boolean {
    return !dependsValue;
  }

  const getFilteredFunctionOptions = () => {
    if (column.id !== "function" || !column.options) return [];

    if (tabId.includes("generationTransaction")) return generation;
    if (tabId.includes("validationTransaction")) return validation;
    if (tabId.includes("selectionTransaction")) return selection;
    if (tabId.includes("dependOnTransaction")) return dependsOn;

    return [];
  };

  const getFunctionsLabels = (text: string): string => {
    if (tabId.includes("generationTransaction")) {
      const option = generation.find((gen) => gen.value === text);
      return option?.label ?? text;
    }

    if (tabId.includes("validationTransaction")) {
      const option = validation.find((val) => val.value === text);
      return option?.label ?? text;
    }

    if (tabId.includes("selectionTransaction")) {
      const option = selection.find((sel) => sel.value === text);
      return option?.label ?? text;
    }
    
    if (tabId.includes("dependOnTransaction")) {
      const option = dependsOn.find((dependsOn) => dependsOn.value === text);
      return option?.label ?? text;
    }

    return text;
  };

  if (onlyRead && column.type === "checkbox") {
    const realValue = localValue ?? row.isRequired;
    return (
      <input
        disabled
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
        {typeof localValue === "string" ? getFunctionsLabels(localValue) : ""}
      </Typography>
    );
  }

  if (column.dynamicRender && dependsValue !== undefined) {
    const dynamic = column.dynamicRender[dependsValue as string];
    if (!dynamic?.render) return null;
    let options = dynamic.options ?? [];

    if (dynamic.type === "select") {
      return (
        <Select
          value={localValue ?? ""}
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
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
        >
          {options.map((opt, index) => (
            <MenuItem key={`${opt}-${index}`} value={opt} sx={getStyles()}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      );
    }

    if (dynamic.type === "auto-complete") {
      options = extractIdBitMap(values);
      return (
        <Autocomplete
          options={options}
          value={localValue != null ? String(localValue) : null}
          onChange={(_, newValue) => {
            setLocalValue(newValue!);
            handleChange({ target: { value: newValue } });
          }}
          freeSolo={false}
          noOptionsText="Sin opciones"
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiInputBase-root": {
                  height: "28px",
                  borderRadius: 2,
                  color: "#000",
                },
                "& input": {
                  padding: "4px 8px",
                  fontSize: "0.75rem",
                  color: "#000",
                },
                "& .MuiAutocomplete-clearIndicator": {
                  fontSize: "12px",
                  color: "#000",
                },
                "& .MuiAutocomplete-popupIndicator": {
                  fontSize: "12px",
                  color: "#000",
                },
              }}
            />
          )}
          slotProps={{
            paper: {
              sx: {
                "& .MuiAutocomplete-option": {
                  fontSize: "0.75rem",
                  padding: "8px 8px",
                  color: "#000",
                },
                "& .MuiAutocomplete-noOptions": {
                  fontSize: "0.75rem",
                  padding: "16px 8px",
                  color: "#000",
                },
              },
            },
          }}
          fullWidth
        />
      );
    }

    if (dynamic.type === "input") {
      return (
        <TextField
          value={localValue ?? ""}
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

  if (column.dependsOn && column.type === "checkbox") {
    const isDisabled = shouldDisableCheckbox(dependsValue);
    const realValue = localValue ?? row.isRequired;
    return (
      <input
        disabled={Boolean(isDisabled)}
        type="checkbox"
        checked={Boolean(realValue)}
        onChange={(e) => handleChange({ target: { value: e.target.checked } })}
      />
    );
  }

  if (!column.dependsOn) {
    if (
      column.type === "checkbox" &&
      (path.length === 1 || (row.breakingRules?.length ?? 0) > 0)
    ) {
      const realValue = localValue ?? row.isRequired;
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
          value={localValue ?? ""}
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
      const options = getFilteredFunctionOptions();
      return (
        <Select
          fullWidth
          value={localValue ?? ""}
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
          <MenuItem value="" sx={getStyles()}>
            <em>Seleccione una opción</em>
          </MenuItem>
          {options?.map((opt) => (
            <MenuItem key={opt.value} value={opt.value} sx={getStyles()}>
              {opt.label}
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
      {typeof localValue === "string" ? localValue : ""}
    </Typography>
  );
}

export default DynamicField;
