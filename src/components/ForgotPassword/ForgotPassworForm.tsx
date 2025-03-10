import { Box, TextField, Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

// Validación con Yup
const validationSchema = Yup.object({
  ["unique-email-field"]: Yup.string().email('Correo electrónico no válido').required("Se requiere el correo electrónico"),
});

export const ForgotPassworForm = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      ["unique-email-field"]: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      navigate('/auth/reset-password');
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
            name="unique-email-field"
            required
            fullWidth
            id="email"
            label="Dirección de correo electrónico"
            autoFocus
            value={formik.values["unique-email-field"]}
            onChange={formik.handleChange}
            error={
              formik.touched["unique-email-field"] &&
              Boolean(formik.errors["unique-email-field"])
            }
            helperText={
              formik.touched["unique-email-field"] &&
              formik.errors["unique-email-field"]
            }
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Enviar correo
      </Button>
    </Box>
  );
}
