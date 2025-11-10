import { Box, Button, Stack, SxProps, TextField, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { closeModal, useAppDispatch, useAppSelector } from "../../../store";
import { activeChangePassword } from "../../../store/slices/auth/auth.slice";
import { ProfileFormData } from "../../../config/interfaces";
import { Theme } from "@emotion/react";

export function ModalProfile() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    const [formData, setFormData] = useState<ProfileFormData>({
        nombre: user?.names || "",
        apellido: user?.surnames || "",
        usuario: user?.username || "",
        email: user?.email || "",
        portNumber: user?.portNumber?.toString?.() ?? "",
        host: "",
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;
        console.log("Datos guardados:", formData);
    };

    const handleClose = () => {
        dispatch(closeModal());
    };

    return (
        <Box>
        <Typography
            variant="h6"
            mb={2}
        >
            Actualización de Perfil
        </Typography>

        <Grid
            container
            spacing={2}
        >
            <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
                fullWidth
                label="Usuario"
                value={formData.usuario}
                onChange={handleChange("usuario")}
                error={Boolean(errors.usuario)}
                helperText={errors.usuario}
                sx={getLabelColorStyle(!!formData.usuario)}
            />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
                fullWidth
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
                label="Apellido"
                value={formData.apellido}
                onChange={handleChange("apellido")}
                error={Boolean(errors.apellido)}
                helperText={errors.apellido}
                sx={getLabelColorStyle(!!formData.apellido)}
            />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
                fullWidth
                label="Host (IP)"
                value={formData.host}
                onChange={handleChange("host")}
                error={Boolean(errors.host)}
                helperText={errors.host}
                sx={getLabelColorStyle(!!formData.host)}
            />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
                fullWidth
                label="Puerto"
                value={formData.portNumber}
                onChange={handleChange("portNumber")}
                error={Boolean(errors.portNumber)}
                helperText={errors.portNumber}
                sx={getLabelColorStyle(!!formData.portNumber)}
            />
            </Grid>
            <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Link
                sx={{ alignSelf: "center", cursor: "pointer" }}
                component={RouterLink}
                to="/change-password"
                onClick={() => dispatch(activeChangePassword())}
            >
                Cambiar Contraseña
            </Link>
            </Grid>
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
