import {
  Box,
  Button,
  Paper,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  closeModal,
  updateUserThunk,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { activeChangePassword } from "../../../store/slices/auth/auth.slice";
import { ProfileFormData } from "../../../config/interfaces";
import { Theme } from "@emotion/react";
import { useAuth } from "../../../config/hooks/useAuth";
import {
  hasPermission,
  hasSomePermission,
} from "../../../config/utils/permissions";
import { updateConfigUserThunk } from "../../../store/slices/users/userConfiguration.thunk";
import { useToast } from "../../../config/hooks/useToast";

export function ModalProfile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { permissions: userPermissions } = useAuth();
  const { showToast } = useToast();

  const isReadOnly = !hasPermission(
    userPermissions,
    "update",
    "userConfiguration"
  );

  const [formData, setFormData] = useState<ProfileFormData>({
    nombre: user?.names || "",
    apellido: user?.surnames || "",
    usuario: user?.username || "",
    email: user?.email || "",
    targetPort: user?.userConfiguration?.targetPort?.toString?.() ?? "",
    targetHost: user?.userConfiguration?.targetHost || "",
    portNumber: user?.userConfiguration?.portNumber?.toString?.() ?? "",
    responseDelay: user?.userConfiguration?.responseDelay?.toString?.() ?? "",
  });

  const getLabelColorStyle = (hasValue: boolean): SxProps<Theme> => ({
    "& .MuiInputLabel-root": {
      color: hasValue ? "text.primary" : "text.disabled",
      transition: "color 0.2s ease",
    },
    "& .Mui-focused .MuiInputLabel-root": {
      color: "primary.main",
    },
  });

  const getReadOnlyStyles = (isReadOnly: boolean): SxProps<Theme> => {
    if (!isReadOnly) return {};

    return {
      "& .MuiOutlinedInput-root.Mui-disabled": {
        backgroundColor: "#b0b0b0",
        borderRadius: "8px",
        color: "#9e9e9ede",
      },
      "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-input": {
        backgroundColor: "#ecececff",
        WebkitTextFillColor: "#4d4d4dde",
        borderRadius: "8px",
        color: "#9e9e9ede",
      },
      "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
        {
          borderColor: "#8a8a8a",
          borderRadius: "8px",
          color: "#4d4d4dde",
        },
      "& .MuiInputLabel-root.Mui-disabled": {
        color: "#4d4d4dde",
      },
      pointerEvents: "none",
    };
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange =
    (field: keyof ProfileFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "Campo obligatorio";
      }
    });

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Correo electrónico inválido";
      }
    }

    if (formData.responseDelay.trim() && isNaN(Number(formData.responseDelay))) {
      newErrors.responseDelay = "Debe ser un número válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    try {
      if (
        hasSomePermission(userPermissions, [
          { action: "update", resource: "user" },
        ])
      ) {
        await dispatch(
          updateUserThunk({
            id: user?.id || "",
            payload: {
              names: formData.nombre,
              surnames: formData.apellido,
              username: formData.usuario,
              email: formData.email,
            },
          })
        ).unwrap();
      }

      if (
        hasSomePermission(userPermissions, [
          { action: "update", resource: "userConfiguration" },
        ])
      ) {
        await dispatch(
          updateConfigUserThunk({
            userId: user?.id || "",
            targetHost: formData.targetHost,
            targetPort: Number(formData.targetPort),
            portNumber: Number(formData.portNumber),
            responseDelay: Number(formData.responseDelay),
          })
        ).unwrap();
      }

      showToast("Información actualizada correctamente", "success");
    } catch (error) {
      showToast(String(error), "error");
    }
    dispatch(closeModal());
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Box>
      <Typography variant="h6" mb={4}>
        Configuración de Perfil
      </Typography>
      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          mb: 3,
        }}
      >
        <Box
          px={2}
          py={1}
          bgcolor="#EEF7FF"
          borderRadius="8px 8px 0 0"
          borderBottom="1px solid"
          borderColor="divider"
        >
          <Typography variant="subtitle1" fontWeight="bold" color="#1C4D8C">
            Datos del Usuario
          </Typography>
        </Box>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                autoComplete="off"
                label="Usuario"
                value={formData.usuario}
                onChange={handleChange("usuario")}
                error={Boolean(errors.usuario)}
                helperText={errors.usuario}
                sx={
                  {
                    ...getLabelColorStyle(!!formData.usuario),
                    ...getReadOnlyStyles(true),
                  } as SxProps<Theme>
                }
                disabled={true}
                slotProps={{ input: { readOnly: true } }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                autoComplete="off"
                type="email"
                label="Correo electrónico"
                value={formData.email}
                onChange={handleChange("email")}
                error={Boolean(errors.email)}
                helperText={errors.email}
                sx={getLabelColorStyle(!!formData.email)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                autoComplete="off"
                label="Nombre"
                value={formData.nombre}
                onChange={handleChange("nombre")}
                error={Boolean(errors.nombre)}
                helperText={errors.nombre}
                sx={getLabelColorStyle(!!formData.nombre)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                autoComplete="off"
                label="Apellido"
                value={formData.apellido}
                onChange={handleChange("apellido")}
                error={Boolean(errors.apellido)}
                helperText={errors.apellido}
                sx={getLabelColorStyle(!!formData.apellido)}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          mb: 3,
        }}
      >
        <Box
          px={2}
          py={1}
          bgcolor="#EEF7FF"
          borderRadius="8px 8px 0 0"
          borderBottom="1px solid"
          borderColor="divider"
        >
          <Typography variant="subtitle1" fontWeight="bold" color="#1C4D8C">
            Configuración Emisor
          </Typography>
        </Box>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                autoComplete="off"
                label="Host (IP)"
                value={formData.targetHost}
                onChange={handleChange("targetHost")}
                error={Boolean(errors.targetHost)}
                helperText={errors.targetHost}
                sx={
                  {
                    ...getLabelColorStyle(!!formData.targetHost),
                    ...getReadOnlyStyles(isReadOnly),
                  } as SxProps<Theme>
                }
                disabled={isReadOnly}
                slotProps={{ input: { readOnly: isReadOnly } }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                autoComplete="off"
                label="Puerto"
                value={formData.targetPort}
                onChange={handleChange("targetPort")}
                error={Boolean(errors.targetPort)}
                helperText={errors.targetPort}
                sx={
                  {
                    ...getLabelColorStyle(!!formData.targetPort),
                    ...getReadOnlyStyles(isReadOnly),
                  } as SxProps<Theme>
                }
                disabled={isReadOnly}
                slotProps={{ input: { readOnly: isReadOnly } }}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          mb: 3,
        }}
      >
        <Box
          px={2}
          py={1}
          bgcolor="#EEF7FF"
          borderRadius="8px 8px 0 0"
          borderBottom="1px solid"
          borderColor="divider"
        >
          <Typography variant="subtitle1" fontWeight="bold" color="#1C4D8C">
            Configuración Adquiriente
          </Typography>
        </Box>

        <Box p={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              autoComplete="off"
              variant="outlined"
              label="Puerto"
              value={formData.portNumber}
              onChange={handleChange("portNumber")}
              error={Boolean(errors.portNumber)}
              helperText={errors.portNumber}
              sx={
                {
                  ...getLabelColorStyle(!!formData.portNumber),
                  ...getReadOnlyStyles(isReadOnly),
                } as SxProps<Theme>
              }
              disabled={isReadOnly}
              slotProps={{ input: { readOnly: isReadOnly } }}
            />
          </Grid>
        </Box>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          mb: 3,
        }}
      >
        <Box
          px={2}
          py={1}
          bgcolor="#EEF7FF"
          borderRadius="8px 8px 0 0"
          borderBottom="1px solid"
          borderColor="divider"
        >
          <Typography variant="subtitle1" fontWeight="bold" color="#1C4D8C">
            Configuración de Retraso
          </Typography>
        </Box>

        <Box p={2}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                autoComplete="off"
                type="number"
                label="Tiempo de retraso (ms)"
                value={formData.responseDelay}
                onChange={handleChange("responseDelay")}
                error={Boolean(errors.delayTime)}
                helperText={errors.responseDelay}
                sx={
                  {
                    ...getLabelColorStyle(!!formData.responseDelay),
                    ...getReadOnlyStyles(isReadOnly),
                  } as SxProps<Theme>
                }
                disabled={isReadOnly}
                slotProps={{ input: { readOnly: isReadOnly }, htmlInput: {
                    min: 0,
                    step: 100,
                  }, }}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Grid sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Link
          sx={{ alignSelf: "center", cursor: "pointer" }}
          component={RouterLink}
          to="/change-password"
          onClick={() => dispatch(activeChangePassword())}
        >
          Cambiar Contraseña
        </Link>
      </Grid>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mt: 3, justifyContent: "flex-end" }}
      >
        <Button
          startIcon={<CancelIcon />}
          variant="contained"
          color="primary"
          onClick={handleClose}
        >
          Cancelar
        </Button>

        <Button
          startIcon={<SaveOutlinedIcon />}
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Guardar
        </Button>
      </Stack>
    </Box>
  );
}
