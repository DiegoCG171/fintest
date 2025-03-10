import { Box, TextField, Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import usePasswordVisibility from "../../hooks/usePasswordVisibility";

// Validación con Yup
const validationSchema = Yup.object({
  ["unique-new-password-field"]: Yup.string().required("Se requiere nueva contraseña"),
  ["unique-confirm-password-field"]: Yup.string().required("Se requiere confirmar contraseña"),
});

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { getVisibilityProps } = usePasswordVisibility();

  const formik = useFormik({
    initialValues: {
      ["unique-new-password-field"]: "",
      ["unique-confirm-password-field"]: "",
    },
    validationSchema,
    onSubmit: () => {
      navigate("/auth/verify-code");
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete="off"
      sx={{ mt: 3, mb: 1, width: 400 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoComplete="off"
            name="unique-new-password-field"
            required
            fullWidth
            id="new-password"
            label="Nueva contraseña"
            type={getVisibilityProps('unique-new-password-field').type}
            autoFocus
            value={formik.values["unique-new-password-field"]}
            onChange={formik.handleChange}
            error={
              formik.touched["unique-new-password-field"] &&
              Boolean(formik.errors["unique-new-password-field"])
            }
            helperText={
              formik.touched["unique-new-password-field"] &&
              formik.errors["unique-new-password-field"]
            }
            InputProps={{
              endAdornment: getVisibilityProps("unique-new-password-field").endAdornment,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="off"
            name="unique-confirm-password-field"
            required
            fullWidth
            id="confirm-password"
            label="Confirmar nueva contraseña"
            value={formik.values["unique-confirm-password-field"]}
            onChange={formik.handleChange}
            type={getVisibilityProps('unique-confirm-password-field').type}
            error={
              formik.touched["unique-confirm-password-field"] &&
              Boolean(formik.errors["unique-confirm-password-field"])
            }
            helperText={
              formik.touched["unique-confirm-password-field"] &&
              formik.errors["unique-confirm-password-field"]
            }
            InputProps={{
              endAdornment: getVisibilityProps("unique-confirm-password-field").endAdornment,
            }}
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Restablecer contraseña
      </Button>
    </Box>
  );
};
