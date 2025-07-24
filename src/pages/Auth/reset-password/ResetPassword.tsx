import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import CustomInputComponent from "../../../components/core/forms/CustomInput";
import { Box, Button, Stack, Typography, Link } from "@mui/material";
import { Form, Formik } from "formik";
import { useToast } from "../../../config/hooks/useToast";
import * as Yup from "yup";
import TextBox from "../../../components/UI/TextBox";
import { useAppDispatch } from "../../../store";
import { resetPasswordThunk } from "../../../store/slices/auth/resetPassword.thunk";

const validationSchema = Yup.object({
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

function ResetPassword() {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const token = queryParams.get("token") || "";
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
          title={"Crear una nueva contraseña"}
          welcomeText={""}
          description={
            <>
              La nueva contraseña 🔐 debe de incluir al menos una mayúscula, un
              número y un carácter especial.
            </>
          }
        />
        <Box sx={{ flexGrow: 1, my: 4, width: "100%" }}>
          <Formik
            initialValues={{
              password: "",
              retryPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (_values, { setSubmitting }) => {
              setSubmitting(false);
              const response = await dispatch(
                resetPasswordThunk({ newPassword: _values.password, token })
              ).unwrap();
              showToast(
                response || "Formulario enviado correctamente",
                "success"
              );
              navigate("/login");
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
                      label="Nueva contraseña"
                      id="password"
                      type="password"
                      endIconType="password"
                      isValid={!errors.password}
                      {...getFieldProps("password")}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      required
                    />
                    <CustomInputComponent
                      label="Confirmar nueva contraseña"
                      id="retryPassword"
                      type="password"
                      endIconType="password"
                      isValid={!errors.retryPassword}
                      {...getFieldProps("retryPassword")}
                      error={Boolean(
                        touched.retryPassword && errors.retryPassword
                      )}
                      helperText={touched.retryPassword && errors.retryPassword}
                      required
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      onClick={(e) => {
                        if (Object.keys(errors).length > 0) {
                          e.preventDefault();
                          showToast(
                            "Revisa la información antes de enviarla.",
                            "info"
                          );
                        } else submitForm()
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
export default ResetPassword;
