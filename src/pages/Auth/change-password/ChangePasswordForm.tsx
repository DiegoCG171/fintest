import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInputComponent from "../../../components/core/forms/CustomInput";
import { useToast } from "../../../config/hooks/useToast";
import { logout, useAppDispatch } from "../../../store";
import { setLoading } from "../../../store";
import { changePasswordThunk } from "../../../store/slices/auth/changePassword.thunk";

export const ChangePasswordForm = ({
  title,
  description,
  align,
}: {
  title: string;
  description: string;
  align?: string;
}) => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ flexGrow: 1, my: 4 }}>
        <Typography gutterBottom variant="h5">
          <strong>{title}</strong>
        </Typography>
        <Typography variant="body2" sx={{ textAlign: align || "left", mb: 2 }}>
          {description}
        </Typography>

        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={Yup.object({
            oldPassword: Yup.string().required(
              "La contraseña actual es requerida"
            ),
            newPassword: Yup.string()
              .min(8, "La nueva contraseña debe tener al menos 8 caracteres")
              .required("La nueva contraseña es requerida"),
            confirmNewPassword: Yup.string()
              .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden")
              .required("Debes confirmar la nueva contraseña"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            dispatch(setLoading(true));
            try {
              await dispatch(
                changePasswordThunk({
                  oldPassword: values.oldPassword,
                  newPassword: values.newPassword,
                })
              ).unwrap();
              dispatch(logout())
              showToast("Contraseña actualizada con éxito", "success");
              navigate("/home");
            } catch (error) {
              showToast(error as string, "error");
            } finally {
              setSubmitting(false);
              dispatch(setLoading(false));
            }
          }}
        >
          {({ errors, touched, getFieldProps, isSubmitting }) => (
            <Form>
              <Stack spacing={3}>
                <CustomInputComponent
                  label="Contraseña actual"
                  id="oldPassword"
                  type="password"
                  endIconType="password"
                  {...getFieldProps("oldPassword")}
                  error={Boolean(touched.oldPassword && errors.oldPassword)}
                  helperText={touched.oldPassword && errors.oldPassword}
                />
                <CustomInputComponent
                  label="Nueva contraseña"
                  id="newPassword"
                  type="password"
                  endIconType="password"
                  {...getFieldProps("newPassword")}
                  error={Boolean(touched.newPassword && errors.newPassword)}
                  helperText={touched.newPassword && errors.newPassword}
                />
                <CustomInputComponent
                  label="Confirmar nueva contraseña"
                  id="confirmNewPassword"
                  type="password"
                  endIconType="password"
                  {...getFieldProps("confirmNewPassword")}
                  error={Boolean(
                    touched.confirmNewPassword && errors.confirmNewPassword
                  )}
                  helperText={
                    touched.confirmNewPassword && errors.confirmNewPassword
                  }
                />
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Cambiar contraseña
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
