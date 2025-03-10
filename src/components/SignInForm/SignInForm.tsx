import { Box, TextField, Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import usePasswordVisibility from "../../hooks/usePasswordVisibility";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch, startLogin } from "../../store";

// Validación con Yup
const validationSchema = Yup.object({
  ["unique-user-field"]: Yup.string().required("Se requiere el usuario"),
  ["unique-password-field"]: Yup.string().required("Se requiere contraseña"),
});

const SignInForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const { getVisibilityProps } = usePasswordVisibility();

  const formik = useFormik({
    initialValues: {
      ["unique-user-field"]: "",
      ["unique-password-field"]: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(startLogin({
        username: values["unique-user-field"],
      }))
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete="off"
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoComplete="off"
            name="unique-user-field"
            required
            fullWidth
            id="user"
            label="Usuario"
            autoFocus
            value={formik.values["unique-user-field"]}
            onChange={formik.handleChange}
            error={
              formik.touched["unique-user-field"] &&
              Boolean(formik.errors["unique-user-field"])
            }
            helperText={
              formik.touched["unique-user-field"] &&
              formik.errors["unique-user-field"]
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="new-password"
            name="unique-password-field"
            required
            fullWidth
            id="password"
            label="Contraseña"
            type={getVisibilityProps('unique-new-password-field').type}
            value={formik.values["unique-password-field"]}
            onChange={formik.handleChange}
            error={
              formik.touched["unique-password-field"] &&
              Boolean(formik.errors["unique-password-field"])
            }
            helperText={
              formik.touched["unique-password-field"] &&
              formik.errors["unique-password-field"]
            }
            InputProps={{
              endAdornment: getVisibilityProps("unique-new-password-field").endAdornment,
            }}
          />
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}
      >
        <NavLink style={{textDecoration: 'none', color: '#1565c0'}} to="/auth/forgot-password">¿Olvidaste tu contraseña?</NavLink>
      </div>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Iniciar sesión
      </Button>
    </Box>
  );
};

export default SignInForm;
