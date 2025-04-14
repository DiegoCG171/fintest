import { Box, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Form } from "react-router-dom";
import Link from "@mui/material/Link";
import * as Yup from "yup";
import CustomInputComponent from "../../../components/core/forms/CustomInput";
import TextBox from "../../../components/UI/TextBox";
import { useAuth } from "../../../config/hooks/useAuth";
import { useToast } from "../../../config/hooks/useToast";
import { getErrorMessage } from "../../../config/utils";

const validationSchema = Yup.object({
  username: Yup.string().required("El usuario es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
});

const LoginComponent = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  return (
    <Box sx={{ width: "100%" }}>
      <TextBox
        title={"Iniciar Sesión"}
        welcomeText={"¡Bienvenido! 👋"}
        description={<>Ingresa tu correo y contraseña para iniciar sesión.</>}
      ></TextBox>
      <Box sx={{ flexGrow: 1, my: 4 }}>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await login({
                username: values.username,
                password: values.password,
              });
              navigate("/");
            } catch (error) {
              const errorMessage = getErrorMessage(error);
              showToast(errorMessage, "error");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, getFieldProps, submitForm }) => (
            <Form>
              <Stack spacing={2}>
                <CustomInputComponent
                  label="Usuario"
                  id="username"
                  {...getFieldProps("username")}
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                />
                <CustomInputComponent
                  label="Contraseña"
                  id="password"
                  type="password"
                  endIconType="password"
                  {...getFieldProps("password")}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Link
                  sx={{ alignSelf: "flex-end" }}
                  component={RouterLink}
                  to="/recovery-pssw"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
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
                    alignSelf: "center",
                  }}
                >
                  <Typography>¿No tienes cuenta ?</Typography>
                  <Link
                    variant="body2"
                    component={RouterLink}
                    to="/register"
                  >
                    Regístrate aquí
                  </Link>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default LoginComponent;
