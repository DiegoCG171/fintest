import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { Formik, Form } from "formik";
import CustomInputComponent from "../../components/core/forms/CustomInput";
import * as Yup from "yup";
import TextBox from "../../components/UI/TextBox";
import { useToast } from "../../config/hooks/useToast";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Formato de email inválido")
    .required("El email es requerido"),
  name: Yup.string().required("El nombre es requerido"),
  user: Yup.string().required("El usuario es requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .matches(/[A-Z]/, "La contraseña debe contener al menos una mayúscula")
    .matches(/[0-9]/, "La contraseña debe contener al menos un número")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "La contraseña debe contener al menos un carácter especial"
    )
    .required("La contraseña es requerida"),
  retryPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
    .required("Repetir la contraseña es requerido"),
});

function RegisterComponent() {
  const { showToast } = useToast();
  return (
    <Box sx={{ width: "100%" }}>
      <TextBox
        title={"Registro"}
        welcomeText={"¡Bienvenido! 👋"}
        description={
          <>
            Ingresa tus datos para poder crear tu cuenta en{" "}
            <strong>fintest.</strong>
          </>
        }
      ></TextBox>
      <Box sx={{ flexGrow: 1, my: 4 }}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            user: "",
            password: "",
            retryPassword: "",
            accepted: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Formulario enviado:", values);
            showToast("Formulario enviado correctamente", "success");
            setSubmitting(false);
          }}
        >
          {({ errors, touched, getFieldProps, submitForm }) => (
            <Form>
              <Grid
                container
                spacing={{ xs: 2 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid size={{ xs: 2, sm: 4, md: 6 }}>
                  <CustomInputComponent
                    label="Email"
                    id="email"
                    endIconType="validation"
                    isValid={!errors.email}
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 2, sm: 4, md: 6 }}>
                  <CustomInputComponent
                    label="Nombre"
                    id="name"
                    {...getFieldProps("name")}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CustomInputComponent
                    label="Usuario"
                    id="user"
                    {...getFieldProps("user")}
                    error={Boolean(touched.user && errors.user)}
                    helperText={touched.user && errors.user}
                  />
                </Grid>
                <Grid size={{ xs: 2, sm: 4, md: 6 }}>
                  <CustomInputComponent
                    label="Contraseña"
                    id="password"
                    type="password"
                    endIconType="password"
                    {...getFieldProps("password")}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>

                <Grid size={{ xs: 2, sm: 4, md: 6 }}>
                  <CustomInputComponent
                    label="Repetir Contraseña"
                    id="retryPassword"
                    type="password"
                    endIconType="password"
                    {...getFieldProps("retryPassword")}
                    error={Boolean(
                      touched.retryPassword && errors.retryPassword
                    )}
                    helperText={touched.retryPassword && errors.retryPassword}
                  />
                </Grid>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ ml: -1, display: "flex", alignItems: "center" }}
                >
                  <FormControlLabel
                    value="accepted"
                    control={<Checkbox />}
                    label="Aceptar"
                    labelPlacement="end"
                    sx={{ mb: 1, fontSize: 14, fontWeight: "bold" }}
                  />
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                      console.info("I'm a button.");
                    }}
                  >
                    Términos y condiciones
                  </Link>
                </Stack>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  onClick={() => {
                    if (Object.keys(errors).length > 0) {
                      showToast(
                        "Revisa la información antes de enviarla.",
                        "info"
                      );
                    } else {
                      submitForm();
                    }
                  }}
                >
                  Iniciar sesión
                </Button>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Typography>¿Ya tienes cuenta?</Typography>
                  <Link
                    variant="body2"
                    component={RouterLink}
                    to="/login"
                  >
                    Ingresa aquí
                  </Link>
                </Stack>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default RegisterComponent;
