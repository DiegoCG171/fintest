import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Stack,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { Formik, Form } from "formik";
import CustomInputComponent from "../../../components/core/forms/CustomInput";
import * as Yup from "yup";
import TextBox from "../../../components/UI/TextBox";
import { useToast } from "../../../config/hooks/useToast";
import { createUserThunk, setLoading, useAppDispatch } from "../../../store";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Formato de email inválido")
    .required("El email es requerido"),
  names: Yup.string().required("El nombre es requerido"),
  surnames: Yup.string().required("El apellido es requerido"),
  username: Yup.string().required("El usuario es requerido"),
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
  accepted: Yup.boolean().oneOf(
    [true],
    "Debes aceptar los términos y condiciones"
  ),
});

function RegisterComponent() {
  const { showToast } = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
            names: "",
            email: "",
            username: "",
            password: "",
            retryPassword: "",
            accepted: false,
            surnames: ""
          }}
          validationSchema={validationSchema}
          onSubmit={ async(values, { setSubmitting }) => {
            dispatch(setLoading(true));
            try {
              await dispatch(createUserThunk(values)).unwrap();
              navigate("/login");
              showToast("Formulario enviado correctamente", "success");
            } catch (error) {
              showToast(error as string, "error");
            } finally {
              setSubmitting(false);
              dispatch(setLoading(false));
            }
          }}
        >
          {({ errors, touched, getFieldProps, values, submitForm }) => (
            <Form>
              <Grid
                container
                spacing={{ xs: 2 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid size={{ xs: 12 }}>
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
                    id="names"
                    {...getFieldProps("names")}
                    error={Boolean(touched.names && errors.names)}
                    helperText={touched.names && errors.names}
                  />
                </Grid>
                <Grid size={{ xs: 2, sm: 4, md: 6 }}>
                  <CustomInputComponent
                    label="Apellidos"
                    id="surnames"
                    {...getFieldProps("surnames")}
                    error={Boolean(touched.surnames && errors.surnames)}
                    helperText={touched.surnames && errors.surnames}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CustomInputComponent
                    label="Usuario"
                    id="username"
                    {...getFieldProps("username")}
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
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
                <FormControl
                  error={Boolean(touched.accepted && errors.accepted)}
                  sx={{ mb: 1 }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...getFieldProps("accepted")}
                        checked={values.accepted}
                      />
                    }
                    label="Aceptar términos y condiciones"
                  />
                  {touched.accepted && errors.accepted && (
                    <FormHelperText>{errors.accepted}</FormHelperText>
                  )}
                </FormControl>
                <Button
                  fullWidth
                  variant="contained"
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
