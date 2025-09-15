import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";

import { useAppDispatch, useAppSelector } from "../../../store";
import {
  closeModalSettings,
  resetPermissionsMenuOptions,
} from "../../../store/slices/admin/admin.slice";
import { useFormConfig } from "../../../config/hooks/useFormConfig";
import { useFormLogic } from "../../../config/hooks/useFormLogic";
import { createSubmitHandlers, validateForm } from "../../../config/utils/formSettingsHandlers";
import { GRID_STYLE, MODAL_STYLE } from "../../../config/constants/formSettings";
import { createFieldComponent } from "./fields/fieldFactory";


export const DynamicSettingForm = () => {
  const dispatch = useAppDispatch();
  const { type } = useAppSelector((state) => state.admin);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});


  const config = useFormConfig();
  
  const {
    formData,
    setFormData,
    initKey,
    showToast,
    adminState,
  } = useFormLogic(config);

  const submitHandlers = useMemo(
    () => createSubmitHandlers(dispatch, showToast),
    [dispatch, showToast]
  );

  const handleConfirm = async () => {
  const errors = validateForm(config.fields, formData);
  setFormErrors(errors);

  if (Object.keys(errors).length > 0) {
    console.log("Errores de validación:", errors);
    showToast("Corrige los campos obligatorios", "error");
    return;
  }

  const handler = submitHandlers[config.storeKey];
  if (handler) {
    await handler(formData);
    dispatch(closeModalSettings());
  }
};


  const handleCancel = () => {
    dispatch(resetPermissionsMenuOptions());
    dispatch(closeModalSettings());
  };

  return (
    <Box sx={MODAL_STYLE}>
      <Typography variant="h6">{config.title}</Typography>
      <Typography sx={{ mt: 2 }}>{config.description}</Typography>

      <Box
        key={initKey}
        component="form"
        autoComplete="new-password"
        sx={GRID_STYLE}
        onSubmit={(e) => e.preventDefault()}
      >
        {config.fields.map((field) =>
          createFieldComponent({
            field,
            formData,
            setFormData,
            additionalProps: {
              showPassword,
              setShowPassword,
              formErrors,
              ...adminState,
            },
            key: field.name
          })
        )}
      </Box>

      <Stack spacing={2} direction="row" justifyContent="end" mt={4}>
        <Button
          startIcon={type === "update" ? <SaveAsOutlinedIcon /> : <SaveOutlinedIcon />}
          onClick={handleConfirm}
          variant="contained"
          color="error"
        >
          {config.confirmText}
        </Button>
        <Button
          startIcon={<CancelIcon />}
          onClick={handleCancel}
          variant="contained"
        >
          Cancelar
        </Button>
      </Stack>
    </Box>
  );
};