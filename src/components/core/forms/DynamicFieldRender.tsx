import { FieldProps, useFormikContext } from "formik";
import {
  DynamicFieldPropsOld,
  DynamicRenderConfig,
  FormValues,
} from "../../../config/interfaces";
import {
  Checkbox,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const fontSize = "0.75rem";

const DynamicFieldRender = ({
  field,
  form,
  //meta,
  custom,
}: FieldProps & { custom: DynamicFieldPropsOld }) => {
  const formik = useFormikContext<FormValues>();

  const { name, column, row, id, parentPath, isVisible } = custom;
  const getFinalKey = (name?: string): string => {
    if (!name) return "";
    const parts = name.split(".");
    const last = parts[parts.length - 1];
    return last.replace(/\["(.+?)"\]/g, "$1");
  };

  const renderItemLabel = (item: unknown) => {
    return typeof item === "string" || typeof item === "number"
      ? item
      : JSON.stringify(item);
  };

  const dependsOn = column?.dependsOn;
  const dependencyPath = `${parentPath}.${id}.${dependsOn}`;
  const dependencyMeta = formik.getFieldMeta?.(dependencyPath);
  const dependsValue = dependencyMeta?.value;

  const key = getFinalKey(name);
  const value = row?.[key];
  const isParent =
    Array.isArray(row?.breakingRules) && row.breakingRules.length > 0;
  const isDisabled = dependsOn && !dependsValue && isParent;
  const isHide = column?.hide && row?.breakingRules as boolean

  // Aplicar visibilidad solo a campos independientes
  if ((isHide && !isVisible) && ["input", "select"].includes(column?.type || '')) {
    return (
      <Typography variant="body2" fontSize="0.75rem">
      </Typography>
    );
  }

  // 1. Checkbox simple
  if (column?.type === "checkbox") {
    return (
      <Checkbox
        disabled={Boolean(isDisabled)}
        checked={Boolean(field.value)}
        onChange={(e) => form.setFieldValue(field.name, e.target.checked)}
      />
    );
  }

  // 2. Select estático (sin dependencia)
  if (column?.type === "select" && !column.dependsOn) {
    if(isVisible){
      console.log(column, isVisible)
    }
    if (Array.isArray(value)) {
      return (
        <Select
          {...field}
          fullWidth
          value={field.value || ""}
          onChange={(e) => form.setFieldValue(field.name, e.target.value)}
          size="small"
          variant="outlined"
          sx={{
            height: "28px",
            fontSize,
            borderRadius: 2,
            "& .MuiSelect-select": {
              padding: "4px 8px",
            },
          }}
        >
          <MenuItem
            value=""
            sx={{ fontSize }}
          >
            <em>Seleccione una opción</em>
          </MenuItem>

          {value.map((item, index) => (
            <MenuItem
              key={index}
              value={renderItemLabel(item)}
              sx={{ fontSize }}
            >
              {renderItemLabel(item)}
            </MenuItem>
          ))}
        </Select>
      );
    }
  }

  // 3. Input simple (sin dependencia)
  if (column?.type === "input" && !column.dependsOn) {
    return (
      <TextField
        {...field}
        fullWidth
        variant="outlined"
        size="small"
        sx={{
          height: "28px",
          fontSize,
          "& input": {
            padding: "4px 8px",
            fontSize,
          },
        }}
      />
    );
  }

  // 4. Campo dependiente con renderizado dinámico
  if (column?.dynamicRender && dependsValue) {
    const dynamicConfig = (
      column.dynamicRender as Record<string, DynamicRenderConfig>
    )[dependsValue as string];

    if (dynamicConfig?.render) {
      // Campo input dinámico
      if (dynamicConfig.type === "input") {
        return (
          <TextField
            {...field}
            value={field.value ?? ""}
            fullWidth
            variant="outlined"
            size="small"
            sx={{
              height: "28px",
              fontSize,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
              "& input": {
                padding: "4px 8px",
                fontSize,
              },
            }}
          />
        );
      }

      // Campo select dinámico
      if (dynamicConfig.type === "select") {
        return (
          <Select
            {...field}
            value={field.value ?? ""}
            fullWidth
            onChange={(e) => form.setFieldValue(field.name, e.target.value)}
            size="small"
            variant="outlined"
            sx={{
              height: "28px",
              fontSize,
              borderRadius: 2,
              "& .MuiSelect-select": {
                padding: "4px 8px",
              },
            }}
          >
            <MenuItem
              value=""
              sx={{ fontSize }}
            >
              <em>Seleccione una opción</em>
            </MenuItem>
            {Array.isArray(dynamicConfig?.options) &&
              dynamicConfig.options.map((option: string, index: number) => (
                <MenuItem
                  key={index}
                  value={renderItemLabel(option)}
                  sx={{ fontSize }}
                >
                  {renderItemLabel(option)}
                </MenuItem>
              ))}
          </Select>
        );
      }
    } else {
      return (
        <Typography
          variant="body2"
          fontSize={fontSize}
        ></Typography>
      );
    }
  }

  // 5. Fallback: solo mostrar texto
  return (
    <Typography
      variant="body2"
      fontSize={fontSize}
    >
      {typeof value === "string" ? value : "—"}
    </Typography>
  );
};

export default DynamicFieldRender;
