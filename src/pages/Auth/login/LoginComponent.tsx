import { Box, Button, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import { Form } from "react-router-dom";
import Link from "@mui/material/Link";
import * as Yup from "yup";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CustomInputComponent from "../../../components/forms/CustomInputComponent";
import TextBox from "../../../components/UI/TextBox";

const validationSchema = Yup.object({
  user: Yup.string().required("El usuario es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
});

const LoginComponent = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <TextBox></TextBox>
      <Typography gutterBottom variant="h5">
        <strong>Iniciar Sesión</strong>
      </Typography>
      <Typography variant="body1">
        <strong>¡Bienvenido! 👋</strong>
      </Typography>
      <Typography variant="body2">
        Ingresa tu correo y contraseña para iniciar sesión.
      </Typography>
      <Box sx={{ flexGrow: 1, my: 4 }}>
        <Formik
          initialValues={{
            user: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Usuario:", values.user);
            console.log("Contraseña:", values.password);
          }}
        >
          {({ errors, touched, getFieldProps }) => (
            <Form>
              <Stack spacing={2}>
                <CustomInputComponent
                  label="Usuario"
                  id="user"
                  {...getFieldProps("user")}
                  error={Boolean(touched.user && errors.user)}
                  helperText={touched.user && errors.user}
                />
                <CustomInputComponent
                  label="Contraseña"
                  id="password"
                  endIcon={<VisibilityOffOutlinedIcon />}
                  {...getFieldProps("password")}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Link sx={{ alignSelf: "flex-end" }}>
                  ¿Olvidaste tu contraseña?
                </Link>
                <Button 
                  fullWidth 
                  variant="contained" 
                  type="submit"
                  onClick={() => {
                    console.log('Click');
                  }}
                  >
                  Iniciar sesión
                </Button>
                <Stack direction='row' spacing={1} sx={{display:'flex', alignItems:'center', alignSelf:'center'}}>
                        <Typography>¿No tienes cuenta ?</Typography>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => {
                            console.info("I'm a button.");
                            }}
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
