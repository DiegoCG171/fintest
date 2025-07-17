import React, { useEffect, useRef, useState } from "react";
import { MenuItem, Select, TextField, Typography } from "@mui/material";
import { DynamicFieldProps } from "../../../config/interfaces";
import {
  updateFieldValue,
  updateNestedFieldValue,
  useAppDispatch,
  useAppSelector,
} from "../../../store";

type Primitive = string | number | boolean;



function DynamicField({
  column,
  value,
  row,
  path,
  tabId,
  isEditable,
  onlyRead,
}: DynamicFieldProps) {

  const hasChanged = false;
  const dispatch = useAppDispatch();
  const dependsOn = column?.dependsOn;
  const dependsValue = dependsOn ? row[dependsOn] : undefined;
  const isChild = path.length > 1;
  const isParent =
    Array.isArray(row.breakingRules) && row.breakingRules.length > 0;
  const { generation, validation, selection } = useAppSelector(
    (state) => state.functionSelect
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
        localValueRef.current !== ""
      ) {
        setLocalValue("");
      }
    }
  }, [value, column.id, tabId]);

  const getStyles = () => ({
    fontSize: isChild ? "0.65rem" : "0.75rem",
    fontWeight: isParent ? "600" : undefined,
  });

  const getSelectStyles = (hasChanged: boolean, getStyles: () => object) => ({
    height: "24px",
    ...getStyles(),
    borderRadius: 2,
    transition: "all 0.2s ease",

    "& .MuiOutlinedInput-notchedOutline": {
      border: hasChanged ? "2px solid #f39c12" : undefined,
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: hasChanged ? "2px solid #f39c12" : undefined,
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: hasChanged ? "2px solid #f39c12" : undefined,
    },

    "& .MuiSelect-select": {
      padding: "4px 8px",
    },
  });

  const getInputStyles = (hasChanged: boolean, getStyles: () => object) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      height: "24px",
      ...getStyles(),

      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: hasChanged ? "#f39c12 !important" : undefined,
        borderWidth: hasChanged ? "2px !important" : undefined,
      },

      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: hasChanged ? "#f39c12 !important" : undefined,
        borderWidth: hasChanged ? "2px !important" : undefined,
      },

      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: hasChanged ? "#f39c12 !important" : undefined,
        borderWidth: hasChanged ? "2px !important" : undefined,
      },
    },

    "& .MuiOutlinedInput-input": {
      padding: "4px 8px",
      ...getStyles(),
    },
  });

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
    return !isChild && !dependsValue;
  }

  const getFilteredFunctionOptions = () => {
    if (column.id !== "function" || !column.options) return [];

    if (tabId.includes("generationTransaction")) return generation;
    if (tabId.includes("validationTransaction")) return validation;
    if (tabId.includes("selectionTransaction")) return selection;

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

    if (dynamic.type === "select") {
      const options = dynamic.options ?? [];
      return (
        <Select
          value={localValue ?? ""}
          onChange={handleChange}
          size="small"
          variant="outlined"
          fullWidth
          sx={getSelectStyles(hasChanged, getStyles)}
        >
          {options.map((opt) => (
            <MenuItem key={opt} value={opt} sx={getStyles()}>
              {opt}
            </MenuItem>
          ))}
        </Select>
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
          sx={getInputStyles(hasChanged, getStyles)}
        />
      );
    }
  }

  if (column.dependsOn && column.type === "checkbox") {
    const isDisabled = shouldDisableCheckbox(isChild, dependsValue);
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
    if (column.type === "checkbox" && path.length === 1) {
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
          sx={getInputStyles(hasChanged, getStyles)}
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
          sx={getSelectStyles(hasChanged, getStyles)}
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
