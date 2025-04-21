import { Box, Button, Stack, Typography, Link } from "@mui/material";
import TextBox from "../../../components/UI/TextBox";
import * as Yup from "yup";
import { Formik } from "formik";
import { useToast } from "../../../config/hooks/useToast";
import { Form, Link as RouterLink } from "react-router-dom";
import CustomInputComponent from "../../../components/core/forms/CustomInput";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Formato de email inválido")
    .required("El email es requerido"),
});

function RecoveryPassword() {
  const { showToast } = useToast();
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "600px",
          display: "flex",
          mt: 16,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TextBox
          align="center"
          title={"¿Olvidaste tu contraseña?"}
          welcomeText={""}
          description={
            <>
              ¡No te preocupes! 👍 Ingresa la dirección de correo electrónico
              vinculada a tu cuenta.
            </>
          }
        />
        <Box sx={{ flexGrow: 1, my: 4, width: "100%" }}>
          <Formik
            initialValues={{
              email: "",
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
                <Box sx={{ flexGrow: 1 }}>
                  <Stack
                    spacing={4}
                    sx={{ width: "100%" }}
                  >
                    <CustomInputComponent
                      label="Correo electrónico"
                      id="email"
                      endIconType="validation"
                      isValid={!errors.email}
                      {...getFieldProps("email")}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      required
                    />
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
                      Enviar
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
                  </Stack>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}
export default RecoveryPassword;
