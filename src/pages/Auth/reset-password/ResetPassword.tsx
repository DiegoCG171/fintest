import { Form, Link as RouterLink, useNavigate } from "react-router-dom";
import CustomInputComponent from "../../../components/core/forms/CustomInput";
import { Box, Button, Stack, Typography, Link } from "@mui/material";
import { Formik } from "formik";
import { useToast } from "../../../config/hooks/useToast";
import * as Yup from "yup";
import TextBox from "../../../components/UI/TextBox";
import { useAppDispatch, useAppSelector } from "../../../store";
import { resetPsswThunk } from "../../../store/slices/resetPssw/resetPssw.thunk";

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
  const { showToast } = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const _token = useAppSelector((state) => state.recovery.user?.token);
  console.log(_token);
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
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await dispatch(
                  resetPsswThunk({
                    pssw: values.password,
                    token: _token,
                  })
                );
                navigate("/login");
                showToast('Contraseña restablecida correctamente', 'success')
              } catch (error) {
                console.log(error)
              } finally {
                setSubmitting(false);
              }
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
export default ResetPassword;
